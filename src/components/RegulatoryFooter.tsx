import React from 'react';

interface RegulatoryFooterProps {
  onOpenSafetyProtocol: () => void;
}

export const RegulatoryFooter: React.FC<RegulatoryFooterProps> = ({ onOpenSafetyProtocol }) => {
  return (
    <button
      onClick={onOpenSafetyProtocol}
      className="my-2 p-3.5 rounded-2xl bg-[#e5eeff] flex items-center justify-between gap-2 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),inset_-1px_-1px_3px_rgba(100,116,139,0.08)] hover:bg-[#dce9ff] active:scale-[0.99] transition-all text-left w-full cursor-pointer"
    >
      <div className="flex items-center gap-2.5">
        <span className="material-symbols-outlined text-[#006b2c] text-[20px]">
          verified_user
        </span>
        <div className="flex flex-col">
          <span className="text-xs text-[#0b1c30] font-bold">
            Regulatory &amp; Safe Food Handling
          </span>
          <span className="text-[11px] text-[#3e4a3d] font-normal">
            Encrypted reservations • Community trust protocol
          </span>
        </div>
      </div>
      <span className="material-symbols-outlined text-[#3e4a3d] text-[18px]">
        info
      </span>
    </button>
  );
};
