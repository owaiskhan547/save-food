import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  Image,
  Dimensions,
  Platform,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { FoodBatch, TransitLogistics, CategoryType } from './src/types';

const { width } = Dimensions.get('window');

// Initial Mock Data
const INITIAL_BATCHES: FoodBatch[] = [
  {
    id: 'batch-hero-1',
    donorName: 'Grand Banquet Palace',
    donorType: 'Luxury Banquet & Wedding Hall',
    locationArea: 'Mumbai Central',
    distanceKm: 1.8,
    distanceLabel: '1.8 km away',
    title: '40 Hot Prepared Dinner Plates',
    description: '40 Hot Prepared Dinner Plates • Veg, Rice & Rotis',
    quantityLabel: '40 Plates (Serves ~45 people)',
    urgencyScore: 98,
    isCritical: true,
    expirySecondsRemaining: 1 * 3600 + 42 * 60 + 14,
    category: 'cooked',
    tags: ['Halal + Veg', 'Pure Vegetarian'],
    status: 'available',
    verified: true,
    iconName: 'timer',
    iconBgColor: '#ffdad6',
    iconTextColor: '#ba1a1a',
    pickupWindow: '01h 42m 14s',
    donorPhone: '+91 98201 44521',
    donorAddress: 'Gate 4, Grand Banquet Palace, Bellasis Rd, Mumbai Central',
    temperatureHolding: '72°C'
  },
  {
    id: 'batch-spice-1',
    donorName: 'The Spice Pavilion',
    donorType: 'Banquet Caterer',
    locationArea: 'Lower Parel',
    distanceKm: 1.2,
    distanceLabel: 'Banquet Caterer • Lower Parel (1.2 km)',
    title: '45 Hot Thali Meals',
    description: 'Rice, Daal Tadka, Paneer Butter Masala, 90 Rotis. Vacuum packed in thermal catering containers.',
    quantityLabel: '45 Thali Meals',
    urgencyScore: 94,
    expirySecondsRemaining: 1 * 3600 + 25 * 60 + 40,
    category: 'cooked',
    tags: ['FSSAI Certified', 'Pure Vegetarian'],
    status: 'available',
    verified: true,
    iconName: 'restaurant',
    iconBgColor: '#dce9ff',
    iconTextColor: '#006b2c',
    pickupWindow: '⏳ 01:25:40 left',
    donorPhone: '+91 98210 99881',
    donorAddress: 'Senapati Bapat Marg, Lower Parel West, Mumbai',
    temperatureHolding: '68°C'
  },
  {
    id: 'batch-sunrise-1',
    donorName: 'Sunrise Artisan Bakery',
    donorType: 'Bakery',
    locationArea: 'Bandra West',
    distanceKm: 2.6,
    distanceLabel: 'Bakery • Bandra West (2.6 km)',
    title: '25 Boxes Fresh Sourdough & Baguettes',
    description: 'Baked this morning, packaged in brown bakery kraft boxes. Ready for immediate pickup.',
    quantityLabel: '25 Kraft Boxes (50+ Loaves)',
    urgencyScore: 82,
    expirySecondsRemaining: 3 * 3600 + 10 * 60,
    category: 'bakery',
    tags: ['FSSAI Certified', 'Freshly Baked'],
    status: 'locked',
    claimedBy: 'St. Jude Children Shelter',
    transitStatus: 'Driver En Route',
    verified: true,
    iconName: 'bakery-dining',
    iconBgColor: '#ffdbca',
    iconTextColor: '#9d4300',
    pickupWindow: '03:10:00 remaining',
    donorPhone: '+91 98190 22334',
    donorAddress: 'Hill Road, Near Mehboob Studio, Bandra West, Mumbai',
    temperatureHolding: 'Ambient (22°C)'
  },
  {
    id: 'batch-greenvalley-1',
    donorName: 'Green Valley Depot',
    donorType: 'Organic Farm',
    locationArea: 'Dadar Market',
    distanceKm: 3.4,
    distanceLabel: 'Organic Farm • Dadar Market (3.4 km)',
    title: '120 kg Fresh Spinach & Mixed Greens',
    description: 'Surplus post-harvest farm stock. Suited for community kitchen batch cooking.',
    quantityLabel: '120 kg (Crates of 15kg each)',
    urgencyScore: 76,
    expirySecondsRemaining: 5 * 3600 + 45 * 60,
    category: 'produce',
    tags: ['Organic Harvest', 'Zero Pesticides'],
    status: 'available',
    verified: true,
    iconName: 'eco',
    iconBgColor: '#89f5e7',
    iconTextColor: '#00685f',
    pickupWindow: 'Pickup by 8:00 PM',
    donorPhone: '+91 98205 77123',
    donorAddress: 'Wholesale Veg Market Bay 12, Dadar West, Mumbai',
    temperatureHolding: 'Chilled Produce (8°C)'
  }
];

const INITIAL_TRANSIT: TransitLogistics = {
  id: 'transit-1',
  code: '#FR-892',
  donorName: 'Grand Banquet Palace',
  donorAddress: 'Bellasis Rd, Mumbai Central',
  shelterName: 'Robin Hood Shelter',
  shelterAddress: 'Byculla East, Community Kitchen',
  volunteerName: 'Volunteer Rahul K.',
  volunteerPhone: '+91 97690 12893',
  etaMinutes: 12,
  currentStep: 3,
  steps: [
    { title: 'Listed', description: 'Batch registered with auto-expiry window', timestamp: '21:15', completed: true, active: false },
    { title: 'Claimed', description: 'Shelter reserved for 40 beneficiaries', timestamp: '21:28', completed: true, active: false },
    { title: 'Locked', description: 'Handshake OTP #9842 verified', timestamp: '21:35', completed: true, active: true },
    { title: 'In Transit', description: 'En route via Bellasis flyover', timestamp: 'Est. 21:45', completed: false, active: false },
    { title: 'Distributed', description: 'Meals served at community kitchen', timestamp: 'Est. 21:55', completed: false, active: false }
  ],
  temperatureReading: '71.4°C',
  otpCode: 'RF-9842'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'list' | 'pickups' | 'impact'>('dashboard');
  const [role, setRole] = useState<'ngo' | 'provider'>('ngo');
  const [batches, setBatches] = useState<FoodBatch[]>(INITIAL_BATCHES);
  const [transit, setTransit] = useState<TransitLogistics>(INITIAL_TRANSIT);
  const [mealsRescued, setMealsRescued] = useState(428);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  // Hero Countdown Timer
  const [heroSeconds, setHeroSeconds] = useState(1 * 3600 + 42 * 60 + 14);

  // Modals
  const [selectedBatchForClaim, setSelectedBatchForClaim] = useState<FoodBatch | null>(null);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
  };

  const handleClaimConfirm = (shelterName: string) => {
    if (!selectedBatchForClaim) return;
    setBatches((prev) =>
      prev.map((b) =>
        b.id === selectedBatchForClaim.id
          ? { ...b, status: 'locked', claimedBy: shelterName, transitStatus: 'Driver En Route' }
          : b
      )
    );
    setMealsRescued((prev) => prev + 40);
    setSelectedBatchForClaim(null);
    Alert.alert('Reservation Locked! 🎉', `Locked for ${shelterName}. Handshake OTP code: #RF-9842.`);
  };

  const heroBatch = batches.find((b) => b.isCritical) || batches[0];
  const feedBatches = batches.filter((b) => !b.isCritical);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9ff" />

      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida/AEtjO1WZjJGH6bcPZej_eeZy-BPSkgcRFFQZRdMFGbOg5_o88MMBUdl72jGImNUsq8q8xYeWh0JVKP4B7y0IU5CKkQeZ6PSKOmALGGXn4PzGDMI9t_WB45Pv7jRtMdRnP56FtJdmt2N4BAYdSf7ozXnwe7bBLY0Tjj6ofqqtGb70-8tKSiiETHcPFq5IqJbhCDckHp4bsSv61kmkq8eBygtHN26mvhMTkDEYGHwhneh9tXcUPuTVWMwsb9euSLoQ' }}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View style={styles.headerTextCol}>
            <View style={styles.brandRow}>
              <Text style={styles.brandTitle}>RescueFeed</Text>
              <View style={styles.livePulseDot} />
            </View>
            <View style={styles.locationRow}>
              <MaterialIcons name="location-on" size={12} color="#006b2c" />
              <Text style={styles.locationText}>Mumbai Central • 2.4 km</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => setShowNotificationModal(true)}
          >
            <Ionicons name="notifications-outline" size={20} color="#0b1c30" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <View style={styles.avatarCircle}>
            <MaterialIcons name="person" size={20} color="#ffffff" />
          </View>
        </View>
      </View>

      {/* Main Scroll Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'dashboard' && (
          <>
            {/* Live Grid Indicator Row */}
            <View style={styles.gridStatusRow}>
              <View style={styles.liveIndicator}>
                <View style={styles.pulsingGreen} />
                <Text style={styles.liveStatusText}>PS-05 • LIVE RESCUE GRID</Text>
              </View>
              <View style={styles.safeVerifiedBadge}>
                <MaterialIcons name="verified" size={13} color="#006b2c" />
                <Text style={styles.safeVerifiedText}>FDA Safe Verified</Text>
              </View>
            </View>

            {/* Role Switcher Pill */}
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[styles.roleBtn, role === 'ngo' && styles.roleBtnActive]}
                onPress={() => setRole('ngo')}
              >
                <MaterialIcons
                  name="volunteer-activism"
                  size={16}
                  color={role === 'ngo' ? '#006b2c' : '#3e4a3d'}
                />
                <Text style={[styles.roleText, role === 'ngo' && styles.roleTextActive]}>
                  NGO / Recipient
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.roleBtn, role === 'provider' && styles.roleBtnActiveOrange]}
                onPress={() => setRole('provider')}
              >
                <MaterialIcons
                  name="restaurant"
                  size={16}
                  color={role === 'provider' ? '#fd761a' : '#3e4a3d'}
                />
                <Text style={[styles.roleText, role === 'provider' && styles.roleTextActiveOrange]}>
                  Food Provider
                </Text>
              </TouchableOpacity>
            </View>

            {/* Impact Metric Strip */}
            <View style={styles.clayCardMetric}>
              <View style={styles.metricItem}>
                <Text style={styles.metricValueGreen}>{mealsRescued}</Text>
                <Text style={styles.metricLabel}>Meals Rescued</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <View style={styles.rowCentered}>
                  <Text style={styles.metricValueOrange}>18</Text>
                  <View style={styles.smallPulseOrange} />
                </View>
                <Text style={styles.metricLabel}>Batches Near</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Text style={styles.metricValueTeal}>38m</Text>
                <Text style={styles.metricLabel}>Avg Pickup</Text>
              </View>
            </View>

            {/* Critical Expiry Hero Card */}
            {heroBatch && (
              <LinearGradient
                colors={['#ffdad6', '#eff4ff', '#ffffff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.heroCard}
              >
                {/* Badges */}
                <View style={styles.heroBadgesRow}>
                  <View style={styles.criticalBadge}>
                    <MaterialIcons name="alarm" size={14} color="#ba1a1a" />
                    <Text style={styles.criticalText}>CRITICAL EXPIRY</Text>
                  </View>
                  <View style={styles.distanceBadge}>
                    <MaterialIcons name="near-me" size={12} color="#9d4300" />
                    <Text style={styles.distanceText}>1.8 km away</Text>
                  </View>
                </View>

                {/* Info */}
                <View style={styles.heroTitleRow}>
                  <Text style={styles.heroTitle}>{heroBatch.donorName}</Text>
                  <MaterialIcons name="verified" size={16} color="#006b2c" />
                </View>
                <Text style={styles.heroSubtitle}>{heroBatch.description}</Text>

                {/* Expiry Window Box */}
                <View style={styles.expiryWell}>
                  <View style={styles.expiryLeft}>
                    <View style={styles.timerCircle}>
                      <MaterialIcons name="timer" size={16} color="#93000a" />
                    </View>
                    <View>
                      <Text style={styles.expiryLabel}>Auto-Expiry Window</Text>
                      <Text style={styles.expiryCounter}>{formatTimer(heroSeconds)}</Text>
                    </View>
                  </View>
                  <View style={styles.dietaryPill}>
                    <MaterialIcons name="eco" size={12} color="#002109" />
                    <Text style={styles.dietaryText}>Halal + Veg</Text>
                  </View>
                </View>

                {/* CTA Button */}
                <TouchableOpacity
                  style={styles.claimButton}
                  activeOpacity={0.85}
                  onPress={() => setSelectedBatchForClaim(heroBatch)}
                >
                  <MaterialIcons name="lock-clock" size={18} color="#ffffff" />
                  <Text style={styles.claimButtonText}>Claim & Lock Reservation</Text>
                </TouchableOpacity>
              </LinearGradient>
            )}

            {/* Live Transit Tracker Card */}
            <View style={styles.transitCard}>
              <View style={styles.transitHeader}>
                <View style={styles.transitHeaderLeft}>
                  <View style={styles.transitIconBg}>
                    <MaterialIcons name="local-shipping" size={16} color="#9d4300" />
                  </View>
                  <View>
                    <Text style={styles.transitTitle}>Live Transit {transit.code}</Text>
                    <Text style={styles.transitSub}>
                      {transit.volunteerName} • {transit.shelterName}
                    </Text>
                  </View>
                </View>
                <View style={styles.etaPill}>
                  <Text style={styles.etaText}>ETA {transit.etaMinutes}m</Text>
                </View>
              </View>

              {/* 5-Step Progress */}
              <View style={styles.stepFlow}>
                <View style={styles.stepCol}>
                  <View style={styles.stepCircleDone}>
                    <MaterialIcons name="check" size={13} color="#ffffff" />
                  </View>
                  <Text style={styles.stepLabel}>Listed</Text>
                </View>
                <View style={styles.connectorDone} />
                <View style={styles.stepCol}>
                  <View style={styles.stepCircleDone}>
                    <MaterialIcons name="check" size={13} color="#ffffff" />
                  </View>
                  <Text style={styles.stepLabel}>Claimed</Text>
                </View>
                <View style={styles.connectorActive} />
                <View style={styles.stepCol}>
                  <View style={styles.stepCircleLocked}>
                    <MaterialIcons name="lock" size={13} color="#ffffff" />
                  </View>
                  <Text style={[styles.stepLabel, { color: '#9d4300', fontWeight: '800' }]}>Locked</Text>
                </View>
                <View style={styles.connectorInactive} />
                <View style={styles.stepCol}>
                  <View style={styles.stepCircleInactive}>
                    <MaterialIcons name="near-me" size={12} color="#94a3b8" />
                  </View>
                  <Text style={styles.stepLabelInactive}>Transit</Text>
                </View>
              </View>

              {/* Transit Footer */}
              <View style={styles.transitFooter}>
                <Text style={styles.transitStatusText}>
                  Step 3 of 5: Reservation locked, handoff in progress
                </Text>
                <TouchableOpacity onPress={() => setShowRouteModal(true)}>
                  <Text style={styles.routeLink}>Route Map →</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Filter Chips */}
            <View style={styles.filterSection}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterTitle}>Available Surplus</Text>
                <Text style={styles.filterSubtitle}>Sorted by Urgency Score</Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
                {[
                  { id: 'all', label: 'All (18)' },
                  { id: 'urgent', label: '⚡ Urgent (<2h)' },
                  { id: 'cooked', label: '🥘 Cooked Meals' },
                  { id: 'bakery', label: '🥖 Bakery' },
                  { id: 'produce', label: '🥬 Farm Produce' }
                ].map((chip) => {
                  const isSelected = selectedCategory === chip.id;
                  return (
                    <TouchableOpacity
                      key={chip.id}
                      onPress={() => setSelectedCategory(chip.id as any)}
                      style={[styles.chipPill, isSelected && styles.chipPillActive]}
                    >
                      <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                        {chip.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Feed Cards */}
            {feedBatches.map((batch) => {
              const isLocked = batch.status === 'locked';
              return (
                <View key={batch.id} style={styles.feedCard}>
                  <View style={styles.feedHeader}>
                    <View style={styles.feedHeaderLeft}>
                      <View style={[styles.feedIconBg, { backgroundColor: batch.iconBgColor }]}>
                        <MaterialIcons
                          name={batch.iconName as any}
                          size={22}
                          color={batch.iconTextColor}
                        />
                      </View>
                      <View style={styles.feedDonorCol}>
                        <View style={styles.rowCentered}>
                          <Text style={styles.feedDonorName}>{batch.donorName}</Text>
                          {batch.verified && (
                            <MaterialIcons name="verified" size={15} color="#006b2c" />
                          )}
                        </View>
                        <Text style={styles.feedDistance}>{batch.distanceLabel}</Text>
                      </View>
                    </View>

                    {isLocked ? (
                      <View style={styles.lockedPill}>
                        <MaterialIcons name="lock" size={13} color="#9d4300" />
                        <Text style={styles.lockedPillText}>Locked</Text>
                      </View>
                    ) : batch.category === 'produce' ? (
                      <View style={styles.availablePill}>
                        <Text style={styles.availablePillText}>Available</Text>
                      </View>
                    ) : (
                      <View style={styles.scorePill}>
                        <View style={styles.smallPingOrange} />
                        <Text style={styles.scorePillText}>Score {batch.urgencyScore}</Text>
                      </View>
                    )}
                  </View>

                  {/* Food Specs Well */}
                  <View style={styles.foodSpecWell}>
                    <View style={styles.specTitleRow}>
                      <Text style={styles.specTitle}>{batch.title}</Text>
                      <Text
                        style={[
                          styles.specTimer,
                          { color: isLocked ? '#64748b' : batch.category === 'produce' ? '#00685f' : '#fd761a' }
                        ]}
                      >
                        {batch.pickupWindow}
                      </Text>
                    </View>
                    <Text style={styles.specDesc}>{batch.description}</Text>

                    {!isLocked && batch.tags && (
                      <View style={styles.tagRow}>
                        {batch.tags.map((t, i) => (
                          <View key={i} style={styles.specTag}>
                            <Text style={styles.specTagText}>{t}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Actions / Locked Row */}
                  {isLocked ? (
                    <View style={styles.claimedLockBanner}>
                      <View style={styles.rowCentered}>
                        <MaterialIcons name="shield" size={16} color="#006b2c" />
                        <Text style={styles.claimedText}>
                          Claimed by <Text style={{ fontWeight: '800' }}>{batch.claimedBy}</Text>
                        </Text>
                      </View>
                      <View style={styles.rowCentered}>
                        <MaterialIcons name="directions-bike" size={14} color="#006b2c" />
                        <Text style={styles.driverEnRouteText}>Driver En Route</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.actionRow}>
                      <TouchableOpacity
                        style={[
                          styles.reserveBtn,
                          { backgroundColor: batch.category === 'produce' ? '#00873a' : '#006b2c' }
                        ]}
                        onPress={() => setSelectedBatchForClaim(batch)}
                      >
                        <MaterialIcons
                          name={batch.category === 'produce' ? 'add-task' : 'bookmark-add'}
                          size={18}
                          color="#ffffff"
                        />
                        <Text style={styles.reserveBtnText}>
                          {batch.category === 'produce' ? 'Claim Farm Batch' : 'Reserve & Dispatch'}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.shareBtn}
                        onPress={() => Alert.alert('Share Alert', `Dispatch alert for ${batch.title} copied.`)}
                      >
                        <MaterialIcons
                          name={batch.category === 'produce' ? 'navigation' : 'share'}
                          size={18}
                          color="#3e4a3d"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}

            {/* Regulatory Footer Pill */}
            <View style={styles.regulatoryPill}>
              <View style={styles.rowCentered}>
                <MaterialIcons name="verified-user" size={18} color="#006b2c" />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.regulatoryTitle}>Regulatory & Safe Food Handling</Text>
                  <Text style={styles.regulatorySub}>Encrypted reservations • Community trust protocol</Text>
                </View>
              </View>
              <MaterialIcons name="info-outline" size={18} color="#64748b" />
            </View>
          </>
        )}

        {/* Other Tabs: List Food Screen */}
        {activeTab === 'list' && (
          <View style={styles.tabPlaceholder}>
            <MaterialIcons name="add-circle" size={48} color="#006b2c" />
            <Text style={styles.tabHeading}>List Surplus Food in 60s</Text>
            <Text style={styles.tabSubtext}>
              Instant dispatch to community shelters and volunteers with FSSAI compliance verification.
            </Text>
            <TouchableOpacity
              style={styles.primaryActionButton}
              onPress={() => {
                Alert.alert('Batch Created!', 'Your surplus hot thali meals have been broadcast to the PS-05 grid.');
                setActiveTab('dashboard');
              }}
            >
              <Text style={styles.primaryActionText}>+ Publish 45 Hot Meals</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Pickups Screen */}
        {activeTab === 'pickups' && (
          <View style={styles.tabPlaceholder}>
            <MaterialIcons name="local-shipping" size={48} color="#9d4300" />
            <Text style={styles.tabHeading}>Active Couriers & Logistics</Text>
            <Text style={styles.tabSubtext}>
              Insulated temperature monitoring (71.4°C) and digital handshake OTP verification.
            </Text>
            <TouchableOpacity
              style={[styles.primaryActionButton, { backgroundColor: '#9d4300' }]}
              onPress={() => setShowRouteModal(true)}
            >
              <Text style={styles.primaryActionText}>Open Live Route Map</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Impact Screen */}
        {activeTab === 'impact' && (
          <View style={styles.tabPlaceholder}>
            <MaterialIcons name="volunteer-activism" size={48} color="#00685f" />
            <Text style={styles.tabHeading}>Community Environmental Impact</Text>
            <Text style={styles.tabSubtext}>
              {mealsRescued} Meals Rescued • 1,070 kg CO₂e Prevented • 85,600L Water Conserved across Mumbai.
            </Text>
            <TouchableOpacity
              style={[styles.primaryActionButton, { backgroundColor: '#00685f' }]}
              onPress={() => Alert.alert('Certificate Downloaded', 'PS-05 Authenticated Food Rescue Certificate exported.')}
            >
              <Text style={styles.primaryActionText}>Export Sustainability Certificate</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Floating Bottom Clay Dock */}
      <View style={styles.bottomDockContainer}>
        <View style={styles.bottomDock}>
          <TouchableOpacity
            style={[styles.dockItem, activeTab === 'dashboard' && styles.dockItemActive]}
            onPress={() => setActiveTab('dashboard')}
          >
            <MaterialIcons
              name="dashboard"
              size={22}
              color={activeTab === 'dashboard' ? '#006b2c' : '#3e4a3d'}
            />
            <Text style={[styles.dockLabel, activeTab === 'dashboard' && styles.dockLabelActive]}>
              Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dockItem, activeTab === 'list' && styles.dockItemActive]}
            onPress={() => setActiveTab('list')}
          >
            <MaterialIcons
              name="add-circle-outline"
              size={22}
              color={activeTab === 'list' ? '#006b2c' : '#3e4a3d'}
            />
            <Text style={[styles.dockLabel, activeTab === 'list' && styles.dockLabelActive]}>
              List Food
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dockItem, activeTab === 'pickups' && styles.dockItemActive]}
            onPress={() => setActiveTab('pickups')}
          >
            <View>
              <MaterialIcons
                name="local-shipping"
                size={22}
                color={activeTab === 'pickups' ? '#006b2c' : '#3e4a3d'}
              />
              <View style={styles.dockAlertDot} />
            </View>
            <Text style={[styles.dockLabel, activeTab === 'pickups' && styles.dockLabelActive]}>
              Pickups
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dockItem, activeTab === 'impact' && styles.dockItemActive]}
            onPress={() => setActiveTab('impact')}
          >
            <MaterialIcons
              name="volunteer-activism"
              size={22}
              color={activeTab === 'impact' ? '#006b2c' : '#3e4a3d'}
            />
            <Text style={[styles.dockLabel, activeTab === 'impact' && styles.dockLabelActive]}>
              Impact
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Claim Reservation Modal */}
      <Modal visible={!!selectedBatchForClaim} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Lock Food Reservation</Text>
              <TouchableOpacity onPress={() => setSelectedBatchForClaim(null)}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            {selectedBatchForClaim && (
              <View style={styles.modalBatchCard}>
                <Text style={styles.modalDonor}>{selectedBatchForClaim.donorName}</Text>
                <Text style={styles.modalMealTitle}>{selectedBatchForClaim.title}</Text>
                <Text style={styles.modalQty}>{selectedBatchForClaim.quantityLabel}</Text>
              </View>
            )}

            <Text style={styles.modalLabel}>Select Recipient Shelter:</Text>
            {['Robin Hood Shelter (Byculla)', 'St. Jude Children Shelter', 'Rotary Community Kitchen'].map(
              (sh, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.shelterSelectBtn}
                  onPress={() => handleClaimConfirm(sh)}
                >
                  <MaterialIcons name="home-work" size={18} color="#006b2c" />
                  <Text style={styles.shelterSelectText}>{sh}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </Modal>

      {/* Route Map Modal */}
      <Modal visible={showRouteModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Live Transit #FR-892</Text>
              <TouchableOpacity onPress={() => setShowRouteModal(false)}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.mapBox}>
              <MaterialIcons name="map" size={54} color="#006b2c" />
              <Text style={styles.mapText}>Mumbai Central → Byculla Corridor</Text>
              <Text style={styles.mapSub}>Carrier: Rahul K. • ETA 12 mins • Temp: 71.4°C</Text>
            </View>

            <TouchableOpacity
              style={styles.claimButton}
              onPress={() => {
                Alert.alert('Handoff Sign-off', 'Step 4 completed: Insulated batch handed over to Robin Hood Shelter.');
                setShowRouteModal(false);
              }}
            >
              <Text style={styles.claimButtonText}>Complete Delivery Verification</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9ff'
  },
  header: {
    height: 70,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(248, 249, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  logoImage: {
    width: 34,
    height: 34
  },
  headerTextCol: {
    flexDirection: 'column'
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0b1c30',
    letterSpacing: -0.3
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#006b2c'
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 1
  },
  locationText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3e4a3d'
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5eeff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fd761a'
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#006b2c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 110,
    gap: 14
  },
  gridStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  pulsingGreen: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#006b2c'
  },
  liveStatusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#006b2c',
    letterSpacing: 0.5
  },
  safeVerifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#eff4ff'
  },
  safeVerifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3e4a3d'
  },
  roleContainer: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 30,
    backgroundColor: '#e5eeff',
    gap: 6
  },
  roleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 24,
    gap: 6
  },
  roleBtnActive: {
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: { shadowColor: '#006b2c', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5 },
      android: { elevation: 3 }
    })
  },
  roleBtnActiveOrange: {
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: { shadowColor: '#fd761a', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5 },
      android: { elevation: 3 }
    })
  },
  roleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3e4a3d'
  },
  roleTextActive: {
    color: '#006b2c',
    fontWeight: '800'
  },
  roleTextActiveOrange: {
    color: '#fd761a',
    fontWeight: '800'
  },
  clayCardMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 14,
    ...Platform.select({
      ios: { shadowColor: '#94a3b8', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 10 },
      android: { elevation: 4 }
    })
  },
  metricItem: {
    alignItems: 'center'
  },
  metricDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#dce9ff'
  },
  metricValueGreen: {
    fontSize: 20,
    fontWeight: '800',
    color: '#006b2c'
  },
  metricValueOrange: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fd761a'
  },
  metricValueTeal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#00685f'
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3e4a3d',
    marginTop: 3
  },
  smallPulseOrange: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fd761a',
    marginLeft: 4
  },
  heroCard: {
    borderRadius: 26,
    padding: 16,
    gap: 10,
    ...Platform.select({
      ios: { shadowColor: '#ba1a1a', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.18, shadowRadius: 12 },
      android: { elevation: 5 }
    })
  },
  heroBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  criticalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#ffffff'
  },
  criticalText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ba1a1a'
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#e5eeff'
  },
  distanceText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3e4a3d'
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  heroTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0b1c30'
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#3e4a3d',
    fontWeight: '500'
  },
  expiryWell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.85)'
  },
  expiryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  timerCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffdad6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  expiryLabel: {
    fontSize: 10,
    color: '#3e4a3d',
    fontWeight: '700'
  },
  expiryCounter: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ba1a1a',
    fontVariant: ['tabular-nums']
  },
  dietaryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#7ffc97'
  },
  dietaryText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#002109'
  },
  claimButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#006b2c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    ...Platform.select({
      ios: { shadowColor: '#006b2c', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8 },
      android: { elevation: 4 }
    })
  },
  claimButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff'
  },
  transitCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 16,
    gap: 12,
    ...Platform.select({
      ios: { shadowColor: '#94a3b8', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10 },
      android: { elevation: 3 }
    })
  },
  transitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  transitHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  transitIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffdbca',
    alignItems: 'center',
    justifyContent: 'center'
  },
  transitTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0b1c30'
  },
  transitSub: {
    fontSize: 11,
    color: '#3e4a3d',
    fontWeight: '500'
  },
  etaPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 14,
    backgroundColor: '#89f5e7'
  },
  etaText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#00201d'
  },
  stepFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  stepCol: {
    alignItems: 'center',
    gap: 4
  },
  stepCircleDone: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#006b2c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepCircleLocked: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#9d4300',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepCircleInactive: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#eff4ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  connectorDone: {
    flex: 1,
    height: 3,
    backgroundColor: '#006b2c'
  },
  connectorActive: {
    flex: 1,
    height: 3,
    backgroundColor: '#9d4300'
  },
  connectorInactive: {
    flex: 1,
    height: 3,
    backgroundColor: '#cbd5e1'
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0b1c30'
  },
  stepLabelInactive: {
    fontSize: 10,
    color: '#94a3b8'
  },
  transitFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4
  },
  transitStatusText: {
    fontSize: 11,
    color: '#3e4a3d'
  },
  routeLink: {
    fontSize: 11,
    fontWeight: '800',
    color: '#006b2c'
  },
  filterSection: {
    gap: 8,
    marginTop: 4
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0b1c30'
  },
  filterSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3e4a3d'
  },
  chipsScroll: {
    flexDirection: 'row'
  },
  chipPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    ...Platform.select({
      ios: { shadowColor: '#94a3b8', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5 },
      android: { elevation: 2 }
    })
  },
  chipPillActive: {
    backgroundColor: '#006b2c'
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0b1c30'
  },
  chipTextActive: {
    color: '#ffffff'
  },
  feedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 16,
    gap: 12,
    ...Platform.select({
      ios: { shadowColor: '#94a3b8', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10 },
      android: { elevation: 3 }
    })
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  feedHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1
  },
  feedIconBg: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  feedDonorCol: {
    flex: 1
  },
  feedDonorName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0b1c30',
    marginRight: 4
  },
  feedDistance: {
    fontSize: 11,
    color: '#3e4a3d',
    marginTop: 2
  },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: '#ffdbca'
  },
  smallPingOrange: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#fd761a',
    marginRight: 4
  },
  scorePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#341100'
  },
  lockedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: '#ffdbca'
  },
  lockedPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9d4300'
  },
  availablePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: '#7ffc97'
  },
  availablePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#002109'
  },
  foodSpecWell: {
    padding: 12,
    borderRadius: 18,
    backgroundColor: '#eff4ff',
    gap: 6
  },
  specTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  specTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0b1c30'
  },
  specTimer: {
    fontSize: 10,
    fontWeight: '800'
  },
  specDesc: {
    fontSize: 11,
    color: '#3e4a3d',
    lineHeight: 16
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4
  },
  specTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#e5eeff'
  },
  specTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0b1c30'
  },
  claimedLockBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 16,
    backgroundColor: '#e5eeff'
  },
  claimedText: {
    fontSize: 11,
    color: '#0b1c30',
    marginLeft: 6
  },
  driverEnRouteText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#006b2c',
    marginLeft: 4
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  reserveBtn: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    ...Platform.select({
      ios: { shadowColor: '#006b2c', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6 },
      android: { elevation: 3 }
    })
  },
  reserveBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff'
  },
  shareBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#eff4ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  regulatoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 20,
    backgroundColor: '#e5eeff',
    marginVertical: 4
  },
  regulatoryTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0b1c30'
  },
  regulatorySub: {
    fontSize: 10,
    color: '#3e4a3d'
  },
  tabPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 26,
    gap: 12,
    marginTop: 20
  },
  tabHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0b1c30',
    textAlign: 'center'
  },
  tabSubtext: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18
  },
  primaryActionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#006b2c',
    marginTop: 8
  },
  primaryActionText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff'
  },
  bottomDockContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    alignItems: 'center'
  },
  bottomDock: {
    width: '100%',
    maxWidth: 420,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 34,
    paddingVertical: 8,
    paddingHorizontal: 12,
    ...Platform.select({
      ios: { shadowColor: '#94a3b8', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16 },
      android: { elevation: 6 }
    })
  },
  dockItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20
  },
  dockItemActive: {
    backgroundColor: '#e5eeff'
  },
  dockLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3e4a3d',
    marginTop: 2
  },
  dockLabelActive: {
    color: '#006b2c',
    fontWeight: '800'
  },
  dockAlertDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9d4300'
  },
  rowCentered: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    gap: 14
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0b1c30'
  },
  modalBatchCard: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#eff4ff',
    gap: 4
  },
  modalDonor: {
    fontSize: 12,
    fontWeight: '800',
    color: '#006b2c'
  },
  modalMealTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0b1c30'
  },
  modalQty: {
    fontSize: 11,
    color: '#64748b'
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0b1c30',
    marginTop: 4
  },
  shelterSelectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#f8f9ff',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  shelterSelectText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0b1c30'
  },
  mapBox: {
    height: 180,
    borderRadius: 20,
    backgroundColor: '#eff4ff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6
  },
  mapText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0b1c30'
  },
  mapSub: {
    fontSize: 11,
    color: '#64748b'
  }
});
