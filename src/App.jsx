import React, { useState, useEffect } from 'react';
import { INITIAL_BATCHES, INITIAL_TRANSIT, INITIAL_NOTIFICATIONS } from './data/mockData';
import { Header } from './components/Header.jsx';
import { BottomNav } from './components/BottomNav.jsx';
import { DashboardView } from './components/screens/DashboardView.jsx';
import { ListFoodView } from './components/screens/ListFoodView.jsx';
import { PickupsView } from './components/screens/PickupsView.jsx';
import { ImpactView } from './components/screens/ImpactView.jsx';
import { ClaimReservationModal } from './components/modals/ClaimReservationModal.jsx';
import { RouteMapModal } from './components/modals/RouteMapModal.jsx';
import { NotificationsDrawer } from './components/modals/NotificationsDrawer.jsx';
import { SafeProtocolModal } from './components/modals/SafeProtocolModal.jsx';
import { ShareModal } from './components/modals/ShareModal.jsx';
import { ProfileModal } from './components/modals/ProfileModal.jsx';
import { ExpoCodeModal } from './components/modals/ExpoCodeModal.jsx';
import { MapsGroundingModal } from './components/modals/MapsGroundingModal.jsx';
import {
  auth,
  onAuthStateChanged,
  db,
  validateFirestoreConnection,
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  getDocs
} from './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState('ngo');
  const [currentLocation, setCurrentLocation] = useState('Mumbai Central • 2.4 km');
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [transit, setTransit] = useState(INITIAL_TRANSIT);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [mealsRescued, setMealsRescued] = useState(428);
  const [batchesNear, setBatchesNear] = useState(18);
  const [avgPickupTime] = useState('38m');

  // Firebase Authentication State
  const [currentUser, setCurrentUser] = useState(null);

  // Modals state
  const [claimModalBatch, setClaimModalBatch] = useState(null);
  const [shareModalBatch, setShareModalBatch] = useState(null);
  const [showRouteMap, setShowRouteMap] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSafeProtocol, setShowSafeProtocol] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showExpoCode, setShowExpoCode] = useState(false);
  const [showMapsGrounding, setShowMapsGrounding] = useState(false);

  // 1. Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Save/update user profile in Firestore
        setDoc(
          doc(db, 'users', user.uid),
          {
            displayName: user.displayName || 'Authorized Volunteer',
            email: user.email || '',
            photoURL: user.photoURL || '',
            role: role,
            trustScore: 99.4,
            lastSeen: new Date().toISOString()
          },
          { merge: true }
        ).catch((err) => console.warn('Could not save user profile:', err));
      }
    });

    return () => unsubscribe();
  }, [role]);

  // 2. Validate Firestore Connection & Real-time Synchronization
  useEffect(() => {
    validateFirestoreConnection();

    // Setup real-time listener for batches collection in Firestore
    const batchesCol = collection(db, 'batches');

    // Check if initial seeding is needed
    getDocs(batchesCol)
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('[Firestore] Seeding initial batches into Firestore...');
          INITIAL_BATCHES.forEach((b) => {
            setDoc(doc(db, 'batches', b.id), b).catch(console.error);
          });
        }
      })
      .catch((err) => console.warn('[Firestore] Error checking initial batches:', err));

    // Listen to real-time changes across clients
    const unsubscribeSnapshot = onSnapshot(
      batchesCol,
      (snapshot) => {
        if (!snapshot.empty) {
          const remoteBatches = [];
          snapshot.forEach((docSnap) => {
            remoteBatches.push(docSnap.data());
          });
          // Keep critical item on top if available
          remoteBatches.sort((a, b) => (b.urgencyScore || 0) - (a.urgencyScore || 0));
          setBatches(remoteBatches);
          setBatchesNear(remoteBatches.length);
        }
      },
      (error) => {
        console.warn('[Firestore onSnapshot] Using local state fallback:', error);
      }
    );

    return () => unsubscribeSnapshot();
  }, []);

  // Unread notification count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle claiming batch with Firestore persistence
  const handleConfirmClaim = async (batchId, shelterName, needsCourier) => {
    // 1. Optimistic Local Update
    setBatches((prev) =>
      prev.map((b) => {
        if (b.id === batchId) {
          return {
            ...b,
            status: 'locked',
            claimedBy: shelterName,
            transitStatus: needsCourier ? 'Driver En Route' : 'Self Pickup Reserved'
          };
        }
        return b;
      })
    );

    // Update metrics
    setMealsRescued((prev) => prev + 40);

    // 2. Add notification
    const claimedBatch = batches.find((b) => b.id === batchId);
    const newNotif = {
      id: `n-${Date.now()}`,
      title: 'Reservation Locked Successfully',
      message: `${shelterName} locked reservation for ${claimedBatch?.title || '40 meals'} at ${claimedBatch?.donorName || 'Donor'}. Code #RF-9842.`,
      timeAgo: 'Just now',
      type: 'urgent',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // 3. Persist to Firestore
    try {
      await updateDoc(doc(db, 'batches', batchId), {
        status: 'locked',
        claimedBy: shelterName,
        claimedByUid: currentUser?.uid || 'anon',
        transitStatus: needsCourier ? 'Driver En Route' : 'Self Pickup Reserved'
      });

      // Also record in /reservations
      await setDoc(doc(db, 'reservations', `res-${Date.now()}`), {
        batchId,
        shelterName,
        userUid: currentUser?.uid || 'anon',
        userName: currentUser?.displayName || 'Anonymous Recipient',
        userEmail: currentUser?.email || '',
        needCourier: needsCourier,
        otpCode: 'RF-9842',
        status: 'locked',
        createdAt: new Date().toISOString()
      });
      console.log('[Firestore] Reservation saved to cloud');
    } catch (err) {
      console.warn('[Firestore] Update failed, kept in local state:', err);
    }

    // If courier was dispatched, update active transit
    if (needsCourier && claimedBatch) {
      setTransit((prev) => ({
        ...prev,
        donorName: claimedBatch.donorName,
        donorAddress: claimedBatch.donorAddress,
        shelterName: shelterName,
        currentStep: 3
      }));
    }
  };

  // Handle step progression in transit
  const handleAdvanceTransitStep = (newStep) => {
    setTransit((prev) => {
      const updatedSteps = prev.steps.map((st, idx) => ({
        ...st,
        completed: idx + 1 <= newStep,
        active: idx + 1 === newStep
      }));
      return {
        ...prev,
        currentStep: newStep,
        steps: updatedSteps,
        etaMinutes: Math.max(0, 15 - newStep * 3)
      };
    });

    if (newStep >= 5) {
      setMealsRescued((prev) => prev + 40);
      setNotifications((prev) => [
        {
          id: `n-${Date.now()}`,
          title: 'Batch Distributed & Completed',
          message: `Delivery #FR-892 completed at Robin Hood Shelter. Temperature was verified at 71.4°C.`,
          timeAgo: 'Just now',
          type: 'verification',
          read: false
        },
        ...prev
      ]);
    }
  };

  // Handle adding new batch with Firestore persistence
  const handleAddBatch = async (newBatch) => {
    // 1. Optimistic update
    setBatches((prev) => [newBatch, ...prev]);
    setBatchesNear((prev) => prev + 1);
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: 'New Surplus Listed on Grid',
        message: `${newBatch.donorName} listed ${newBatch.title} (${newBatch.distanceLabel}).`,
        timeAgo: 'Just now',
        type: 'urgent',
        read: false
      },
      ...prev
    ]);

    // 2. Persist to Firestore
    try {
      await setDoc(doc(db, 'batches', newBatch.id), {
        ...newBatch,
        creatorUid: currentUser?.uid || 'anon',
        createdAt: new Date().toISOString()
      });
      console.log('[Firestore] New batch published to cloud');
    } catch (err) {
      console.warn('[Firestore] Batch save failed, kept in local state:', err);
    }
  };

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Fixed Clay Header */}
      <Header
        currentLocation={currentLocation}
        onSelectLocation={setCurrentLocation}
        unreadCount={unreadCount}
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenProfile={() => setShowProfile(true)}
        onOpenExpoCode={() => setShowExpoCode(true)}
        onOpenMapsGrounding={() => setShowMapsGrounding(true)}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-xl mx-auto pt-24 px-4">
        {activeTab === 'dashboard' && (
          <DashboardView
            role={role}
            onRoleChange={setRole}
            batches={batches}
            transit={transit}
            mealsRescued={mealsRescued}
            batchesNear={batchesNear}
            avgPickupTime={avgPickupTime}
            onClaimBatch={(batch) => setClaimModalBatch(batch)}
            onShareBatch={(batch) => setShareModalBatch(batch)}
            onOpenRouteMap={() => setShowRouteMap(true)}
            onOpenSafetyProtocol={() => setShowSafeProtocol(true)}
            onNavigateToListFood={() => setActiveTab('list-food')}
          />
        )}

        {activeTab === 'list-food' && (
          <ListFoodView
            onAddBatch={handleAddBatch}
            onDone={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'pickups' && (
          <PickupsView
            transit={transit}
            onAdvanceStep={handleAdvanceTransitStep}
            onOpenRouteMap={() => setShowRouteMap(true)}
          />
        )}

        {activeTab === 'impact' && (
          <ImpactView mealsRescued={mealsRescued} />
        )}
      </main>

      {/* Floating Bottom Clay Navigation Dock */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingPickupsCount={transit.currentStep < 5 ? 1 : 0}
      />

      {/* Modals & Drawers */}
      {claimModalBatch && (
        <ClaimReservationModal
          batch={claimModalBatch}
          onClose={() => setClaimModalBatch(null)}
          onConfirmClaim={handleConfirmClaim}
        />
      )}

      {showRouteMap && (
        <RouteMapModal
          transit={transit}
          onClose={() => setShowRouteMap(false)}
          onAdvanceStep={handleAdvanceTransitStep}
          onOpenMapsGrounding={() => setShowMapsGrounding(true)}
        />
      )}

      {showNotifications && (
        <NotificationsDrawer
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onMarkAllAsRead={() =>
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
          }
          onClear={() => setNotifications([])}
        />
      )}

      {showSafeProtocol && (
        <SafeProtocolModal onClose={() => setShowSafeProtocol(false)} />
      )}

      {shareModalBatch && (
        <ShareModal
          batch={shareModalBatch}
          onClose={() => setShareModalBatch(null)}
        />
      )}

      {showProfile && (
        <ProfileModal
          onClose={() => setShowProfile(false)}
          role={role}
          onToggleRole={() => setRole(role === 'ngo' ? 'provider' : 'ngo')}
          currentUser={currentUser}
          onUserChange={setCurrentUser}
        />
      )}

      {showExpoCode && (
        <ExpoCodeModal onClose={() => setShowExpoCode(false)} />
      )}

      {showMapsGrounding && (
        <MapsGroundingModal onClose={() => setShowMapsGrounding(false)} />
      )}
    </div>
  );
}
