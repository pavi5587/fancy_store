"use client";

import { useState } from "react";
import { COUPONS } from "@/lib/data";
import { Coupon } from "@/lib/types";
import { formatINR } from "@/lib/format";
import { useStore } from "@/context/StoreContext";

export default function CouponInput({
  subtotal,
  applied,
  onApply,
  onRemove,
}: {
  subtotal: number;
  applied: Coupon | null;
  onApply: (c: Coupon) => void;
  onRemove: () => void;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { notify } = useStore();

  function handleApply(e: React.FormEvent) {
    e.preventDefault();
    const match = COUPONS.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
    if (!match) {
      setError("That code doesn't look right. Check and try again.");
      return;
    }
    if (subtotal < match.minOrder) {
      setError(`Add ${formatINR(match.minOrder - subtotal)} more to use this code.`);
      return;
    }
    setError("");
    onApply(match);
    notify(`${match.code} applied`);
  }

  return (
    <div className="border border-gold-200 rounded-lg p-4">
      <p className="text-sm font-medium text-ink mb-2">Have a coupon?</p>
      {applied ? (
        <div className="flex items-center justify-between bg-blush rounded-lg px-3 py-2">
          <div>
            <p className="text-sm font-medium text-ink">{applied.code}</p>
            <p className="text-xs text-plum-400">{applied.description}</p>
          </div>
          <button onClick={onRemove} className="text-xs text-plum-600 underline focus-ring">
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter code"
            className="flex-1 border border-gold-200 rounded-full px-4 py-2 text-sm focus-ring"
          />
          <button type="submit" className="text-sm border border-ink rounded-full px-4 py-2 hover:bg-ink hover:text-ivory transition-colors focus-ring">
            Apply
          </button>
        </form>
      )}
      {error && <p className="mt-2 text-xs text-plum-600">{error}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {COUPONS.map((c) => (
          <button
            key={c.code}
            onClick={() => {
              setCode(c.code);
              setError("");
              if (subtotal >= c.minOrder) {
                onApply(c);
                notify(`${c.code} applied`);
              } else setError(`Add ${formatINR(c.minOrder - subtotal)} more to use this code.`);
            }}
            className="text-[11px] border border-gold-400 text-gold-600 rounded-full px-3 py-1 hover:bg-gold-200/50 focus-ring"
          >
            {c.code}
          </button>
        ))}
      </div>
    </div>
  );
}
