import React from 'react';

export const FilterChips = ({
  selectedCategory,
  onSelectCategory,
  counts
}) => {
  const chips = [
    { id: 'all', label: `All (${counts?.all || 0})` },
    { id: 'urgent', label: `Urgent (<2h)`, icon: 'bolt' },
    { id: 'cooked', label: '🥘 Cooked Meals' },
    { id: 'bakery', label: '🥖 Bakery' },
    { id: 'produce', label: '🥬 Farm Produce' }
  ];

  return (
    <div className="flex flex-col gap-2 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-[17px] font-extrabold text-[#0b1c30]">
          Available Surplus
        </span>
        <span className="text-[10px] font-bold text-[#3e4a3d] tracking-wide">
          Sorted by Urgency Score
        </span>
      </div>

      {/* Horizontal Scrollable Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
        {chips.map((chip) => {
          const isSelected = selectedCategory === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onSelectCategory(chip.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-[#006b2c] text-white shadow-[0_6px_12px_rgba(0,107,44,0.3),inset_0_2px_3px_rgba(255,255,255,0.4)] translate-y-0.5 scale-[0.98]'
                  : 'bg-[#ffffff] text-[#0b1c30] shadow-[6px_8px_16px_-3px_rgba(148,163,184,0.25),inset_2px_2px_4px_rgba(255,255,255,1),inset_-2px_-2px_4px_rgba(100,116,139,0.06)] hover:bg-[#eff4ff]'
              }`}
            >
              {chip.icon && (
                <span className={`material-symbols-outlined text-[16px] ${isSelected ? 'text-white' : 'text-[#9d4300]'}`}>
                  {chip.icon}
                </span>
              )}
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
