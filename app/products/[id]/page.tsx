import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const product = getProductById(params.id);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  if (!getProductById(params.id)) return notFound();
  return <ProductDetailClient params={params} />;
}
