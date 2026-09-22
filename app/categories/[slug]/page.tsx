import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/data";
import CategoryPageClient from "./CategoryPageClient";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategory(params.slug);
  if (!category) return { title: "Category not found" };
  return {
    title: category.name,
    description: `${category.tagline} — shop ${category.name.toLowerCase()} at Aikya.`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  if (!getCategory(params.slug)) return notFound();
  return <CategoryPageClient params={params} />;
}
