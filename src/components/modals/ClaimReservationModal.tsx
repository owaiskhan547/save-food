import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FoodBatch } from '../../types';
import { SHELTERS_LIST } from '../../data/mockData';

interface ClaimReservationModalProps {
  batch: FoodBatch | null;
  onClose: () => void;
  onConfirmClaim: (batchId: string, shelterName: string, needsCourier: boolean) => void;
}

export const ClaimReservationModal: React.FC<ClaimReservationModalProps> = ({
  batch,
  onClose,
  onConfirmClaim
}) => {
  const [selectedShelter, setSelectedShelter] = useState(SHELTERS_LIST[0].name);
  const [needCourier, setNeedCourier] = useState(true);
  const [beneficiaryCount, setBeneficiaryCount] = useState(40);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!batch) return null;

  const handleClaim = () => {
    setIsSubmitting(true);
    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      onConfirmClaim(batch.id, selectedShelter, needCourier);
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[28px] p-5 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto border border-gray-100 animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#006b2c]/10 text-[#006b2c] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">lock_clock</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0b1c30]">Lock Food Reservation</h3>
              <p className="text-[11px] text-gray-500">Secured via PS-05 Food Rescue Grid</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Selected Batch Summary */}
        <div className="p-3.5 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#006b2c]">{batch.donorName}</span>
            <span className="text-[10px] font-bold text-gray-500">{batch.distanceLabel}</span>
          </div>
          <p className="text-sm font-extrabold text-[#0b1c30]">{batch.title}</p>
          <div className="flex items-center justify-between text-xs text-gray-600 pt-1 border-t border-blue-100/80">
            <span>Holding Temp: <b className="text-emerald-700">{batch.temperatureHolding || 'Safe 68°C'}</b></span>
            <span>Quantity: <b className="text-[#0b1c30]">{batch.quantityLabel}</b></span>
          </div>
        </div>

        {/* Shelter Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#0b1c30]">
            Assign Beneficiary Shelter / Kitchen:
          </label>
          <div className="grid grid-cols-1 gap-2">
            {SHELTERS_LIST.map((shelter) => (
              <button
                key={shelter.id}
                type="button"
                onClick={() => setSelectedShelter(shelter.name)}
                className={`p-3 rounded-2xl flex items-center justify-between text-left transition-all ${
                  selectedShelter === shelter.name
                    ? 'bg-[#006b2c]/10 border-2 border-[#006b2c] text-[#006b2c]'
                    : 'bg-gray-50 hover:bg-gray-100 border border-transparent text-gray-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{shelter.name}</div>
                  <div className="text-[10px] text-gray-500">{shelter.area} • Cap: {shelter.capacity}</div>
                </div>
                {selectedShelter === shelter.name && (
                  <span className="material-symbols-outlined text-[#006b2c] text-[20px]">check_circle</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Logistics mode */}
        <div className="p-3 rounded-2xl bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fd761a]">local_shipping</span>
            <div className="text-xs">
              <div className="font-bold text-[#0b1c30]">Auto-Dispatch Volunteer Transit</div>
              <div className="text-[10px] text-gray-500">Assign nearby insulated vehicle (ETA ~12-15m)</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={needCourier}
            onChange={(e) => setNeedCourier(e.target.checked)}
            className="w-5 h-5 accent-[#006b2c] rounded cursor-pointer"
          />
        </div>

        {/* Beneficiaries Count Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#0b1c30]">Beneficiaries receiving meals:</span>
            <span className="font-extrabold text-[#006b2c]">{beneficiaryCount} people</span>
          </div>
          <input
            type="range"
            min={10}
            max={80}
            value={beneficiaryCount}
            onChange={(e) => setBeneficiaryCount(Number(e.target.value))}
            className="w-full accent-[#006b2c] cursor-pointer"
          />
        </div>

        {/* Instant Digital OTP Handshake */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-amber-600 text-[18px]">verified</span>
            <span>Security Lock OTP generated upon reservation</span>
          </div>
          <span className="font-mono font-bold bg-amber-200/80 px-2 py-0.5 rounded text-amber-900">#RF-9842</span>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-full border border-gray-300 font-bold text-xs text-gray-600 hover:bg-gray-50 active:scale-98"
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            onClick={handleClaim}
            className="flex-[2] h-12 rounded-full bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs shadow-[0_8px_18px_-3px_rgba(0,107,44,0.38)] flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Securing Batch...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Confirm &amp; Lock Reservation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
