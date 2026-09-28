import Link from "next/link";
import { ArrowLeft, ArrowUpRight, type LucideIcon, MessageSquareQuote, Package, Sparkles, TrendingUp, Trophy } from "lucide-react";

const sections = {
  products: {
    label: "Products",
    title: "Great journeys start with great products.",
    description: "Discover the collection and find inspiration for your next selling opportunity.",
    emptyTitle: "A new collection is on its way",
    emptyDescription: "Product listings will be available here soon. In the meantime, get to know the story behind Star Sellingz.",
    icon: Package,
  },
  margins: {
    label: "Margins",
    title: "See the potential behind every product.",
    description: "A clearer view of pricing, costs, and the details that matter to your selling journey.",
    emptyTitle: "Margin details are coming soon",
    emptyDescription: "Product pricing and margin information will appear here when the collection is available.",
    icon: TrendingUp,
  },
  achievements: {
    label: "Achievements",
    title: "Every step forward has a story.",
    description: "A place to celebrate the milestones and people behind the Star Sellingz journey.",
    emptyTitle: "Our milestones will be shared here",
    emptyDescription: "Check back for updates, highlights, and achievements from our community.",
    icon: Trophy,
  },
  testimonials: {
    label: "Testimonials",
    title: "Real people. Their own words.",
    description: "Meet the voices behind the journey, through experiences shared by our community.",
    emptyTitle: "Community stories are coming soon",
    emptyDescription: "This space is reserved for testimonials from Star Sellingz customers and partners.",
    icon: MessageSquareQuote,
  },
  "social-media-content": {
    label: "Social Media Content",
    title: "Give your brand a voice of its own.",
    description: "A space for fresh ideas, product stories, and content that brings your presence to life.",
    emptyTitle: "Fresh content is on its way",
    emptyDescription: "Explore posts and creative resources here as they become available.",
    icon: Sparkles,
  },
} satisfies Record<string, { label: string; title: string; description: string; emptyTitle: string; emptyDescription: string; icon: LucideIcon }>;

export type PublicSection = keyof typeof sections;

export function PublicSectionPage({ section }: { section: PublicSection }) {
  const { label, title, description, emptyTitle, emptyDescription, icon: Icon } = sections[section];

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-20">
      <Link href="/" className="inline-flex min-h-10 items-center gap-2 text-sm text-muted-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><ArrowLeft className="size-4" aria-hidden="true" /> Back to Home</Link>
      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{label}</p>
      <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{description}</p>
      <div className="mt-12 rounded-2xl border border-border bg-primary/[0.025] px-6 py-12 text-center sm:mt-16 sm:py-16">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-primary/10 bg-background text-primary"><Icon className="size-6" strokeWidth={1.5} aria-hidden="true" /></span>
        <h2 className="mt-6 font-heading text-xl font-semibold tracking-tight">{emptyTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">{emptyDescription}</p>
        <Link href="/about" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Get to know us <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
