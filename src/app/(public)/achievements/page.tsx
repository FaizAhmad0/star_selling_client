import type { Metadata } from "next";
import { PublicSectionPage } from "@/components/public/public-section-page";

export const metadata: Metadata = { title: "Achievements | Star Sellingz" };

export default function AchievementsPage() {
  return <PublicSectionPage section="achievements" />;
}
