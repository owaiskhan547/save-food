import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TransitLogistics } from '../../types';

interface PickupsViewProps {
  transit: TransitLogistics;
  onAdvanceStep: (newStep: number) => void;
  onOpenRouteMap: () => void;
}

export const PickupsView: React.FC<PickupsViewProps> = ({
  transit,
  onAdvanceStep,
  onOpenRouteMap
}) => {
  const [tempVerified, setTempVerified] = useState(false);
  const [deliveryFinished, setDeliveryFinished] = useState(transit.currentStep >= 5);

  const handleFinishDelivery = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    onAdvanceStep(5);
    setDeliveryFinished(true);
  };

  return (
    <div className="flex flex-col gap-4 pb-24">
      {/* Header Banner */}
      <div className="p-4 rounded-[26px] bg-gradient-to-r from-[#9d4300] to-[#fd761a] text-white shadow-lg flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-85">Live Logistics Hub</span>
          <h2 className="text-lg font-extrabold">Active Transit &amp; Pickups</h2>
          <p className="text-xs opacity-90">Cold-chain and thermal insulated verification</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px]">local_shipping</span>
        </div>
      </div>

      {/* Active Delivery Dispatch Card */}
      <div className="clay-card p-4 sm:p-5 flex flex-col gap-3.5 border border-white/60">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006b2c] animate-ping"></span>
            <span className="text-xs font-extrabold text-[#0b1c30]">
              Dispatch {transit.code}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
            ETA {transit.etaMinutes}m
          </span>
        </div>

        {/* Courier details & interactive route trigger */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#eff4ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fd761a] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">directions_bike</span>
            </div>
            <div>
              <div className="text-xs font-bold text-[#0b1c30]">{transit.volunteerName}</div>
              <div className="text-[10px] text-gray-500">Carrier: Insulated Cargo Scooter</div>
            </div>
          </div>
          <button
            onClick={onOpenRouteMap}
            className="px-3 py-1.5 rounded-full bg-white text-[#006b2c] text-xs font-bold shadow-sm flex items-center gap-1 active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">map</span>
            <span>View Map</span>
          </button>
        </div>

        {/* Origin and Destination Route Points */}
        <div className="flex flex-col gap-2 p-3 rounded-2xl bg-gray-50 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#006b2c] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              A
            </div>
            <div>
              <div className="font-bold text-[#0b1c30]">{transit.donorName}</div>
              <div className="text-[10px] text-gray-500">{transit.donorAddress}</div>
            </div>
          </div>

          <div className="w-0.5 h-4 bg-gray-300 ml-2.5"></div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#00685f] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              B
            </div>
            <div>
              <div className="font-bold text-[#0b1c30]">{transit.shelterName}</div>
              <div className="text-[10px] text-gray-500">{transit.shelterAddress}</div>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry Strips */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-2xl bg-[#eff4ff] flex flex-col gap-1">
            <span className="text-[10px] text-gray-500 font-bold uppercase">Thermal Sensor</span>
            <div className="flex items-center gap-1 text-xs font-extrabold text-[#006b2c]">
              <span className="material-symbols-outlined text-sm">thermostat</span>
              <span>{transit.temperatureReading}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#ffdbca]/60 flex flex-col gap-1">
            <span className="text-[10px] text-gray-600 font-bold uppercase">Security Handshake OTP</span>
            <div className="flex items-center gap-1 text-xs font-extrabold text-[#9d4300] font-mono">
              <span className="material-symbols-outlined text-sm">pin</span>
              <span>{transit.otpCode}</span>
            </div>
          </div>
        </div>

        {/* 5-Step Protocol Tracker */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="text-xs font-bold text-[#0b1c30]">
            Logistics Protocol Progress (Step {transit.currentStep} of 5)
          </div>
          <div className="flex flex-col gap-2">
            {transit.steps.map((st, i) => {
              const sNum = i + 1;
              const isPast = sNum <= transit.currentStep;
              return (
                <div
                  key={i}
                  onClick={() => onAdvanceStep(sNum)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                    sNum === transit.currentStep
                      ? 'bg-amber-50 border-amber-300 font-bold text-amber-900 shadow-sm'
                      : isPast
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-white border-gray-100 opacity-60 text-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isPast ? 'bg-[#006b2c] text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isPast ? '✓' : sNum}
                    </span>
                    <span>{st.title}: {st.description}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 shrink-0">{st.timestamp}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2">
          {!tempVerified && (
            <button
              onClick={() => setTempVerified(true)}
              className="w-full h-11 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#006b2c] text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-sm">task_alt</span>
              <span>Record Digital Temperature Inspection (71.4°C)</span>
            </button>
          )}

          {tempVerified && (
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 text-[11px] font-bold text-center">
              ✓ Temperature Certified Above FSSAI Holding Threshold (&gt;60°C)
            </div>
          )}

          {deliveryFinished ? (
            <div className="w-full h-12 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>All 40 Meals Successfully Delivered to Robin Hood Shelter</span>
            </div>
          ) : (
            <button
              onClick={handleFinishDelivery}
              className="w-full h-12 rounded-full bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs shadow-[0_8px_18px_-3px_rgba(0,107,44,0.38)] flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">done_all</span>
              <span>Sign-off &amp; Complete Batch Delivery</span>
            </button>
          )}
        </div>
      </div>

      {/* Completed History List */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-extrabold text-gray-600 uppercase tracking-wider px-1">
          Recent Completed Rescues
        </span>
        <div className="clay-card p-3.5 flex flex-col gap-2 border border-white/60">
          <div className="flex items-center justify-between text-xs font-bold text-[#0b1c30]">
            <span>Sunrise Artisan Bakery → St. Jude Shelter</span>
            <span className="text-[#006b2c]">Delivered 1h ago</span>
          </div>
          <p className="text-[11px] text-gray-500">25 Boxes Fresh Sourdough • Verified by Driver Sunita M.</p>
        </div>
      </div>
    </div>
  );
};
