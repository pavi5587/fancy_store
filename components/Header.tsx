"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "@/lib/data";
import { useStore } from "@/context/StoreContext";

export default function Header() {
  const router = useRouter();
  const { cartCount, wishlist } = useStore();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur border-b border-gold-200">
      {/* <div className="hidden md:block bg-ink text-ivory text-center text-xs tracking-wideish py-2">
        Free shipping on orders above ₹599 &nbsp;·&nbsp; Use FESTIVE20 for 20% off
      </div> */}

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <button
            className="md:hidden focus-ring rounded p-1"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="#52125F" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <Link href="/" className="font-display text-3xl tracking-wide text-ink shrink-0">
            Aikya
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm text-plum-900">
            {CATEGORIES.slice(0, 5).map((c) => (
              <Link key={c.slug} href={`/categories/${c.slug}`} className="hover:text-gold-600 transition-colors focus-ring rounded">
                {c.name}
              </Link>
            ))}
            <Link href="/categories/kids-accessories" className="hover:text-gold-600 transition-colors focus-ring rounded">
              Kids
            </Link>
            <Link href="/offers" className="text-gold-600 hover:text-gold-700 transition-colors focus-ring rounded">
              Offers
            </Link>
          </nav>

          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs">
            <div className="relative w-full">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                placeholder="Search earrings, bangles..."
                className="w-full bg-white border border-gold-200 rounded-full py-2 pl-4 pr-9 text-sm focus-ring"
                aria-label="Search products"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#96602F" strokeWidth="1.6" />
                  <path d="M21 21l-4-4" stroke="#96602F" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4 shrink-0">
            <Link href="/search" className="md:hidden focus-ring rounded" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#52125F" strokeWidth="1.6" />
                <path d="M21 21l-4-4" stroke="#52125F" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Link>
            <Link href="/wishlist" className="relative focus-ring rounded" aria-label="Wishlist">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 20s-7-4.35-9.5-8.5C.8 8.1 2.4 5 5.6 5c1.9 0 3.3 1 4.4 2.5C11.1 6 12.5 5 14.4 5c3.2 0 4.8 3.1 3.1 6.5C19 15.65 12 20 12 20z"
                  stroke="#52125F"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-ivory text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/account" className="hidden sm:inline-flex focus-ring rounded" aria-label="Account">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="3.5" stroke="#52125F" strokeWidth="1.5" />
                <path d="M4.5 20c1.5-3.5 5-5 7.5-5s6 1.5 7.5 5" stroke="#52125F" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
            <Link href="/cart" className="relative focus-ring rounded" aria-label="Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6 8h12l-1.2 10.2a2 2 0 01-2 1.8H9.2a2 2 0 01-2-1.8L6 8z" stroke="#52125F" strokeWidth="1.5" />
                <path d="M9 8V6a3 3 0 016 0v2" stroke="#52125F" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-plum-600 text-ivory text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gold-200 bg-ivory px-4 py-3">
          <form onSubmit={handleSearch} className="mb-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search products..."
              className="w-full bg-white border border-gold-200 rounded-full py-2 px-4 text-sm focus-ring"
            />
          </form>
          <nav className="flex flex-col gap-3 text-sm">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/categories/${c.slug}`} onClick={() => setMenuOpen(false)} className="py-1">
                {c.name}
              </Link>
            ))}
            <Link href="/offers" onClick={() => setMenuOpen(false)} className="py-1 text-gold-600">
              Offers
            </Link>
            <Link href="/account" onClick={() => setMenuOpen(false)} className="py-1">
              My Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
