import type { Metadata } from "next";
import { PublicSectionPage } from "@/components/public/public-section-page";

export const metadata: Metadata = { title: "Margins | Star Sellingz" };

export default function MarginsPage() {
  return <PublicSectionPage section="margins" />;
}
