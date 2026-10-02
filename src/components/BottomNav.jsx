import React from 'react';

export const BottomNav = ({
  activeTab,
  onTabChange,
  pendingPickupsCount = 1
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe pointer-events-none">
      <div className="px-4 pb-4 pt-1 flex justify-center max-w-xl mx-auto">
        <div className="clay-float-dock pointer-events-auto rounded-full px-3 py-1.5 flex items-center justify-between gap-1 w-full max-w-md border border-white/70">
          {/* Tab 1: Dashboard */}
          <button
            onClick={() => onTabChange('dashboard')}
            className={`flex flex-col items-center justify-center flex-1 h-12 rounded-full transition-all active:scale-95 ${
              activeTab === 'dashboard'
                ? 'text-[#006b2c] font-bold bg-[#e5eeff]/80 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9),inset_-1px_-1px_2px_rgba(100,116,139,0.08)]'
                : 'text-[#3e4a3d] hover:text-[#0b1c30]'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] ${activeTab === 'dashboard' ? 'fill' : ''}`}>
              dashboard
            </span>
            <span className="text-[10px] tracking-wide font-bold">Dashboard</span>
          </button>

          {/* Tab 2: List Food */}
          <button
            onClick={() => onTabChange('list-food')}
            className={`flex flex-col items-center justify-center flex-1 h-12 rounded-full transition-all active:scale-95 ${
              activeTab === 'list-food'
                ? 'text-[#006b2c] font-bold bg-[#e5eeff]/80 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9),inset_-1px_-1px_2px_rgba(100,116,139,0.08)]'
                : 'text-[#3e4a3d] hover:text-[#0b1c30]'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] ${activeTab === 'list-food' ? 'fill' : ''}`}>
              add_circle
            </span>
            <span className="text-[10px] tracking-wide font-bold">List Food</span>
          </button>

          {/* Tab 3: Pickups */}
          <button
            onClick={() => onTabChange('pickups')}
            className={`relative flex flex-col items-center justify-center flex-1 h-12 rounded-full transition-all active:scale-95 ${
              activeTab === 'pickups'
                ? 'text-[#006b2c] font-bold bg-[#e5eeff]/80 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9),inset_-1px_-1px_2px_rgba(100,116,139,0.08)]'
                : 'text-[#3e4a3d] hover:text-[#0b1c30]'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] ${activeTab === 'pickups' ? 'fill' : ''}`}>
              local_shipping
            </span>
            <span className="text-[10px] tracking-wide font-bold">Pickups</span>
            {pendingPickupsCount > 0 && (
              <>
                <span className="absolute top-1 right-5 w-2 h-2 rounded-full bg-[#9d4300] animate-ping"></span>
                <span className="absolute top-1 right-5 w-2 h-2 rounded-full bg-[#9d4300]"></span>
              </>
            )}
          </button>

          {/* Tab 4: Impact */}
          <button
            onClick={() => onTabChange('impact')}
            className={`flex flex-col items-center justify-center flex-1 h-12 rounded-full transition-all active:scale-95 ${
              activeTab === 'impact'
                ? 'text-[#006b2c] font-bold bg-[#e5eeff]/80 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9),inset_-1px_-1px_2px_rgba(100,116,139,0.08)]'
                : 'text-[#3e4a3d] hover:text-[#0b1c30]'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] ${activeTab === 'impact' ? 'fill' : ''}`}>
              volunteer_activism
            </span>
            <span className="text-[10px] tracking-wide font-bold">Impact</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
