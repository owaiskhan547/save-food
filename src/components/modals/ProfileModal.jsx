import React, { useState } from 'react';
import { signInWithGoogle, logOut } from '../../firebase';

export const ProfileModal = ({
  onClose,
  role,
  onToggleRole,
  currentUser,
  onUserChange
}) => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const handleSignIn = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      const user = await signInWithGoogle();
      if (onUserChange) onUserChange(user);
    } catch (err) {
      console.error('[Google Sign-In Error]:', err);
      setAuthError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await logOut();
      if (onUserChange) onUserChange(null);
    } catch (err) {
      console.error('[Google Sign-Out Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white rounded-[28px] p-5 shadow-2xl flex flex-col gap-3.5 border border-gray-100 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006b2c] text-[20px]">badge</span>
            <h3 className="text-sm font-extrabold text-[#0b1c30]">Identity &amp; Authentication</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* User Card: Signed in vs Guest */}
        {currentUser ? (
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#eff4ff] border border-[#dce9ff]">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || 'User'}
                className="w-12 h-12 rounded-full object-cover shadow border-2 border-[#006b2c]"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#006b2c] text-white flex items-center justify-center text-lg font-extrabold shadow">
                {currentUser.displayName ? currentUser.displayName[0] : 'U'}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-[#0b1c30] truncate">
                {currentUser.displayName || 'Authorized Member'}
              </div>
              <div className="text-xs text-gray-500 truncate">{currentUser.email}</div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                  Firebase Authenticated
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2.5 text-center">
            <div className="text-xs font-bold text-[#0b1c30]">
              Sign in with Google to Sync Across Devices
            </div>
            <p className="text-[11px] text-gray-500">
              Authenticated users can publish surplus batches, claim reservations, and sign off deliveries with Firestore cloud persistence.
            </p>
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full h-11 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-xs font-bold flex items-center justify-center gap-2.5 shadow-sm active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? 'Connecting Google...' : 'Sign in with Google'}</span>
            </button>
          </div>
        )}

        {authError && (
          <div className="p-2 rounded-xl bg-red-50 text-red-700 text-[11px] font-semibold text-center">
            {authError}
          </div>
        )}

        {/* Badges & Trust Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex flex-col">
            <span className="text-[10px] text-gray-500">Database Status</span>
            <span className="font-extrabold text-[#006b2c] text-xs flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#006b2c] animate-pulse"></span>
              Firestore Live
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex flex-col">
            <span className="text-[10px] text-gray-500">Trust Score</span>
            <span className="font-extrabold text-[#fd761a] text-xs mt-0.5">99.4% FSSAI</span>
          </div>
        </div>

        {/* Role Quick Toggle */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <div>
            <div className="font-bold">Mode: {role === 'ngo' ? 'NGO / Recipient' : 'Food Provider'}</div>
            <div className="text-[10px] text-amber-700">Toggle perspectives on the grid</div>
          </div>
          <button
            onClick={onToggleRole}
            className="px-2.5 py-1 rounded-lg bg-amber-200/80 font-bold hover:bg-amber-300 text-amber-950 text-xs cursor-pointer"
          >
            Switch
          </button>
        </div>

        {/* Sign Out or Done */}
        <div className="flex gap-2 pt-1">
          {currentUser && (
            <button
              onClick={handleSignOut}
              className="flex-1 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold text-xs cursor-pointer"
            >
              Sign Out
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full bg-[#006b2c] text-white font-bold text-xs shadow active:scale-98 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
