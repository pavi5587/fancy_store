# Aikya — Fine Accessories Storefront

A full customer-facing frontend for a jewellery/accessories store, built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## What's included

- Home page (hero, categories, offers, bestsellers, new arrivals, recently viewed)
- Categories: Earrings, Hair Claws, Hair Bands, Bangles, Neck Chains, Kids Accessories
- Product listing per category with **filters** (price, colour, rating) and **sorting**
- Product detail page (gallery, colour/quantity selection, related products, reviews)
- Search page
- Wishlist (persisted to `localStorage`)
- Cart (persisted to `localStorage`) with quantity controls
- Coupons (`WELCOME10`, `FLAT100`, `FESTIVE20` — see `lib/data.ts`)
- Checkout with address form + **Razorpay** payment button (test mode) and Cash on Delivery
- Order tracking page with a status timeline
- Customer account page (orders, profile, addresses)
- Recently viewed products
- Related products
- Reviews & ratings (with a "write a review" form, UI-only)
- Floating WhatsApp support button

All product/catalog data is mocked in `lib/data.ts` — swap this for real API calls when you connect a backend.

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Your Razorpay **Key ID** (test or live). Get it from the Razorpay dashboard → Settings → API Keys. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (with country code, no `+` or spaces) used by the "Chat with us" button and order-support link. |

## Connecting real Razorpay payments

The checkout page currently opens Razorpay's Checkout.js with a **client-only** flow (amount-only, no server order). This is fine for testing, but for production you should:

1. Create a Razorpay **Order** server-side (`POST /orders`) using your **Key Secret** — never expose the secret in frontend code.
2. Pass the returned `order_id` into the `options` object in `components/RazorpayCheckoutButton.tsx` (see the comment in that file).
3. Verify the payment signature server-side after `handler` fires, before marking the order as paid.

## Structure

```
app/                     Route segments (App Router)
  page.tsx               Home
  categories/[slug]/     Category listing (filters + sort)
  products/[id]/         Product detail
  search/                Search
  wishlist/               Wishlist
  cart/                  Cart
  checkout/              Checkout + Razorpay
  orders/[id]/           Order tracking
  account/               Customer account
components/              Reusable UI (header, footer, cards, filters, reviews, etc.)
context/StoreContext.tsx Cart/wishlist/recently-viewed state (localStorage-backed)
lib/data.ts              Mock catalog, categories, coupons, sample orders
lib/types.ts             Shared TypeScript types
lib/format.ts            Currency/discount formatting helpers
```

## Notes

- Product images are pulled from Unsplash for placeholder purposes — replace with your own product photography before launch.
- Cart/wishlist state lives in the browser (`localStorage`) since there's no backend wired up yet. Swap `context/StoreContext.tsx` for API calls once you have auth + a database.
- The design uses a plum/rose-gold/ivory palette with Cormorant Garamond (display) and Manrope (body) — defined as CSS variables in `app/globals.css` and Tailwind tokens in `tailwind.config.js`.
