import type { Metadata } from "next";
import { PublicSectionPage } from "@/components/public/public-section-page";

export const metadata: Metadata = { title: "Products | Star Sellingz" };

export default function ProductsPage() {
  return <PublicSectionPage section="products" />;
}
