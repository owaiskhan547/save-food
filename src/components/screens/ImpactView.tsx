import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface ImpactViewProps {
  mealsRescued: number;
}

export const ImpactView: React.FC<ImpactViewProps> = ({ mealsRescued }) => {
  const [downloaded, setDownloaded] = useState(false);

  // Calculations based on scientific food waste models: ~2.5 kg CO2e per meal, ~200L water per meal
  const co2eSavedKg = Math.round(mealsRescued * 2.5);
  const waterSavedLiters = Math.round(mealsRescued * 200);

  const handleDownloadCert = () => {
    confetti({ particleCount: 70, spread: 60 });
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="flex flex-col gap-4 pb-24">
      {/* Hero Header */}
      <div className="p-4 rounded-[26px] bg-gradient-to-r from-[#00685f] to-[#008378] text-white shadow-lg flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-85">Environmental &amp; Social Ledger</span>
          <h2 className="text-lg font-extrabold">Collective Community Impact</h2>
          <p className="text-xs opacity-90">Mumbai Central PS-05 Food Mesh Grid</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px]">public</span>
        </div>
      </div>

      {/* High Impact Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="clay-card p-4 flex flex-col gap-1 border border-white/60">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#006b2c] flex items-center justify-center mb-1">
            <span className="material-symbols-outlined text-[18px]">restaurant</span>
          </div>
          <span className="text-[22px] font-extrabold text-[#006b2c] leading-tight">
            {mealsRescued}
          </span>
          <span className="text-xs font-bold text-[#0b1c30]">Meals Rescued</span>
          <span className="text-[10px] text-gray-500">Zero food discarded to municipal landfill</span>
        </div>

        <div className="clay-card p-4 flex flex-col gap-1 border border-white/60">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-[#9d4300] flex items-center justify-center mb-1">
            <span className="material-symbols-outlined text-[18px]">co2</span>
          </div>
          <span className="text-[22px] font-extrabold text-[#9d4300] leading-tight">
            {co2eSavedKg} kg
          </span>
          <span className="text-xs font-bold text-[#0b1c30]">CO₂e Prevented</span>
          <span className="text-[10px] text-gray-500">Methane emissions avoided from decomposition</span>
        </div>

        <div className="clay-card p-4 flex flex-col gap-1 border border-white/60">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-1">
            <span className="material-symbols-outlined text-[18px]">water_drop</span>
          </div>
          <span className="text-[22px] font-extrabold text-blue-700 leading-tight">
            {waterSavedLiters.toLocaleString()} L
          </span>
          <span className="text-xs font-bold text-[#0b1c30]">Water Conserved</span>
          <span className="text-[10px] text-gray-500">Embedded agricultural freshwater saved</span>
        </div>

        <div className="clay-card p-4 flex flex-col gap-1 border border-white/60">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-[#00685f] flex items-center justify-center mb-1">
            <span className="material-symbols-outlined text-[18px]">groups</span>
          </div>
          <span className="text-[22px] font-extrabold text-[#00685f] leading-tight">
            18
          </span>
          <span className="text-xs font-bold text-[#0b1c30]">Active Shelters</span>
          <span className="text-[10px] text-gray-500">Community kitchens supported daily</span>
        </div>
      </div>

      {/* Leaderboard: Top Donors */}
      <div className="clay-card p-4 sm:p-5 flex flex-col gap-3 border border-white/60">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006b2c] text-lg">emoji_events</span>
            <span className="text-xs font-extrabold text-[#0b1c30]">Top Food Rescuers This Month</span>
          </div>
          <span className="text-[10px] font-bold text-gray-400">Verified Badges</span>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { name: 'Grand Banquet Palace', category: 'Banquet Hall', meals: '1,420 Meals', rank: '🥇' },
            { name: 'The Spice Pavilion', category: 'Caterer', meals: '980 Meals', rank: '🥈' },
            { name: 'Sunrise Artisan Bakery', category: 'Bakery', meals: '640 Meals', rank: '🥉' },
            { name: 'Green Valley Depot', category: 'Organic Produce', meals: '520 kg', rank: '4' }
          ].map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-gray-50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold w-5">{item.rank}</span>
                <div>
                  <div className="font-bold text-[#0b1c30]">{item.name}</div>
                  <div className="text-[10px] text-gray-500">{item.category}</div>
                </div>
              </div>
              <span className="font-extrabold text-[#006b2c]">{item.meals}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Certificate Card */}
      <div className="clay-card p-4 sm:p-5 bg-gradient-to-br from-white to-[#eff4ff] flex flex-col gap-3 border border-[#dce9ff]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b2c] text-[22px]">workspace_premium</span>
            <span className="text-xs font-extrabold text-[#0b1c30]">Grid Sustainability Certificate</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            PS-05 Authenticated
          </span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          Awarded to the operators and volunteers of Mumbai Central for zero-waste redistribution and adhering to cold-chain safety.
        </p>

        <button
          onClick={handleDownloadCert}
          className="w-full h-11 rounded-full bg-[#006b2c] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          <span>{downloaded ? 'Certificate Downloaded!' : 'Export Impact Certificate (PDF)'}</span>
        </button>
      </div>
    </div>
  );
};
