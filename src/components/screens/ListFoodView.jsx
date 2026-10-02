import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export const ListFoodView = ({ onAddBatch, onDone }) => {
  const [category, setCategory] = useState('cooked');
  const [donorName, setDonorName] = useState('Spice Symphony Catering');
  const [title, setTitle] = useState('50 Hot Paneer & Biryani Boxes');
  const [description, setDescription] = useState('Freshly prepared event surplus, vacuum-packed in food-grade thermal containers. Ready for immediate pickup.');
  const [quantity, setQuantity] = useState('50 Boxes (Serves ~50-60)');
  const [expiryHours, setExpiryHours] = useState(2);
  const [holdingTemp, setHoldingTemp] = useState('Hot Insulated (>65°C)');
  const [selectedTags, setSelectedTags] = useState(['FSSAI Certified', 'Pure Vegetarian']);
  const [donorAddress, setDonorAddress] = useState('Lower Parel Commercial Complex, Gate 2, Mumbai');
  const [fssaiAgreed, setFssaiAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTags = ['Pure Vegetarian', 'Halal + Veg', 'FSSAI Certified', 'Jain Options', 'Freshly Baked', 'Organic Harvest'];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fssaiAgreed) return;

    setIsSubmitting(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });

    const newBatch = {
      id: `batch-${Date.now()}`,
      donorName,
      donorType: category === 'cooked' ? 'Event Caterer' : category === 'bakery' ? 'Artisan Bakery' : 'Farm Cooperative',
      locationArea: 'Lower Parel',
      distanceKm: 1.5,
      distanceLabel: 'Lower Parel (1.5 km)',
      title,
      description,
      quantityLabel: quantity,
      urgencyScore: 95,
      isCritical: expiryHours <= 2,
      expirySecondsRemaining: expiryHours * 3600,
      category,
      tags: selectedTags,
      status: 'available',
      verified: true,
      iconName: category === 'cooked' ? 'soup_kitchen' : category === 'bakery' ? 'bakery_dining' : 'eco',
      iconBgColor: category === 'cooked' ? 'bg-[#dce9ff]' : category === 'bakery' ? 'bg-[#ffdbca]' : 'bg-[#89f5e7]',
      iconTextColor: category === 'cooked' ? 'text-[#006b2c]' : category === 'bakery' ? 'text-[#9d4300]' : 'text-[#00685f]',
      pickupWindow: `⏳ 0${expiryHours}:00:00 left`,
      donorPhone: '+91 98200 88771',
      donorAddress,
      temperatureHolding: holdingTemp
    };

    setTimeout(() => {
      onAddBatch(newBatch);
      setIsSubmitting(false);
      onDone();
    }, 700);
  };

  return (
    <div className="flex flex-col gap-4 pb-24">
      {/* Header card */}
      <div className="p-4 rounded-[26px] bg-gradient-to-r from-[#006b2c] to-[#00873a] text-white shadow-lg flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-85">Provider Portal</span>
          <h2 className="text-lg font-extrabold">List Surplus Food in 60s</h2>
          <p className="text-xs opacity-90">Auto-routes to verified shelters and couriers</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px]">post_add</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="clay-card p-4 sm:p-5 flex flex-col gap-4 border border-white/60">
        {/* Category Picker */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#0b1c30]">Food Category</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'cooked', label: 'Cooked Hot', icon: 'soup_kitchen' },
              { id: 'bakery', label: 'Bakery', icon: 'bakery_dining' },
              { id: 'produce', label: 'Farm Produce', icon: 'eco' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`p-2.5 rounded-2xl flex flex-col items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                  category === cat.id
                    ? 'bg-[#006b2c] text-white shadow-md scale-[1.02]'
                    : 'bg-[#eff4ff] text-[#3e4a3d] hover:bg-[#e5eeff]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Donor / Kitchen Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-[#0b1c30]">Donor / Facility Name</label>
          <input
            type="text"
            required
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-xs font-semibold text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#006b2c]"
            placeholder="e.g. Royal Banquet Hall, Grand Catering"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-[#0b1c30]">Batch Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-xs font-semibold text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#006b2c]"
            placeholder="e.g. 45 Hot Thali Meals"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-[#0b1c30]">Contents &amp; Packaging Notes</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-xs font-medium text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#006b2c]"
            placeholder="Specify items, thermal vats, packaging type..."
          />
        </div>

        {/* Quantity & Temperature */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#0b1c30]">Portions / Volume</label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-xs font-semibold text-[#0b1c30]"
              placeholder="e.g. 50 Plates / 30 kg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#0b1c30]">Holding Condition</label>
            <select
              value={holdingTemp}
              onChange={(e) => setHoldingTemp(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-xs font-semibold text-[#0b1c30]"
            >
              <option>Hot Insulated (&gt;65°C)</option>
              <option>Chilled Cold Chain (&lt;5°C)</option>
              <option>Ambient Dry Packaging</option>
            </select>
          </div>
        </div>

        {/* Expiry Window Slider */}
        <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#eff4ff]/80">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#0b1c30] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">timer</span>
              Auto-Expiry Window:
            </span>
            <span className="font-extrabold text-[#ba1a1a] font-mono">
              {expiryHours} Hours
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={6}
            step={1}
            value={expiryHours}
            onChange={(e) => setExpiryHours(Number(e.target.value))}
            className="w-full accent-[#ba1a1a] cursor-pointer"
          />
          <span className="text-[10px] text-gray-500">
            Batches expiring in &lt;2 hours receive Critical Expiry priority on the volunteer mesh grid.
          </span>
        </div>

        {/* Dietary / Quality Tags */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#0b1c30]">Certifications &amp; Dietary Tags</label>
          <div className="flex flex-wrap gap-1.5">
            {availableTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#006b2c] text-white shadow-sm'
                      : 'bg-[#eff4ff] text-[#3e4a3d] hover:bg-[#dce9ff]'
                  }`}
                >
                  {active && '✓ '}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pickup Address */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-[#0b1c30]">Pickup Bay / Loading Address</label>
          <input
            type="text"
            required
            value={donorAddress}
            onChange={(e) => setDonorAddress(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] text-xs font-semibold text-[#0b1c30]"
            placeholder="Loading bay, gate number, landmark"
          />
        </div>

        {/* FSSAI Declaration Checkbox */}
        <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 cursor-pointer">
          <input
            type="checkbox"
            checked={fssaiAgreed}
            onChange={(e) => setFssaiAgreed(e.target.checked)}
            className="w-5 h-5 accent-[#006b2c] rounded mt-0.5"
          />
          <span className="text-[11px] text-emerald-950 font-medium leading-snug">
            I certify that this food surplus has been handled according to FSSAI hygiene standards, stored within safe thermal zones, and is fit for immediate consumption.
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!fssaiAgreed || isSubmitting}
          className="w-full h-13 rounded-full bg-[#006b2c] hover:bg-[#00873a] text-white font-extrabold text-sm shadow-[0_8px_18px_-3px_rgba(0,107,44,0.38)] flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <span>Publishing to Rescue Grid...</span>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">send</span>
              <span>Publish Batch to Rescue Grid</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
