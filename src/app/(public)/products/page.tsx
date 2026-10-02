import { Suspense } from "react";
import { ProductsCatalog } from "@/components/public/products-catalog";

export const metadata = {
  title: "Products | Star Sellingz",
  description: "Explore products by category, color, and size.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={<div className="p-12 text-center">Loading catalog…</div>}
    >
      <ProductsCatalog />
    </Suspense>
  );
}
