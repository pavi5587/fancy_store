import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, PRODUCTS, OFFERS } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import RecentlyViewed from "@/components/RecentlyViewed";
import HeroBanner, { BannerSlide } from "@/components/HeroBanner";

const TRUST_BADGES = [
  { label: "Free shipping ₹599+", icon: "🚚" },
  { label: "7-day easy returns", icon: "↩️" },
  { label: "Cash on delivery", icon: "💵" },
  { label: "Rated 4.7★ by 12k+ customers", icon: "⭐" },
];

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: "kundan-edit",
    eyebrow: "New this week — the Kundan edit",
    title: "Small details,\nworn every day.",
    description:
      "Earrings, hair claws, bangles and chains designed for the mornings you're rushing and the evenings you're not. Handled with care, priced for often.",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop",
    ctaLabel: "Shop Earrings",
    ctaHref: "/categories/earrings",
    secondaryLabel: "Explore all",
    secondaryHref: "/search",
  },
  {
    id: "festive-bangles",
    eyebrow: "Festive season",
    title: "Stack it up,\nstack it bold.",
    description:
      "Bangles and bracelets built to layer — mix finishes, mix textures, and find the combination that's unmistakably yours.",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
    ctaLabel: "Shop Bangles",
    ctaHref: "/categories/bangles",
    secondaryLabel: "View offers",
    secondaryHref: "/offers",
  },
  {
    id: "everyday-chains",
    eyebrow: "Bestseller",
    title: "Chains that go\nwith everything.",
    description:
      "Delicate neck chains that move from desk to dinner without a second thought. Nickel-free and finished to last.",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
    ctaLabel: "Shop Chains",
    ctaHref: "/categories/neck-chains",
    secondaryLabel: "Explore all",
    secondaryHref: "/search",
  },
];

export default function HomePage() {
  const bestsellers = PRODUCTS.filter((p) => p.tags.includes("bestseller")).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.tags.includes("new")).slice(0, 4);

  return (
    <div>
      {/* Hero banner (auto-scrolling carousel) */}
      <HeroBanner slides={BANNER_SLIDES} />

      {/* Trust badges */}
      <section className="bg-plum-900 border-t border-ivory/10">
        <ul className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-plum-100/70">
          {TRUST_BADGES.map((b) => (
            <li key={b.label} className="flex items-center gap-1.5">
              <span aria-hidden="true">{b.icon}</span>
              <span>{b.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Offer strip */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 md:-mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {OFFERS.map((o) => (
            <Link
              key={o.title}
              href={o.href}
              className="bg-ivory border border-gold-200 rounded-xl px-5 py-4 shadow-soft hover:border-gold-500 transition-colors"
            >
              <p className="font-display text-xl text-ink">{o.title}</p>
              <p className="text-xs text-plum-400 mt-1">{o.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl text-ink">Shop by category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="group">
              <div className="relative aspect-square rounded-full overflow-hidden mb-3 border border-gold-200 bg-blush/40">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="text-center text-sm font-medium text-ink">{c.name}</p>
              <p className="text-center text-[11px] text-plum-400">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="divider-hairline" />
      </div>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl text-ink">Bestsellers</h2>
          <Link href="/search?q=bestseller" className="text-sm text-plum-600 hover:text-gold-600">
            View all
          </Link>
        </div>
        <ProductGrid products={bestsellers} />
      </section>

      {/* New arrivals */}
      <section className="bg-blush/50 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-8">New arrivals</h2>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      <RecentlyViewed />
    </div>
  );
}