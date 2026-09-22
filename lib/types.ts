export type CategorySlug =
  | "earrings"
  | "hair-claws"
  | "hair-bands"
  | "bangles"
  | "neck-chains"
  | "kids-accessories";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  price: number; // in INR
  mrp: number; // in INR, before discount
  images: string[];
  colors: string[];
  material: string;
  description: string;
  details: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  tags: string[]; // e.g. "new", "bestseller"
  stock: number;
}

export interface CartLine {
  productId: string;
  quantity: number;
  color?: string;
}

export interface Coupon {
  code: string;
  description: string;
  type: "percent" | "flat";
  value: number;
  minOrder: number;
}

export interface Address {
  name: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export type OrderStatus = "placed" | "packed" | "shipped" | "out-for-delivery" | "delivered";

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  address: Address;
  eta: string;
}
