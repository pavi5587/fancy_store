import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ products, title = "You may also like" }: { products: Product[]; title?: string }) {
  if (products.length === 0) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
      <h2 className="font-display text-2xl md:text-3xl text-ink mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
