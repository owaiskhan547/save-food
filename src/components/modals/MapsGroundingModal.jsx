import React, { useState } from 'react';

export const MapsGroundingModal = ({
  onClose,
  initialQuery = 'Find community kitchens, shelter homes, and food donors near Mumbai Central'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState(null);
  const [groundingChunks, setGroundingChunks] = useState([]);
  const [error, setError] = useState(null);

  const fetchMapsGrounding = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          lat: 18.9696,
          lng: 72.8193
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Maps Grounding request failed');
      }

      const data = await res.json();
      setResultText(data.text);
      setGroundingChunks(data.groundingChunks || []);
    } catch (err) {
      console.error('[Maps Grounding Modal Error]:', err);
      setError(err.message || 'Failed to fetch Google Maps data');
    } finally {
      setLoading(false);
    }
  };

  const sampleQueries = [
    'Find community food kitchens and shelters near Mumbai Central',
    'Driving route and transit status from Bellasis Road to Byculla East',
    'Banquet halls and caterers in Lower Parel Mumbai',
    'Organic vegetable wholesale markets near Dadar West'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white rounded-[28px] p-5 shadow-2xl flex flex-col gap-3.5 max-h-[92vh] overflow-y-auto border border-gray-100 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#006b2c] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">explore</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-extrabold text-[#0b1c30]">Google Maps Grounding</h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold font-mono">
                  gemini-3.5-flash
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Live geographical verification via Google Maps tool
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search Input */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchMapsGrounding(query)}
                placeholder="Query places, transit routes, or shelters..."
                className="w-full h-11 pl-9 pr-3 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] text-xs font-semibold text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#006b2c]"
              />
            </div>
            <button
              onClick={() => fetchMapsGrounding(query)}
              disabled={loading || !query.trim()}
              className="px-4 h-11 rounded-2xl bg-[#006b2c] hover:bg-[#00873a] text-white text-xs font-bold shadow flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span className="animate-spin material-symbols-outlined text-[18px]">sync</span>
              ) : (
                <span className="material-symbols-outlined text-[18px]">near_me</span>
              )}
              <span>Query</span>
            </button>
          </div>

          {/* Sample quick pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {sampleQueries.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(sq);
                  fetchMapsGrounding(sq);
                }}
                className="shrink-0 px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] font-bold cursor-pointer"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="p-6 rounded-2xl bg-[#eff4ff] flex flex-col items-center justify-center gap-2 text-center text-gray-500 animate-pulse">
            <span className="material-symbols-outlined text-3xl text-[#006b2c] animate-spin">
              explore
            </span>
            <div className="text-xs font-bold text-[#0b1c30]">Retrieving Google Maps Grounded Data...</div>
            <p className="text-[10px] text-gray-500">
              Querying live places, reviews, and coordinate corridors via gemini-3.5-flash with googleMaps tool
            </p>
          </div>
        )}

        {/* Result Content */}
        {!loading && resultText && (
          <div className="flex flex-col gap-3">
            {/* Answer Text */}
            <div className="p-4 rounded-2xl bg-[#eff4ff]/80 border border-[#dce9ff] text-xs text-[#0b1c30] leading-relaxed whitespace-pre-wrap">
              {resultText}
            </div>

            {/* MANDATORY: Google Maps Grounding Links */}
            {groundingChunks && groundingChunks.length > 0 && (
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#0b1c30]">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#006b2c] text-[18px]">
                      pin_drop
                    </span>
                    <span>Verified Google Maps Places &amp; Directions:</span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {groundingChunks.length} locations
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {groundingChunks.map((chunk, idx) => {
                    const place = chunk.maps;
                    const web = chunk.web;
                    const uri = place?.uri || web?.uri;
                    const title = place?.title || web?.title || `Google Maps Location #${idx + 1}`;
                    const reviews = place?.placeAnswerSources?.reviewSnippets;

                    if (!uri) return null;

                    return (
                      <a
                        key={idx}
                        href={uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl bg-white hover:bg-emerald-50/50 border border-gray-200 hover:border-emerald-300 transition-all flex flex-col gap-1.5 group shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-[#006b2c] group-hover:underline flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">place</span>
                            <span>{title}</span>
                          </span>
                          <span className="material-symbols-outlined text-gray-400 group-hover:text-[#006b2c] text-sm">
                            open_in_new
                          </span>
                        </div>

                        {reviews && reviews.length > 0 && (
                          <div className="text-[10px] text-gray-600 bg-gray-50 p-2 rounded-xl border border-gray-100 italic">
                            "{reviews[0].reviewText}"
                          </div>
                        )}

                        <span className="text-[10px] text-gray-400 font-mono truncate">
                          {uri}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Initial empty state */}
        {!loading && !resultText && !error && (
          <div className="p-8 rounded-2xl bg-[#eff4ff] flex flex-col items-center justify-center text-center gap-2 text-gray-500">
            <span className="material-symbols-outlined text-4xl text-[#006b2c]">travel_explore</span>
            <div className="text-xs font-bold text-[#0b1c30]">Live Real-World Rescue Intelligence</div>
            <p className="text-[11px] text-gray-500 max-w-sm">
              Use Gemini 3.5 Flash with the Google Maps tool to ground transit paths, find community pantries, and verify exact donor addresses.
            </p>
            <button
              onClick={() => fetchMapsGrounding(query)}
              className="mt-2 px-4 py-2 rounded-full bg-[#006b2c] text-white text-xs font-bold shadow active:scale-95 cursor-pointer"
            >
              Search Mumbai Central Grid
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>Google Maps Platform Grounding Enabled</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
