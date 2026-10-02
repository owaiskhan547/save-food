import React, { useState, useEffect } from 'react';

export const FoodCard = ({ batch, onClaim, onShare }) => {
  const [secondsLeft, setSecondsLeft] = useState(batch?.expirySecondsRemaining || 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isLocked = batch?.status === 'locked';

  if (!batch) return null;

  return (
    <div
      className={`w-full rounded-[26px] p-4 flex flex-col gap-3 transition-all border border-white/60 ${
        isLocked
          ? 'bg-[#ffffff]/90 shadow-[10px_14px_24px_-4px_rgba(148,163,184,0.25),inset_3px_3px_6px_rgba(255,255,255,0.95),inset_-4px_-4px_8px_rgba(100,116,139,0.06)]'
          : 'bg-[#ffffff] shadow-[10px_14px_24px_-4px_rgba(148,163,184,0.35),inset_3px_3px_6px_rgba(255,255,255,0.95),inset_-4px_-4px_8px_rgba(100,116,139,0.08)]'
      }`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.9),inset_-1px_-1px_3px_rgba(100,116,139,0.12)] ${batch.iconBgColor} ${batch.iconTextColor}`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {batch.iconName}
            </span>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[16px] font-extrabold text-[#0b1c30] truncate">
                {batch.donorName}
              </span>
              {batch.verified && (
                <span className="material-symbols-outlined text-[#006b2c] text-[16px] shrink-0">
                  verified
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#3e4a3d] truncate font-medium">
              {batch.distanceLabel}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        {isLocked ? (
          <div className="px-2.5 py-1 rounded-full bg-[#fd761a]/15 text-[#9d4300] text-[10px] font-extrabold flex items-center gap-1 shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>Locked</span>
          </div>
        ) : batch.category === 'produce' ? (
          <div className="px-2.5 py-1 rounded-full bg-[#7ffc97] text-[#002109] text-[10px] font-extrabold flex items-center gap-1 shrink-0 shadow-sm">
            <span>Available</span>
          </div>
        ) : (
          <div className="px-2.5 py-1 rounded-full bg-[#ffdbca] text-[#341100] text-[10px] font-extrabold flex items-center gap-1 shadow-sm shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fd761a] animate-ping"></span>
            <span>Score {batch.urgencyScore}</span>
          </div>
        )}
      </div>

      {/* Food Batch Specs Well */}
      <div className="p-3 rounded-2xl bg-[#eff4ff]/70 shadow-[inset_2px_2px_4px_rgba(100,116,139,0.06),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#0b1c30]">
            {batch.title}
          </span>
          <span
            className={`text-[10px] font-extrabold shrink-0 ${
              isLocked
                ? 'text-[#3e4a3d]'
                : batch.category === 'produce'
                ? 'text-[#00685f]'
                : 'text-[#fd761a]'
            }`}
          >
            {batch.category === 'produce'
              ? batch.pickupWindow
              : isLocked
              ? `${formatTimer(secondsLeft)} remaining`
              : `⏳ ${formatTimer(secondsLeft)} left`}
          </span>
        </div>

        <p className="text-[11px] text-[#3e4a3d] font-normal leading-relaxed">
          {batch.description}
        </p>

        {batch.tags && batch.tags.length > 0 && !isLocked && (
          <div className="flex items-center flex-wrap gap-1.5 pt-1">
            {batch.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-lg bg-[#e5eeff] text-[#0b1c30] text-[10px] font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Locked Banner or Action Row */}
      {isLocked ? (
        <div className="p-2.5 rounded-2xl bg-[#e5eeff] flex items-center justify-between gap-2 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9),inset_-1px_-1px_2px_rgba(100,116,139,0.06)]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#006b2c] text-[18px] shrink-0">
              shield
            </span>
            <span className="text-[10px] text-[#0b1c30] truncate">
              Claimed by <b className="font-bold">{batch.claimedBy || 'St. Jude Shelter'}</b>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#006b2c] text-[10px] font-bold shrink-0">
            <span className="material-symbols-outlined text-[16px]">directions_bike</span>
            <span>{batch.transitStatus || 'Driver En Route'}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2.5 pt-0.5">
          <button
            onClick={() => onClaim(batch)}
            className={`flex-1 h-12 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer text-white ${
              batch.category === 'produce'
                ? 'bg-[#00873a] hover:bg-[#006b2c] shadow-[0_6px_16px_rgba(0,135,58,0.32),inset_0_2px_3px_rgba(255,255,255,0.4)]'
                : 'bg-[#006b2c] hover:bg-[#00873a] shadow-[0_6px_16px_rgba(0,107,44,0.32),inset_0_2px_3px_rgba(255,255,255,0.45)]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {batch.category === 'produce' ? 'add_task' : 'bookmark_add'}
            </span>
            <span>{batch.category === 'produce' ? 'Claim Farm Batch' : 'Reserve & Dispatch'}</span>
          </button>

          <button
            onClick={() => onShare(batch)}
            aria-label="Share surplus alert"
            className="w-12 h-12 rounded-full bg-[#eff4ff] text-[#3e4a3d] flex items-center justify-center shadow-[4px_6px_12px_rgba(148,163,184,0.25),inset_2px_2px_4px_rgba(255,255,255,0.9)] hover:bg-[#e5eeff] active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">
              {batch.category === 'produce' ? 'navigation' : 'share'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
