import React from 'react';

interface SafeProtocolModalProps {
  onClose: () => void;
}

export const SafeProtocolModal: React.FC<SafeProtocolModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-[28px] p-5 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#00685f]/10 text-[#00685f] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0b1c30]">Safe Food Handling Standards</h3>
              <p className="text-[10px] text-gray-500">PS-05 Regulatory &amp; Community Trust Protocols</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3 text-xs text-gray-700">
          <div className="p-3 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#006b2c] text-[20px] shrink-0">thermostat</span>
            <div>
              <div className="font-bold text-[#0b1c30]">Thermal Holding Thresholds</div>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Cooked meals must remain above 60°C (140°F) in insulated vats or chilled below 5°C (41°F) during all transit legs.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-amber-600 text-[20px] shrink-0">timer</span>
            <div>
              <div className="font-bold text-amber-900">2-Hour Expiration Rule</div>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Surplus prepared food must be picked up and dispatched to the designated community shelter within 120 minutes of collection declaration.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0">qr_code_scanner</span>
            <div>
              <div className="font-bold text-emerald-900">Encrypted Handshake Handover</div>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                A dual-sided PIN verification code prevents unauthorized pickups and seals custody transfer in the immutable rescue log.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-full bg-[#006b2c] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98"
        >
          <span>Understood &amp; Verified</span>
        </button>
      </div>
    </div>
  );
};
