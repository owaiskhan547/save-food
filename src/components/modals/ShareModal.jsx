import React, { useState } from 'react';

export const ShareModal = ({ batch, onClose }) => {
  const [copied, setCopied] = useState(false);
  if (!batch) return null;

  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(`🚨 Rescue Alert: ${batch.title} available from ${batch.donorName} (${batch.distanceLabel}). Expiry window active on RescueFeed! ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white rounded-[28px] p-5 shadow-2xl flex flex-col gap-3.5 border border-gray-100 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">share</span>
            </div>
            <h3 className="text-sm font-extrabold text-[#0b1c30]">Dispatch Rescue Alert</h3>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center text-xs cursor-pointer">
            ✕
          </button>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 text-xs text-gray-700 flex flex-col gap-1">
          <span className="font-bold text-[#0b1c30]">{batch.donorName}</span>
          <span className="text-gray-500">{batch.title} • {batch.quantityLabel}</span>
          <span className="text-[#006b2c] font-semibold text-[11px]">{batch.distanceLabel}</span>
        </div>

        {/* Action items */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-full bg-[#006b2c] text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-98 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>{copied ? 'Copied Alert Link!' : 'Copy Volunteer Alert'}</span>
          </button>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`🚨 Food Rescue Alert: ${batch.title} at ${batch.donorName} (${batch.distanceLabel}). Please claim on RescueFeed.`)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-100 active:scale-98 border border-emerald-200"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Broadcast to WhatsApp Volunteers</span>
          </a>
        </div>
      </div>
    </div>
  );
};
