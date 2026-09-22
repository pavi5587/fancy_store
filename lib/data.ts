import { Category, Product, Coupon, Order } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "earrings",
    name: "Earrings",
    tagline: "Studs, hoops & jhumkas",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "hair-claws",
    name: "Hair Claws",
    tagline: "Everyday grip, elevated",
    image:
      "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "hair-bands",
    name: "Hair Bands",
    tagline: "Soft holds & statement bands",
    image:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "bangles",
    name: "Bangles",
    tagline: "Stackable sets & solitaires",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "neck-chains",
    name: "Neck Chains",
    tagline: "Layered, delicate, bold",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "kids-accessories",
    name: "Kids Accessories",
    tagline: "Gentle finishes, playful shapes",
    image:
      "https://images.unsplash.com/photo-1490437657852-8f420a8fef73?q=80&w=800&auto=format&fit=crop",
  },
];

function img(seed: string) {
  return `https://images.unsplash.com/${seed}?q=80&w=1200&auto=format&fit=crop`;
}

export const PRODUCTS: Product[] = [
  {
    id: "er-001",
    name: "Meenakari Peacock Jhumka",
    category: "earrings",
    price: 649,
    mrp: 999,
    images: [
      img("photo-1535632066927-ab7c9ab60908"),
      img("photo-1611591437281-460bfbe1220a"),
    ],
    colors: ["Rose Gold", "Antique Gold"],
    material: "Brass, enamel, glass beads",
    description:
      "A hand-painted meenakari jhumka with a peacock motif, finished with a soft antique glow. Lightweight enough for all-day wear, festive enough for celebrations.",
    details: [
      "Nickel-free, skin-friendly finish",
      "Secure hook-back closure",
      "Weight: 8g per pair",
      "Comes in a branded gift pouch",
    ],
    rating: 4.6,
    reviewCount: 128,
    reviews: [],
    tags: ["bestseller"],
    stock: 24,
  },
  {
    id: "er-002",
    name: "Pearl Drop Studs",
    category: "earrings",
    price: 349,
    mrp: 499,
    images: [img("photo-1599643478518-a784e5dc4c8f"), img("photo-1522338242992-e1a54906a8da")],
    colors: ["Silver", "Gold"],
    material: "Alloy, freshwater pearl",
    description:
      "Minimal drop studs finished with a single freshwater pearl — the kind of earring you reach for every single day.",
    details: ["Push-back closure", "Hypoallergenic pins", "Weight: 3g per pair"],
    rating: 4.4,
    reviewCount: 76,
    reviews: [],
    tags: ["new"],
    stock: 40,
  },
  {
    id: "er-003",
    name: "Kundan Chandbali",
    category: "earrings",
    price: 899,
    mrp: 1399,
    images: [img("photo-1611652022419-a9419f74343d"), img("photo-1535632066927-ab7c9ab60908")],
    colors: ["Gold"],
    material: "Kundan, pearl beads, brass",
    description:
      "A statement chandbali set in kundan stonework with delicate pearl drops — built for weddings and evenings that call for more.",
    details: ["Screw-back for extra security", "Weight: 14g per pair", "Comes boxed"],
    rating: 4.8,
    reviewCount: 54,
    reviews: [],
    tags: ["bestseller"],
    stock: 12,
  },
  {
    id: "hc-001",
    name: "Tortoise Shell Claw Clip",
    category: "hair-claws",
    price: 249,
    mrp: 349,
    images: [img("photo-1620656798579-1984d9e87df7"), img("photo-1522338242992-e1a54906a8da")],
    colors: ["Amber Tortoise", "Black"],
    material: "Cellulose acetate",
    description:
      "A large, strong-grip claw clip in a classic tortoise finish. Holds thick hair without slipping, all day.",
    details: ["Size: 4.5 inch", "Strong-tension spring", "Suitable for thick & curly hair"],
    rating: 4.5,
    reviewCount: 210,
    reviews: [],
    tags: ["bestseller"],
    stock: 60,
  },
  {
    id: "hc-002",
    name: "Pearl-Studded Mini Claw",
    category: "hair-claws",
    price: 199,
    mrp: 299,
    images: [img("photo-1490437657852-8f420a8fef73"), img("photo-1620656798579-1984d9e87df7")],
    colors: ["Ivory", "Blush"],
    material: "Resin, faux pearl",
    description:
      "A dainty claw clip finished with tiny pearls, sized for half-up styles and finer hair.",
    details: ["Size: 2.7 inch", "Lightweight resin build"],
    rating: 4.2,
    reviewCount: 63,
    reviews: [],
    tags: ["new"],
    stock: 35,
  },
  {
    id: "hb-001",
    name: "Satin Knot Headband",
    category: "hair-bands",
    price: 299,
    mrp: 399,
    images: [img("photo-1522338242992-e1a54906a8da"), img("photo-1490437657852-8f420a8fef73")],
    colors: ["Wine", "Emerald", "Ivory"],
    material: "Satin-wrapped alloy",
    description:
      "A padded knot headband in brushed satin — comfortable through a full day of wear, sharp enough for the office.",
    details: ["Adjustable inner grip teeth", "One size fits most"],
    rating: 4.3,
    reviewCount: 45,
    reviews: [],
    tags: [],
    stock: 50,
  },
  {
    id: "hb-002",
    name: "Crystal Edge Hair Band",
    category: "hair-bands",
    price: 449,
    mrp: 699,
    images: [img("photo-1611591437281-460bfbe1220a"), img("photo-1535632066927-ab7c9ab60908")],
    colors: ["Silver"],
    material: "Alloy, crystal stones",
    description: "A slim metal band lined with crystals along the crown, for the days that need a little sparkle.",
    details: ["Rubber grip lining", "Weight: 22g"],
    rating: 4.6,
    reviewCount: 31,
    reviews: [],
    tags: ["new"],
    stock: 18,
  },
  {
    id: "bg-001",
    name: "Layered Gold Bangle Set (Set of 4)",
    category: "bangles",
    price: 799,
    mrp: 1199,
    images: [img("photo-1611591437281-460bfbe1220a"), img("photo-1599643478518-a784e5dc4c8f")],
    colors: ["Gold"],
    material: "Brass, gold plating",
    description:
      "Four textured bangles designed to stack — a mix of hammered, twisted and plain finishes for everyday layering.",
    details: ["Sizes: 2.4, 2.6, 2.8 available", "Tarnish-resistant plating"],
    rating: 4.5,
    reviewCount: 89,
    reviews: [],
    tags: ["bestseller"],
    stock: 28,
  },
  {
    id: "bg-002",
    name: "Kada Bangle, Single",
    category: "bangles",
    price: 599,
    mrp: 899,
    images: [img("photo-1611652022419-a9419f74343d"), img("photo-1611591437281-460bfbe1220a")],
    colors: ["Silver", "Antique Gold"],
    material: "Brass",
    description: "A single solid kada with a carved floral border, worn alone or stacked with slimmer pieces.",
    details: ["Adjustable opening", "Weight: 32g"],
    rating: 4.4,
    reviewCount: 22,
    reviews: [],
    tags: [],
    stock: 20,
  },
  {
    id: "nc-001",
    name: "Layered Coin Necklace",
    category: "neck-chains",
    price: 549,
    mrp: 849,
    images: [img("photo-1599643478518-a784e5dc4c8f"), img("photo-1535632066927-ab7c9ab60908")],
    colors: ["Gold"],
    material: "Brass, gold plating",
    description: "Two fine chains layered with a coin pendant — designed to sit close to the collarbone.",
    details: ["Chain length: 16in + 18in", "Lobster clasp closure"],
    rating: 4.7,
    reviewCount: 102,
    reviews: [],
    tags: ["bestseller"],
    stock: 33,
  },
  {
    id: "nc-002",
    name: "Delicate Chain with Solitaire",
    category: "neck-chains",
    price: 399,
    mrp: 599,
    images: [img("photo-1611652022419-a9419f74343d"), img("photo-1522338242992-e1a54906a8da")],
    colors: ["Silver", "Gold"],
    material: "Alloy, cubic zirconia",
    description: "A single cubic zirconia stone on the finest chain we make — for wearing every single day.",
    details: ["Chain length: 18in, adjustable", "Tarnish-resistant"],
    rating: 4.5,
    reviewCount: 58,
    reviews: [],
    tags: ["new"],
    stock: 45,
  },
  {
    id: "ka-001",
    name: "Bow Clip Set for Kids (Pack of 6)",
    category: "kids-accessories",
    price: 199,
    mrp: 299,
    images: [img("photo-1490437657852-8f420a8fef73"), img("photo-1620656798579-1984d9e87df7")],
    colors: ["Multicolour"],
    material: "Grosgrain ribbon, alloy clip",
    description: "Soft bow clips in six colourways, sized and padded for little heads.",
    details: ["Rounded, snag-free clip base", "Pack of 6"],
    rating: 4.3,
    reviewCount: 74,
    reviews: [],
    tags: [],
    stock: 70,
  },
  {
    id: "ka-002",
    name: "Tiny Stud Earrings for Kids",
    category: "kids-accessories",
    price: 149,
    mrp: 249,
    images: [img("photo-1535632066927-ab7c9ab60908"), img("photo-1599643478518-a784e5dc4c8f")],
    colors: ["Pink", "Yellow", "White"],
    material: "Surgical steel",
    description: "Featherlight studs in surgical steel, shaped for small, sensitive ears.",
    details: ["Surgical steel pins", "Screw-back safety closure"],
    rating: 4.6,
    reviewCount: 41,
    reviews: [],
    tags: ["new"],
    stock: 55,
  },
];

// Seed a few reviews for popular products
PRODUCTS.find((p) => p.id === "er-001")!.reviews = [
  {
    id: "r1",
    author: "Ananya R.",
    rating: 5,
    date: "2026-08-02",
    title: "Beautiful colours in person",
    body: "The enamel work looks even better than the photos. Light enough to wear the whole day at a wedding.",
    verified: true,
  },
  {
    id: "r2",
    author: "Priya M.",
    rating: 4,
    date: "2026-07-18",
    title: "Lovely, slightly heavier than expected",
    body: "Gorgeous design and the packaging felt premium. A touch heavier than I expected but still comfortable.",
    verified: true,
  },
  {
    id: "r3",
    author: "Sneha K.",
    rating: 5,
    date: "2026-06-30",
    title: "Got so many compliments",
    body: "Wore this to a friend's sangeet and got asked about it all night. Colour hasn't faded after two wears.",
    verified: false,
  },
];

PRODUCTS.find((p) => p.id === "hc-001")!.reviews = [
  {
    id: "r4",
    author: "Divya S.",
    rating: 5,
    date: "2026-08-10",
    title: "Finally a claw clip that holds",
    body: "I have very thick hair and this is the first clip that doesn't slide out by noon.",
    verified: true,
  },
  {
    id: "r5",
    author: "Meera T.",
    rating: 4,
    date: "2026-07-02",
    title: "Great everyday clip",
    body: "Sturdy and the tortoise pattern looks more expensive than the price suggests.",
    verified: true,
  },
];

export const COUPONS: Coupon[] = [
  { code: "WELCOME10", description: "10% off on your first order", type: "percent", value: 10, minOrder: 499 },
  { code: "FLAT100", description: "Flat ₹100 off on orders above ₹999", type: "flat", value: 100, minOrder: 999 },
  { code: "FESTIVE20", description: "20% off storewide this festive season", type: "percent", value: 20, minOrder: 1499 },
];

export const OFFERS = [
  { title: "Buy 2, Get 1 Free", subtitle: "On all earrings", href: "/categories/earrings" },
  { title: "Flat 20% Off", subtitle: "Festive edit, this week only", href: "/categories/bangles" },
  { title: "Free shipping", subtitle: "On orders above ₹599", href: "/" },
];

export const SAMPLE_ORDERS: Order[] = [
  {
    id: "AKY10234",
    date: "2026-09-05",
    items: [
      { productId: "er-001", name: "Meenakari Peacock Jhumka", image: PRODUCTS[0].images[0], quantity: 1, price: 649 },
      { productId: "bg-001", name: "Layered Gold Bangle Set (Set of 4)", image: PRODUCTS[7].images[0], quantity: 1, price: 799 },
    ],
    total: 1448,
    status: "shipped",
    address: { name: "Ananya R.", line1: "12, Lotus Apartments, 4th Cross", city: "Madurai", state: "Tamil Nadu", pincode: "625001", phone: "9876543210" },
    eta: "16 Sep 2026",
  },
  {
    id: "AKY10198",
    date: "2026-08-22",
    items: [
      { productId: "nc-001", name: "Layered Coin Necklace", image: PRODUCTS[9].images[0], quantity: 1, price: 549 },
    ],
    total: 549,
    status: "delivered",
    address: { name: "Ananya R.", line1: "12, Lotus Apartments, 4th Cross", city: "Madurai", state: "Tamil Nadu", pincode: "625001", phone: "9876543210" },
    eta: "26 Aug 2026",
  },
];

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(slug: string) {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4) {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
