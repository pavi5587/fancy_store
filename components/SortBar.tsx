"use client";

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Customer rating" },
];

export default function SortBar({
  value,
  onChange,
  count,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
  count: number;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-sm text-plum-400">{count} products</p>
      <label className="text-sm flex items-center gap-2">
        <span className="text-plum-400 hidden sm:inline">Sort by</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="border border-gold-200 rounded-full px-3 py-1.5 text-sm bg-white focus-ring"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
