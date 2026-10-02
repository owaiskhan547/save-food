import React from 'react';

interface RoleSwitcherProps {
  currentRole: 'ngo' | 'provider';
  onRoleChange: (role: 'ngo' | 'provider') => void;
  onOpenSafetyProtocol: () => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  currentRole,
  onRoleChange,
  onOpenSafetyProtocol
}) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Live Grid Indicator & Compliance Verification */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006b2c] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006b2c]"></span>
          </span>
          <span className="text-[10px] font-extrabold text-[#006b2c] uppercase tracking-wider">
            PS-05 • LIVE RESCUE GRID
          </span>
        </div>

        <button
          onClick={onOpenSafetyProtocol}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eff4ff] shadow-[inset_1px_1px_3px_rgba(255,255,255,0.9),inset_-1px_-1px_3px_rgba(100,116,139,0.12)] hover:bg-[#dce9ff] transition-all"
        >
          <span className="material-symbols-outlined text-[#006b2c] text-[14px]">
            verified
          </span>
          <span className="text-[10px] text-[#3e4a3d] font-bold tracking-tight">
            FDA Safe Verified
          </span>
        </button>
      </div>

      {/* Clay Mode Switcher Pill */}
      <div className="w-full p-1.5 rounded-full bg-[#e5eeff] shadow-[inset_2px_2px_5px_rgba(100,116,139,0.15),inset_-2px_-2px_4px_rgba(255,255,255,0.85)] flex items-center justify-between gap-1">
        <button
          onClick={() => onRoleChange('ngo')}
          className={`flex-1 py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all text-xs font-bold ${
            currentRole === 'ngo'
              ? 'bg-[#ffffff] text-[#006b2c] shadow-[0_4px_12px_rgba(0,107,44,0.18),inset_2px_2px_4px_rgba(255,255,255,1),inset_-2px_-2px_4px_rgba(100,116,139,0.06)] scale-[1.01]'
              : 'text-[#3e4a3d] hover:text-[#0b1c30]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            volunteer_activism
          </span>
          <span>NGO / Recipient</span>
        </button>

        <button
          onClick={() => onRoleChange('provider')}
          className={`flex-1 py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all text-xs font-bold ${
            currentRole === 'provider'
              ? 'bg-[#ffffff] text-[#fd761a] shadow-[0_4px_12px_rgba(253,118,26,0.22),inset_2px_2px_4px_rgba(255,255,255,1),inset_-2px_-2px_4px_rgba(100,116,139,0.06)] scale-[1.01]'
              : 'text-[#3e4a3d] hover:text-[#0b1c30]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            restaurant
          </span>
          <span>Food Provider</span>
        </button>
      </div>
    </div>
  );
};
