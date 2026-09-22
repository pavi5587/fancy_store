"use client";

export interface Filters {
  maxPrice: number;
  colors: string[];
  minRating: number;
}

export default function FilterSidebar({
  allColors,
  filters,
  onChange,
  onClear,
}: {
  allColors: string[];
  filters: Filters;
  onChange: (f: Filters) => void;
  onClear: () => void;
}) {
  function toggleColor(color: string) {
    const next = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onChange({ ...filters, colors: next });
  }

  return (
    <aside className="w-full md:w-56 shrink-0 md:pr-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-xl text-ink">Filters</h3>
        <button onClick={onClear} className="text-xs text-plum-600 underline focus-ring">
          Clear all
        </button>
      </div>

      <div className="mb-7">
        <p className="text-sm font-medium text-ink mb-3">Price, up to {filters.maxPrice}</p>
        <input
          type="range"
          min={100}
          max={1500}
          step={50}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-gold-600"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-xs text-plum-400 mt-1">
          <span>₹100</span>
          <span>₹1500+</span>
        </div>
      </div>

      <div className="mb-7">
        <p className="text-sm font-medium text-ink mb-3">Colour</p>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`text-xs rounded-full px-3 py-1.5 border transition-colors focus-ring ${
                filters.colors.includes(color)
                  ? "bg-ink text-ivory border-ink"
                  : "border-gold-200 text-plum-900 hover:border-gold-500"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-ink mb-3">Minimum rating</p>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...filters, minRating: r })}
              className={`text-xs rounded-full px-3 py-1.5 border transition-colors focus-ring ${
                filters.minRating === r ? "bg-ink text-ivory border-ink" : "border-gold-200 text-plum-900 hover:border-gold-500"
              }`}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
