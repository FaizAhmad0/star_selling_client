import type { Metadata } from "next";
import { PublicSectionPage } from "@/components/public/public-section-page";

export const metadata: Metadata = { title: "Social Media Content | Star Sellingz" };

export default function SocialMediaContentPage() {
  return <PublicSectionPage section="social-media-content" />;
}
