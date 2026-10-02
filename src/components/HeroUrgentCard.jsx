import React, { useState, useEffect } from 'react';

export const HeroUrgentCard = ({ batch, onClaim }) => {
  const [secondsLeft, setSecondsLeft] = useState(batch?.expirySecondsRemaining || 6134);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
  };

  const isClaimed = batch?.status === 'claimed' || batch?.status === 'locked';

  if (!batch) return null;

  return (
    <div className="relative w-full rounded-[28px] bg-gradient-to-br from-[#ffdad6] via-[#eff4ff] to-[#ffffff] p-4 shadow-[12px_16px_28px_-6px_rgba(186,26,26,0.22),inset_3px_3px_8px_rgba(255,255,255,0.95),inset_-4px_-4px_8px_rgba(186,26,26,0.12)] flex flex-col gap-3 overflow-hidden border border-[#ffdad6]/60">
      {/* Decorative Glow Bubble */}
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#fd761a]/20 blur-xl pointer-events-none"></div>

      {/* Top Row Badges */}
      <div className="flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffffff]/90 shadow-[inset_1px_1px_2px_rgba(255,255,255,1),inset_-1px_-1px_2px_rgba(100,116,139,0.1)]">
          <span className="material-symbols-outlined text-[#ba1a1a] text-[16px] animate-bounce">
            alarm
          </span>
          <span className="text-[10px] text-[#ba1a1a] uppercase font-extrabold tracking-wider">
            Critical Expiry
          </span>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#3e4a3d] text-[10px] font-bold flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-[#9d4300] text-[14px]">
            near_me
          </span>
          <span>{batch.distanceLabel}</span>
        </div>
      </div>

      {/* Listing Information */}
      <div className="flex flex-col gap-1 z-10">
        <div className="flex items-center gap-1.5">
          <span className="text-[18px] font-extrabold text-[#0b1c30] tracking-tight truncate">
            {batch.donorName}
          </span>
          <span className="material-symbols-outlined text-[#006b2c] text-[18px]">
            verified
          </span>
        </div>
        <p className="text-[13px] text-[#3e4a3d] font-medium leading-snug">
          {batch.description}
        </p>
      </div>

      {/* Countdown Pill & Distance */}
      <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-[#ffffff]/85 shadow-[inset_2px_2px_4px_rgba(100,116,139,0.08),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">timer</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#3e4a3d] font-bold">Auto-Expiry Window</span>
            <span className="text-[17px] font-extrabold text-[#ba1a1a] tracking-tight font-mono">
              {formatCountdown(secondsLeft)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#7ffc97] text-[#002109] text-[10px] font-extrabold shadow-sm shrink-0">
          <span className="material-symbols-outlined text-[14px]">eco</span>
          <span>Halal + Veg</span>
        </div>
      </div>

      {/* CTA Claim Button */}
      {isClaimed ? (
        <div className="w-full h-12 rounded-full bg-[#e5eeff] text-[#006b2c] font-bold text-sm flex items-center justify-center gap-2 shadow-inner">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>Reservation Locked by You • OTP #9842</span>
        </div>
      ) : (
        <button
          onClick={() => onClaim(batch)}
          className="w-full h-12 rounded-full bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-sm shadow-[0_8px_18px_-3px_rgba(0,107,44,0.38),inset_0_3px_4px_rgba(255,255,255,0.45),inset_0_-3px_4px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer z-10"
        >
          <span className="material-symbols-outlined text-[20px]">lock_clock</span>
          <span>Claim &amp; Lock Reservation</span>
        </button>
      )}
    </div>
  );
};
