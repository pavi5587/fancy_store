"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartLine } from "@/lib/types";

interface StoreState {
  cart: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  addToCart: (productId: string, color?: string, quantity?: number) => void;
  removeFromCart: (productId: string, color?: string) => void;
  updateQuantity: (productId: string, color: string | undefined, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  recordView: (productId: string) => void;
  cartCount: number;
  clearCart: () => void;
  notify: (message: string) => void;
}

interface Toast {
  id: number;
  message: string;
}

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = "aikya_cart";
const WISHLIST_KEY = "aikya_wishlist";
const RECENT_KEY = "aikya_recent";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  };

  useEffect(() => {
    setCart(readStorage(CART_KEY, []));
    setWishlist(readStorage(WISHLIST_KEY, []));
    setRecentlyViewed(readStorage(RECENT_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed, hydrated]);

  const addToCart: StoreState["addToCart"] = (productId, color, quantity = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId && l.color === color);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { productId, color, quantity }];
    });
    notify("Added to cart");
  };

  const removeFromCart: StoreState["removeFromCart"] = (productId, color) => {
    setCart((prev) => prev.filter((l) => !(l.productId === productId && l.color === color)));
  };

  const updateQuantity: StoreState["updateQuantity"] = (productId, color, quantity) => {
    setCart((prev) =>
      prev
        .map((l) => (l.productId === productId && l.color === color ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0)
    );
  };

  const toggleWishlist: StoreState["toggleWishlist"] = (productId) => {
    setWishlist((prev) => {
      const already = prev.includes(productId);
      notify(already ? "Removed from wishlist" : "Saved to wishlist");
      return already ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const isWishlisted: StoreState["isWishlisted"] = (productId) => wishlist.includes(productId);

  const recordView: StoreState["recordView"] = (productId) => {
    setRecentlyViewed((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 8));
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((sum, l) => sum + l.quantity, 0), [cart]);

  const value: StoreState = {
    cart,
    wishlist,
    recentlyViewed,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    isWishlisted,
    recordView,
    cartCount,
    clearCart,
    notify,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2 pointer-events-none w-[92%] max-w-sm"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-ink text-ivory text-sm rounded-full px-5 py-2.5 shadow-soft animate-toast-in"
          >
            {t.message}
          </div>
        ))}
      </div>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
