import Link from "next/link";
import { CATEGORIES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-2xl mb-3">Aikya</div>
          <p className="text-sm text-plum-100/70 leading-relaxed max-w-xs">
            Fine everyday accessories, designed in small batches and finished by hand.
          </p>
        </div>
        <div>
          <div className="text-xs tracking-wideish text-gold-200 mb-4">Shop</div>
          <ul className="space-y-2 text-sm text-plum-100/80">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className="hover:text-gold-200">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-wideish text-gold-200 mb-4">Account</div>
          <ul className="space-y-2 text-sm text-plum-100/80">
            <li><Link href="/account" className="hover:text-gold-200">My account</Link></li>
            <li><Link href="/wishlist" className="hover:text-gold-200">Wishlist</Link></li>
            <li><Link href="/cart" className="hover:text-gold-200">Cart</Link></li>
            <li><Link href="/offers" className="hover:text-gold-200">Offers</Link></li>
            <li><Link href="/account" className="hover:text-gold-200">Track order</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-wideish text-gold-200 mb-4">Support</div>
          <ul className="space-y-2 text-sm text-plum-100/80">
            <li>Mon–Sat, 10am–7pm IST</li>
            <li>hello@aikya.store</li>
            <li>+91 98765 43210</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-plum-600/60 py-5 text-center text-xs text-plum-100/60">
        © 2026 Aikya Fine Accessories. All prices inclusive of taxes.
      </div>
    </footer>
  );
}
