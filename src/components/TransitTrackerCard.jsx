import React from 'react';

export const TransitTrackerCard = ({
  transit,
  onOpenRouteMap
}) => {
  return (
    <div className="w-full rounded-[26px] bg-[#ffffff] p-4 shadow-[10px_14px_24px_-4px_rgba(148,163,184,0.35),inset_3px_3px_6px_rgba(255,255,255,0.95),inset_-4px_-4px_8px_rgba(100,116,139,0.08)] flex flex-col gap-3 border border-white/60">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#ffdbca] text-[#9d4300] flex items-center justify-center shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#0b1c30]">
              Live Transit {transit.code}
            </span>
            <span className="text-[11px] text-[#3e4a3d] font-medium">
              {transit.volunteerName} • {transit.shelterName}
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-[#89f5e7] text-[#00201d] text-[10px] font-extrabold tracking-tight">
          ETA {transit.etaMinutes}m
        </span>
      </div>

      {/* 5-Step Mini Visual Flow */}
      <div className="flex items-center justify-between pt-1 px-1">
        {/* Step 1: Listed */}
        <div className="flex flex-col items-center gap-1 text-center min-w-[50px]">
          <div className="w-7 h-7 rounded-full bg-[#006b2c] text-white flex items-center justify-center text-[12px] font-bold shadow-sm">
            <span className="material-symbols-outlined text-[14px]">check</span>
          </div>
          <span className="text-[10px] text-[#0b1c30] font-bold">Listed</span>
        </div>

        {/* Connector 1 */}
        <div className="flex-1 h-1 rounded-full bg-[#006b2c] -mx-1"></div>

        {/* Step 2: Claimed */}
        <div className="flex flex-col items-center gap-1 text-center min-w-[50px]">
          <div className="w-7 h-7 rounded-full bg-[#006b2c] text-white flex items-center justify-center text-[12px] font-bold shadow-sm">
            <span className="material-symbols-outlined text-[14px]">check</span>
          </div>
          <span className="text-[10px] text-[#0b1c30] font-bold">Claimed</span>
        </div>

        {/* Connector 2 */}
        <div className="flex-1 h-1 rounded-full bg-[#9d4300] -mx-1 animate-pulse"></div>

        {/* Step 3: Locked */}
        <div className="flex flex-col items-center gap-1 text-center min-w-[50px]">
          <div className="w-7 h-7 rounded-full bg-[#9d4300] text-white flex items-center justify-center text-[12px] font-bold shadow-[0_4px_10px_rgba(157,67,0,0.35)] scale-110">
            <span className="material-symbols-outlined text-[14px]">lock</span>
          </div>
          <span className="text-[10px] text-[#9d4300] font-extrabold">Locked</span>
        </div>

        {/* Connector 3 */}
        <div className="flex-1 h-1 rounded-full bg-gray-200 -mx-1"></div>

        {/* Step 4: Transit */}
        <div className="flex flex-col items-center gap-1 text-center min-w-[50px]">
          <div className="w-7 h-7 rounded-full bg-[#eff4ff] text-gray-400 border border-gray-200 flex items-center justify-center text-[12px] font-bold shadow-sm">
            <span className="material-symbols-outlined text-[14px]">near_me</span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium">Transit</span>
        </div>

        {/* Connector 4 */}
        <div className="flex-1 h-1 rounded-full bg-gray-200 -mx-1"></div>

        {/* Step 5: Done */}
        <div className="flex flex-col items-center gap-1 text-center min-w-[50px]">
          <div className="w-7 h-7 rounded-full bg-[#eff4ff] text-gray-400 border border-gray-200 flex items-center justify-center text-[12px] font-bold shadow-sm">
            <span className="material-symbols-outlined text-[14px]">done_all</span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium">Delivered</span>
        </div>
      </div>

      {/* Footer Info Row */}
      <div className="w-full flex items-center justify-between px-1 text-[#3e4a3d] text-[11px] pt-1">
        <span>Step 3 of 5: Reservation locked, handoff in progress</span>
        <button
          onClick={onOpenRouteMap}
          className="text-[#006b2c] hover:text-[#00873a] font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
        >
          <span>Route Map</span>
          <span className="text-xs">→</span>
        </button>
      </div>
    </div>
  );
};
