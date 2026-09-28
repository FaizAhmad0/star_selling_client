import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Globe2, Package, Sparkles, TrendingUp } from "lucide-react";

function SellingIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[570px] pb-7 pt-8 sm:px-5 lg:pt-4" aria-hidden="true">
      <div className="absolute inset-x-3 inset-y-0 rounded-[2.5rem] bg-primary/[0.055] sm:inset-x-0 sm:rotate-3" />
      <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
        <div className="absolute -right-16 -top-20 size-80 rounded-full border border-primary/10" />
        <div className="absolute -right-8 -top-12 size-64 rounded-full border border-primary/10" />
        <div className="absolute -bottom-24 -left-20 size-64 rounded-full border border-primary/10" />
      </div>

      <div className="relative mx-4 mt-7 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl shadow-primary/5 sm:mx-5 sm:mt-10">
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
          <div className="flex gap-1.5"><span className="size-2 rounded-full bg-primary/60" /><span className="size-2 rounded-full bg-primary/30" /><span className="size-2 rounded-full bg-primary/15" /></div>
          <span className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground">YOUR NEXT BIG CHAPTER</span>
          <Globe2 className="size-4 text-primary" />
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-primary">SMALL BEGINNINGS. BIG POSSIBILITIES.</p>
              <p className="mt-3 font-heading text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">Made with care.<br />Ready for the world.</p>
            </div>
            <Sparkles className="mt-1 size-7 shrink-0 text-primary/60" strokeWidth={1.3} />
          </div>

          <div className="mt-6 grid grid-cols-[1.15fr_1fr] gap-3">
            <div className="relative flex h-44 items-end justify-center overflow-hidden rounded-xl bg-primary/10 pb-4 sm:h-52">
              <span className="absolute left-3 top-3 text-[9px] font-semibold uppercase tracking-widest text-primary/70">Crafted to stand out</span>
              <svg viewBox="0 0 180 180" className="h-36 w-36 text-primary sm:h-40 sm:w-40" fill="none">
                <ellipse cx="92" cy="163" rx="54" ry="7" fill="currentColor" opacity=".1" />
                <path d="M71 31h38v26c0 18 41 36 41 71 0 24-20 34-60 34s-60-10-60-34c0-35 41-53 41-71V31Z" fill="currentColor" opacity=".75" />
                <path d="M71 31h38v26c0 18 41 36 41 71 0 24-20 34-60 34V31Z" fill="currentColor" opacity=".35" />
                <ellipse cx="90" cy="31" rx="19" ry="6" fill="currentColor" />
                <path d="M51 105c23 9 55 9 79 0M46 124c26 9 60 9 88 0M50 144c24 7 53 7 78 0" stroke="var(--primary-foreground)" strokeOpacity=".3" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex h-44 items-end justify-center overflow-hidden rounded-xl bg-muted pb-3 sm:h-52">
              <svg viewBox="0 0 160 180" className="h-36 w-32 text-primary sm:h-40 sm:w-36" fill="none">
                <ellipse cx="80" cy="163" rx="56" ry="7" fill="currentColor" opacity=".08" />
                <path d="M27 61h105l10 99H17L27 61Z" fill="var(--background)" stroke="currentColor" strokeOpacity=".14" strokeWidth="2" />
                <path d="M54 69V46c0-35 51-35 51 0v23" stroke="currentColor" strokeWidth="9" strokeLinecap="round" opacity=".65" />
                <path d="m80 88 6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2 6-13Z" fill="currentColor" opacity=".8" />
                <path d="M29 148h100" stroke="currentColor" strokeOpacity=".15" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
            <span className="text-xs text-muted-foreground">From local makers to new markets</span>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><ArrowUpRight className="size-4" /></span>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-2 flex items-center gap-3 rounded-xl border border-border/80 bg-background p-3 shadow-lg shadow-primary/5 sm:right-0 sm:top-5 sm:px-4">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"><Globe2 className="size-5" strokeWidth={1.5} /></span>
        <div><p className="text-xs font-semibold">Local to global</p><p className="mt-0.5 text-[10px] text-muted-foreground">A world of opportunity</p></div>
      </div>
      <div className="relative -mt-2 ml-0 flex w-fit items-center gap-3 rounded-xl border border-border/80 bg-background px-4 py-3 shadow-lg shadow-primary/5 sm:absolute sm:-bottom-1 sm:left-0 sm:mt-0 sm:px-5 sm:py-4">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><TrendingUp className="size-5" /></span>
        <div><p className="text-xs font-semibold">Your ambition. In motion.</p><p className="mt-1 text-[10px] text-muted-foreground">Discover. Build. Grow.</p></div>
        <span className="ml-2 flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary"><Check className="size-3" strokeWidth={3} /></span>
      </div>
    </div>
  );
}

const nextSteps = [
  { number: "01", title: "Discover your products", text: "Find inspiration for your next opportunity.", href: "/products", icon: Package },
  { number: "02", title: "Understand your margins", text: "See the bigger picture behind every sale.", href: "/margins", icon: TrendingUp },
  { number: "03", title: "Tell your brand story", text: "Make your presence feel like you.", href: "/social-media-content", icon: Sparkles },
];

export function HomeHero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-64 top-0 size-[500px] rounded-full bg-primary/[0.025] blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1360px] px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:pb-16 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
              <span className="h-px w-8 bg-primary" aria-hidden="true" /> Rooted in craft. Ready for more.
            </div>
            <h1 id="hero-heading" className="mt-7 font-heading text-[clamp(2.8rem,5.2vw,4.6rem)] font-semibold leading-[1.08] tracking-[-0.055em]">
              Local craft.<br /><span className="text-primary">Global</span><br /><span className="text-primary">possibility.</span>
            </h1>
            <p className="mt-6 max-w-[440px] text-base leading-8 text-muted-foreground sm:text-lg sm:leading-8">
              Big journeys start with a single idea. Discover products, explore your potential, and take your next step with Star Sellingz.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[380px]:flex-row sm:gap-4">
              <Link href="/products" className="group inline-flex min-h-13 items-center justify-center gap-5 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Explore Products <ArrowUpRight className="size-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link href="/about" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-lg border border-border bg-background px-6 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Our Story <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-xs leading-5 text-muted-foreground">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5"><Globe2 className="size-4 text-primary" strokeWidth={1.5} aria-hidden="true" /></span>
              Bridging local artisans to global markets.
            </div>
          </div>
          <SellingIllustration />
        </div>

        <div className="mt-14 grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0 lg:mt-20">
          {nextSteps.map(({ number, title, text, href, icon: Icon }) => (
            <Link key={number} href={href} className="group flex items-start gap-4 py-6 transition-colors hover:bg-primary/[0.025] focus-visible:outline-2 focus-visible:outline-primary md:px-6 md:first:pl-0 md:last:pr-0 lg:py-8">
              <span className="mt-0.5 text-[11px] font-medium text-primary/60">{number}</span>
              <div className="flex-1"><h2 className="text-sm font-semibold tracking-tight">{title}</h2><p className="mt-2 text-xs leading-6 text-muted-foreground">{text}</p></div>
              <Icon className="mt-0.5 size-5 shrink-0 text-primary/70 transition-colors group-hover:text-primary" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
