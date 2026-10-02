import React, { useState } from 'react';
import { RoleSwitcher } from '../RoleSwitcher';
import { MetricStrip } from '../MetricStrip';
import { HeroUrgentCard } from '../HeroUrgentCard';
import { TransitTrackerCard } from '../TransitTrackerCard';
import { FilterChips } from '../FilterChips';
import { FoodCard } from '../FoodCard';
import { RegulatoryFooter } from '../RegulatoryFooter';

export const DashboardView = ({
  role,
  onRoleChange,
  batches = [],
  transit,
  mealsRescued,
  batchesNear,
  avgPickupTime,
  onClaimBatch,
  onShareBatch,
  onOpenRouteMap,
  onOpenSafetyProtocol,
  onNavigateToListFood
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter batches
  const heroBatch = batches.find((b) => b.isCritical) || batches[0];
  const feedBatches = batches.filter((b) => !b.isCritical);

  const filteredFeed = feedBatches.filter((b) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'urgent') return b.urgencyScore >= 90 || b.expirySecondsRemaining < 7200;
    if (selectedCategory === 'cooked') return b.category === 'cooked';
    if (selectedCategory === 'bakery') return b.category === 'bakery';
    if (selectedCategory === 'produce') return b.category === 'produce';
    return true;
  });

  const categoryCounts = {
    all: batches.length,
    urgent: batches.filter((b) => b.urgencyScore >= 90 || b.expirySecondsRemaining < 7200).length,
    cooked: batches.filter((b) => b.category === 'cooked').length,
    bakery: batches.filter((b) => b.category === 'bakery').length,
    produce: batches.filter((b) => b.category === 'produce').length
  };

  return (
    <div className="flex flex-col gap-4 pb-24">
      {/* Role Switcher & Live Beacon Header */}
      <RoleSwitcher
        currentRole={role}
        onRoleChange={onRoleChange}
        onOpenSafetyProtocol={onOpenSafetyProtocol}
      />

      {/* Provider Quick Action Banner if in provider mode */}
      {role === 'provider' && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-[#fd761a] to-[#9d4300] text-white shadow-lg flex items-center justify-between gap-3 animate-in fade-in">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wide opacity-90">Host Provider Mode</span>
            <h4 className="text-sm font-extrabold">Have Surplus Prepared Food?</h4>
            <p className="text-[11px] opacity-90">List a batch in 60s for immediate NGO pickup</p>
          </div>
          <button
            onClick={onNavigateToListFood}
            className="px-3.5 py-2 rounded-full bg-white text-[#9d4300] text-xs font-extrabold shadow active:scale-95 whitespace-nowrap cursor-pointer"
          >
            + List Food
          </button>
        </div>
      )}

      {/* Impact & Network Metric Strip */}
      <MetricStrip
        mealsRescued={mealsRescued}
        batchesNear={batchesNear}
        avgPickupTime={avgPickupTime}
      />

      {/* Live Urgent Attention Hero Card (Grand Banquet Palace) */}
      {heroBatch && (
        <HeroUrgentCard
          batch={heroBatch}
          onClaim={onClaimBatch}
        />
      )}

      {/* Active Distribution Flow Tracker (Live Transit #FR-892) */}
      <TransitTrackerCard
        transit={transit}
        onOpenRouteMap={onOpenRouteMap}
      />

      {/* Tactile Clay Filter Chips */}
      <FilterChips
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        counts={categoryCounts}
      />

      {/* Feed Cards List */}
      <div className="flex flex-col gap-3.5">
        {filteredFeed.map((batch) => (
          <FoodCard
            key={batch.id}
            batch={batch}
            onClaim={onClaimBatch}
            onShare={onShareBatch}
          />
        ))}

        {filteredFeed.length === 0 && (
          <div className="p-8 text-center text-gray-500 rounded-3xl bg-white shadow-sm flex flex-col items-center">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">fastfood</span>
            <p className="text-xs font-bold">No batches found in this category right now.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-2 text-xs text-[#006b2c] font-bold underline cursor-pointer"
            >
              View all available batches
            </button>
          </div>
        )}
      </div>

      {/* Regulatory & Safe Food Handling Footer Pill */}
      <RegulatoryFooter onOpenSafetyProtocol={onOpenSafetyProtocol} />
    </div>
  );
};
