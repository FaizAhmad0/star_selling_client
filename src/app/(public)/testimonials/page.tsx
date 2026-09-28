import type { Metadata } from "next";
import { PublicSectionPage } from "@/components/public/public-section-page";

export const metadata: Metadata = { title: "Testimonials | Star Sellingz" };

export default function TestimonialsPage() {
  return <PublicSectionPage section="testimonials" />;
}
