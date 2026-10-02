import React, { useState } from 'react';

export const RouteMapModal = ({
  transit,
  onClose,
  onAdvanceStep,
  onOpenMapsGrounding
}) => {
  const [callAlert, setCallAlert] = useState(false);

  const handleSimulateCall = () => {
    setCallAlert(true);
    setTimeout(() => setCallAlert(false), 3000);
  };

  if (!transit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-[28px] p-5 shadow-2xl flex flex-col gap-3.5 max-h-[92vh] overflow-y-auto border border-gray-100 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffdbca] text-[#9d4300] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold text-[#0b1c30]">Live Route Map {transit.code}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  ETA {transit.etaMinutes}m
                </span>
              </div>
              <p className="text-[11px] text-gray-500">Real-Time Insulated Transit Telemetry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Visual Simulated Route Map Canvas */}
        <div className="relative w-full h-56 rounded-2xl bg-[#eff4ff] overflow-hidden border border-[#dce9ff] flex flex-col items-center justify-center">
          {/* Map Grid Background Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#006b2c_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Road Corridors */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 60 40 Q 140 70 200 110 T 360 170"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 60 40 Q 140 70 200 110 T 360 170"
              fill="none"
              stroke="#006b2c"
              strokeWidth="4"
              strokeDasharray="6 4"
              className="animate-pulse"
            />
          </svg>

          {/* Donor Pin (Grand Banquet Palace) */}
          <div className="absolute top-8 left-12 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#006b2c] text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
              <span className="material-symbols-outlined text-[16px]">restaurant</span>
            </div>
            <span className="text-[9px] font-bold bg-white/95 px-1.5 py-0.5 rounded shadow text-gray-800 mt-1 whitespace-nowrap">
              Grand Banquet
            </span>
          </div>

          {/* Active Courier Moving Pin */}
          <div className="absolute top-24 left-[48%] -translate-x-1/2 flex flex-col items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#fd761a] text-white flex items-center justify-center shadow-xl ring-4 ring-[#fd761a]/30 animate-pulse">
                <span className="material-symbols-outlined text-[20px]">directions_bike</span>
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
            </div>
            <span className="text-[10px] font-extrabold bg-[#0b1c30] text-white px-2 py-0.5 rounded-full shadow mt-1 whitespace-nowrap">
              Rahul K. (2.1 km/h)
            </span>
          </div>

          {/* Recipient Shelter Pin */}
          <div className="absolute bottom-6 right-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#00685f] text-white flex items-center justify-center shadow-lg border-2 border-white">
              <span className="material-symbols-outlined text-[16px]">home</span>
            </div>
            <span className="text-[9px] font-bold bg-white/95 px-1.5 py-0.5 rounded shadow text-gray-800 mt-1 whitespace-nowrap">
              Robin Hood Shelter
            </span>
          </div>

          {/* Map Overlay Controls */}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-xl px-2 py-1 shadow-sm text-[10px] font-bold text-gray-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live GPS Active</span>
          </div>

          <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur rounded-xl px-2.5 py-1 shadow text-[10px] font-semibold text-gray-700 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs text-emerald-600">thermostat</span>
            <span>Insulated Bay: <b className="text-emerald-700">{transit.temperatureReading}</b></span>
          </div>
        </div>

        {/* Courier Contact Card */}
        <div className="p-3 rounded-2xl bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#006b2c] text-white flex items-center justify-center font-bold text-sm">
              RK
            </div>
            <div>
              <div className="text-xs font-bold text-[#0b1c30] flex items-center gap-1">
                {transit.volunteerName}
                <span className="material-symbols-outlined text-xs text-blue-500">verified</span>
              </div>
              <div className="text-[10px] text-gray-500">{transit.volunteerPhone} • 142 Rescues</div>
            </div>
          </div>
          <button
            onClick={handleSimulateCall}
            className="px-3 py-1.5 rounded-full bg-[#006b2c] text-white text-xs font-bold flex items-center gap-1 active:scale-95 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">call</span>
            <span>Contact</span>
          </button>
        </div>

        {callAlert && (
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold text-center animate-in fade-in">
            Calling volunteer courier Rahul K. (+91 97690 12893)...
          </div>
        )}

        {/* Interactive Step Progression Simulator */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-bold text-gray-700">
            <span>5-Step Protocol Tracker</span>
            <span className="text-[#006b2c]">Current: Step {transit.currentStep} of 5</span>
          </div>
          <div className="flex flex-col gap-2">
            {transit.steps.map((step, idx) => {
              const stepNum = idx + 1;
              const isDone = stepNum <= transit.currentStep;
              const isCurrent = stepNum === transit.currentStep;

              return (
                <div
                  key={idx}
                  onClick={() => onAdvanceStep(stepNum)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                      : isDone
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-white border-gray-100 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        isDone
                          ? 'bg-[#006b2c] text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isDone ? '✓' : stepNum}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0b1c30]">
                        {step.title}
                        {isCurrent && <span className="ml-2 text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded">Active</span>}
                      </div>
                      <div className="text-[10px] text-gray-500 leading-tight">{step.description}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{step.timestamp}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Advance Flow Action */}
        <div className="flex flex-col gap-2 pt-1">
          {onOpenMapsGrounding && (
            <button
              onClick={onOpenMapsGrounding}
              className="w-full h-11 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#006b2c] font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-300 shadow-sm active:scale-98 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">explore</span>
              <span>Verify Transit Route with Google Maps (gemini-3.5-flash)</span>
            </button>
          )}

          <button
            onClick={() => onAdvanceStep(Math.min(transit.currentStep + 1, 5))}
            className="w-full h-11 rounded-full bg-[#006b2c] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">fast_forward</span>
            <span>Advance Protocol to Step {Math.min(transit.currentStep + 1, 5)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
