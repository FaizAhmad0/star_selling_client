import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe2,
  Package,
  Sparkles,
  TrendingUp,
} from "lucide-react";

function SellingIllustration() {
  return (
    <div
      className="relative mx-auto w-full max-w-[460px] pb-8 pt-3 sm:px-3"
      aria-hidden="true"
    >
      <div className="absolute inset-x-3 inset-y-0 rounded-[2.5rem] bg-primary/[0.055] sm:inset-x-0 sm:rotate-3" />
      <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
        <div className="absolute -right-16 -top-20 size-80 rounded-full border border-primary/10" />
        <div className="absolute -right-8 -top-12 size-64 rounded-full border border-primary/10" />
        <div className="absolute -bottom-24 -left-20 size-64 rounded-full border border-primary/10" />
      </div>

      <div className="relative mx-4 mt-4 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl shadow-primary/5">
        <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-red-500" />
            <span className="size-2 rounded-full bg-yellow-500" />
            <span className="size-2 rounded-full bg-green-500" />
          </div>
          <span className="hidden text-[9px] font-medium tracking-[0.12em] text-muted-foreground sm:inline">
            THE MAKER&apos;S EDIT
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.12em] text-primary">
                SMALL BEGINNINGS. BIG POSSIBILITIES.
              </p>
              <p className="mt-2 font-heading text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
                Made with care.
                <br />
                Ready for the world.
              </p>
            </div>
            <Sparkles
              className="mt-1 size-5 shrink-0 text-primary/60"
              strokeWidth={1.3}
            />
          </div>

          <div className="mt-4 grid grid-cols-[1.15fr_1fr] gap-3">
            <div className="relative flex h-32 items-end justify-center overflow-hidden rounded-xl bg-primary/10 pb-2 sm:h-36 lg:h-[clamp(6rem,18svh,9rem)]">
              <span className="absolute left-3 top-2 text-[8px] font-semibold uppercase tracking-widest text-primary/70">
                Crafted with care
              </span>
              <svg
                viewBox="0 0 180 180"
                className="h-[82%] w-auto max-w-full text-primary"
                fill="none"
              >
                <ellipse
                  cx="92"
                  cy="163"
                  rx="54"
                  ry="7"
                  fill="currentColor"
                  opacity=".1"
                />
                <path
                  d="M71 31h38v26c0 18 41 36 41 71 0 24-20 34-60 34s-60-10-60-34c0-35 41-53 41-71V31Z"
                  fill="currentColor"
                  opacity=".75"
                />
                <path
                  d="M71 31h38v26c0 18 41 36 41 71 0 24-20 34-60 34V31Z"
                  fill="currentColor"
                  opacity=".35"
                />
                <ellipse cx="90" cy="31" rx="19" ry="6" fill="currentColor" />
                <path
                  d="M51 105c23 9 55 9 79 0M46 124c26 9 60 9 88 0M50 144c24 7 53 7 78 0"
                  stroke="var(--primary-foreground)"
                  strokeOpacity=".3"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="flex h-32 items-end justify-center overflow-hidden rounded-xl bg-muted pb-2 sm:h-36 lg:h-[clamp(6rem,18svh,9rem)]">
              <svg
                viewBox="0 0 160 180"
                className="h-[85%] w-auto max-w-full text-primary"
                fill="none"
              >
                <ellipse
                  cx="80"
                  cy="163"
                  rx="56"
                  ry="7"
                  fill="currentColor"
                  opacity=".08"
                />
                <path
                  d="M27 61h105l10 99H17L27 61Z"
                  fill="var(--background)"
                  stroke="currentColor"
                  strokeOpacity=".14"
                  strokeWidth="2"
                />
                <path
                  d="M54 69V46c0-35 51-35 51 0v23"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="round"
                  opacity=".65"
                />
                <path
                  d="m80 88 6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2 6-13Z"
                  fill="currentColor"
                  opacity=".8"
                />
                <path
                  d="M29 148h100"
                  stroke="currentColor"
                  strokeOpacity=".15"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/70 pt-3">
            <span className="text-[10px] text-muted-foreground">
              From local makers to new markets
            </span>
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 flex items-center gap-2.5 rounded-xl border border-border/80 bg-background p-2.5 shadow-lg shadow-primary/5 sm:px-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Globe2 className="size-4" strokeWidth={1.5} />
        </span>
        <div>
          <p className="text-[11px] font-semibold">Local to global</p>
          <p className="mt-0.5 text-[9px] text-muted-foreground">
            A world of opportunity
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 flex w-fit items-center gap-3 rounded-xl border border-border/80 bg-background px-3 py-2.5 shadow-lg shadow-primary/5 sm:px-4">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <TrendingUp className="size-4" />
        </span>
        <div>
          <p className="text-[11px] font-semibold">Your ambition. In motion.</p>
          <p className="mt-1 text-[9px] text-muted-foreground">
            Discover. Build. Grow.
          </p>
        </div>
        <span className="ml-2 flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="size-3" strokeWidth={3} />
        </span>
      </div>
    </div>
  );
}

const nextSteps = [
  {
    number: "01",
    title: "Discover your products",
    text: "Find inspiration for your next opportunity.",
    href: "/products",
    icon: Package,
  },
  {
    number: "02",
    title: "Understand your margins",
    text: "See the bigger picture behind every sale.",
    href: "/margins",
    icon: TrendingUp,
  },
  {
    number: "03",
    title: "Tell your brand story",
    text: "Make your presence feel like you.",
    href: "/social-media-content",
    icon: Sparkles,
  },
];

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -left-64 top-0 size-[500px] rounded-full bg-primary/[0.025] blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1150px] px-5 pb-6 pt-9 sm:px-8 lg:px-12 lg:py-6">
        <div className="grid items-center gap-10 lg:min-h-[min(520px,calc(100svh-216px))] lg:grid-cols-2 lg:gap-6 pt-12">
          <div className="min-w-0 max-w-xl">
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
              <span className="h-px w-8 bg-primary" aria-hidden="true" /> Rooted
              in craft. Ready for more.
            </div>
            <h1
              id="hero-heading"
              className="mt-5 font-heading text-[clamp(2.5rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.055em]"
            >
              Local craft.
              <br />
              <span className="text-primary">Global possibility.</span>
            </h1>
            <p className="mt-5 max-w-[440px] text-[15px] leading-7 text-muted-foreground sm:text-base">
              Big journeys start with a single idea. Discover products, explore
              your potential, and take your next step with Star Sellingz.
            </p>
            <div className="mt-6 flex flex-col gap-3 min-[380px]:flex-row sm:gap-4">
              <Link
                href="/products"
                className="group inline-flex min-h-12 items-center justify-center gap-5 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Explore Products{" "}
                <ArrowUpRight
                  className="size-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-border bg-background px-6 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Our Story <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-5 flex items-center gap-3 text-xs leading-5 text-muted-foreground">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5">
                <Globe2
                  className="size-4 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              Bridging local artisans to global markets.
            </div>
          </div>
          <SellingIllustration />
        </div>

        <div className="mt-9 grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0 lg:mt-12">
          {nextSteps.map(({ number, title, text, href, icon: Icon }) => (
            <Link
              key={number}
              href={href}
              className="group flex items-start gap-3 py-4 transition-colors hover:bg-primary/[0.025] focus-visible:outline-2 focus-visible:outline-primary md:px-5 md:first:pl-0 md:last:pr-0"
            >
              <span className="mt-0.5 text-[11px] font-medium text-primary/60">
                {number}
              </span>
              <div className="flex-1">
                <h2 className="text-sm font-semibold tracking-tight">
                  {title}
                </h2>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {text}
                </p>
              </div>
              <Icon
                className="mt-0.5 size-5 shrink-0 text-primary/70 transition-colors group-hover:text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
