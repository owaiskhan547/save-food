import React, { useState } from 'react';
import { LOCATIONS } from '../data/mockData';

export const Header = ({
  currentLocation,
  onSelectLocation,
  unreadCount,
  onOpenNotifications,
  onOpenProfile,
  onOpenExpoCode,
  onOpenMapsGrounding,
  currentUser
}) => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-40 pt-safe bg-[#f8f9ff]/90 backdrop-blur-xl clay-header border-b border-white/60">
        <div className="h-20 px-4 max-w-xl mx-auto flex items-center justify-between gap-2.5">
          {/* Logo & Brand & Location */}
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              alt="RescueFeed Logo"
              className="h-8 w-auto object-contain shrink-0 drop-shadow-sm"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WZjJGH6bcPZej_eeZy-BPSkgcRFFQZRdMFGbOg5_o88MMBUdl72jGImNUsq8q8xYeWh0JVKP4B7y0IU5CKkQeZ6PSKOmALGGXn4PzGDMI9t_WB45Pv7jRtMdRnP56FtJdmt2N4BAYdSf7ozXnwe7bBLY0Tjj6ofqqtGb70-8tKSiiETHcPFq5IqJbhCDckHp4bsSv61kmkq8eBygtHN26mvhMTkDEYGHwhneh9tXcUPuTVWMwsb9euSLoQ"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[17px] text-[#0b1c30] tracking-tight leading-tight truncate">
                  RescueFeed
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#006b2c] animate-pulse shrink-0"></span>
              </div>
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1 text-[#3e4a3d] hover:text-[#006b2c] transition-colors text-left"
              >
                <span className="material-symbols-outlined text-[14px] text-[#006b2c] shrink-0">
                  location_on
                </span>
                <span className="text-[11px] font-bold tracking-tight truncate max-w-[130px]">
                  {currentLocation}
                </span>
                <span className="material-symbols-outlined text-[13px] text-gray-500">
                  expand_more
                </span>
              </button>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Google Maps Grounding Tool */}
            <button
              onClick={onOpenMapsGrounding}
              title="Google Maps Grounding (gemini-3.5-flash)"
              className="px-2.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#006b2c] font-bold text-[11px] flex items-center gap-1 shadow-sm active:scale-95 transition-all border border-emerald-300"
            >
              <span className="material-symbols-outlined text-[15px]">explore</span>
              <span className="hidden sm:inline">Maps AI</span>
            </button>

            {/* Expo Source Code Viewer */}
            <button
              onClick={onOpenExpoCode}
              title="React Native Expo Source Code"
              className="px-2 py-1.5 rounded-full bg-[#e5eeff] hover:bg-[#dce9ff] text-[#006b2c] font-bold text-[11px] flex items-center gap-1 shadow-sm active:scale-95 transition-all border border-[#006b2c]/20"
            >
              <span className="material-symbols-outlined text-[15px]">smartphone</span>
              <span className="hidden sm:inline">Expo</span>
            </button>

            {/* Notifications */}
            <button
              onClick={onOpenNotifications}
              aria-label="Notifications"
              className="relative w-9 h-9 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#0b1c30] hover:bg-[#dce9ff] active:scale-95 transition-all shadow-[inset_1px_1px_3px_rgba(255,255,255,0.9),inset_-1px_-1px_3px_rgba(100,116,139,0.12)]"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#fd761a] animate-pulse ring-2 ring-white"></span>
              )}
            </button>

            {/* User Profile / Google Sign-in */}
            <button
              onClick={onOpenProfile}
              aria-label="User Profile"
              className="relative w-9 h-9 rounded-full bg-[#006b2c] text-white flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(0,107,44,0.3)] hover:opacity-90 active:scale-95 transition-transform overflow-hidden border border-white"
            >
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-[18px]">person</span>
              )}
              {currentUser && (
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-white"></span>
              )}
            </button>
          </div>
        </div>

        {/* Location Dropdown Modal */}
        {showLocationDropdown && (
          <div className="absolute top-20 left-4 right-4 max-w-sm mx-auto bg-white rounded-2xl p-3 shadow-2xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Select Active Grid Hub</span>
              <button
                onClick={() => setShowLocationDropdown(false)}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    onSelectLocation(loc);
                    setShowLocationDropdown(false);
                  }}
                  className={`flex items-center justify-between p-2 rounded-xl text-left text-xs font-semibold transition-all ${
                    currentLocation === loc
                      ? 'bg-[#e5eeff] text-[#006b2c] font-bold'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#006b2c]">near_me</span>
                    {loc}
                  </span>
                  {currentLocation === loc && (
                    <span className="material-symbols-outlined text-sm text-[#006b2c]">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
