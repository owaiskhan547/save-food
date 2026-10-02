import React from 'react';

export const MetricStrip = ({
  mealsRescued,
  batchesNear,
  avgPickupTime
}) => {
  return (
    <div className="w-full rounded-[26px] bg-[#ffffff] p-3.5 shadow-[10px_14px_24px_-4px_rgba(148,163,184,0.35),inset_3px_3px_6px_rgba(255,255,255,0.95),inset_-4px_-4px_8px_rgba(100,116,139,0.08)] flex items-center justify-around divide-x-0 border border-white/60">
      {/* Metric 1 */}
      <div className="flex flex-col items-center text-center px-2">
        <span className="text-[20px] font-extrabold text-[#006b2c] tracking-tight leading-none">
          {mealsRescued}
        </span>
        <span className="text-[10px] font-bold text-[#3e4a3d] mt-1">
          Meals Rescued
        </span>
      </div>

      <div className="w-px h-8 bg-[#dce9ff]"></div>

      {/* Metric 2 */}
      <div className="flex flex-col items-center text-center px-2">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-[20px] font-extrabold text-[#fd761a] tracking-tight">
            {batchesNear}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#fd761a] animate-pulse"></span>
        </div>
        <span className="text-[10px] font-bold text-[#3e4a3d] mt-1">
          Batches Near
        </span>
      </div>

      <div className="w-px h-8 bg-[#dce9ff]"></div>

      {/* Metric 3 */}
      <div className="flex flex-col items-center text-center px-2">
        <span className="text-[20px] font-extrabold text-[#00685f] tracking-tight leading-none">
          {avgPickupTime}
        </span>
        <span className="text-[10px] font-bold text-[#3e4a3d] mt-1">
          Avg Pickup
        </span>
      </div>
    </div>
  );
};
