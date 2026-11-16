"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Package,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const heroSlides = [
  {
    image: "/krc78U-removebg-preview.png",
    imageAlt: "Shopping bag illustration on a soft blue background",
    eyebrow: "Made with care, ready for the world",
    title: "Where Local Craft Meets Global Opportunity.",
    description:
      "Discover unique products crafted by talented Indian artisans. Find your next bestseller and bring local craftsmanship to customers worldwide.",
    cta: "Explore Products",
    href: "/products",
    color: "maroon",
  },
  {
    image: "/zJ1Pnw-removebg-preview.png",
    imageAlt: "Shopping bag illustration on a soft pink background",
    eyebrow: "A marketplace with meaning",
    title: "Find Products with a Story to Tell.",
    description:
      "Browse thoughtful finds from independent makers and introduce your customers to the people and traditions behind every product.",
    cta: "Browse the Catalog",
    href: "/products",
    color: "#36113E",
  },
  {
    image: "/fnNOue-removebg-preview.png",
    imageAlt: "Shopping bag illustration on a soft green background",
    eyebrow: "Grow at your own pace",
    title: "Turn Great Finds into New Possibilities.",
    description:
      "Build a business around products you believe in, with inspiration and practical resources to help you take the next step.",
    cta: "See How It Works",
    href: "/about",
    color: "black",
  },
  {
    image: "/9wAwpK-removebg-preview.png",
    imageAlt: "Shopping bag illustration on a warm yellow background",
    eyebrow: "Make every sale count",
    title: "Know Your Margins. Grow with Confidence.",
    description:
      "Get a clearer view of the numbers behind your business and make informed choices as you find products your customers will love.",
    cta: "Explore Margins",
    href: "/margins",
    color: "#4E9A78",
  },
  {
    image: "/F7R7qZ-removebg-preview.png",
    imageAlt: "Shopping bag illustration on a soft lavender background",
    eyebrow: "Your next idea starts here",
    title: "Bring Your Brand Story to Life.",
    description:
      "Discover products, fresh ideas, and content inspiration to help your brand connect with customers in a way that feels like you.",
    cta: "Get Inspired",
    href: "/social-media-content",
    color: "#4C4920",
  },
] as const;

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
  const [slidePosition, setSlidePosition] = useState<number>(heroSlides.length);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlidePosition((current) => current + 1);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (slidePosition === heroSlides.length * 2) {
      setSlidePosition(heroSlides.length);
    } else if (slidePosition === heroSlides.length - 1) {
      setSlidePosition(heroSlides.length * 2 - 1);
    }
  }, [slidePosition]);

  function finishLoopTransition() {
    if (
      slidePosition !== heroSlides.length - 1 &&
      slidePosition !== heroSlides.length * 2
    )
      return;

    setTransitionEnabled(false);
    setSlidePosition(
      slidePosition === heroSlides.length * 2
        ? heroSlides.length
        : heroSlides.length * 2 - 1,
    );
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => setTransitionEnabled(true)),
    );
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -left-64 top-0 size-[500px] rounded-full bg-primary/[0.025] blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1150px] px-5 pb-6 pt-2 sm:px-8 lg:px-12">
        <div
          aria-roledescription="carousel"
          aria-label="Featured products and stories"
        >
          <div className="overflow-hidden" aria-live="off">
            <div
              onTransitionEnd={(event) => {
                if (event.target === event.currentTarget)
                  finishLoopTransition();
              }}
              className={`flex w-full ${transitionEnabled ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none" : ""}`}
              style={{ transform: `translateX(-${slidePosition * 100}%)` }}
            >
              {Array.from({ length: 3 }, (_, copy) =>
                heroSlides.map((slide, index) => {
                  const position = copy * heroSlides.length + index;
                  const finalWordStart = slide.title.lastIndexOf(" ") + 1;

                  return (
                    <article
                      key={`${copy}-${slide.image}`}
                      aria-hidden={slidePosition !== position}
                      inert={slidePosition !== position}
                      aria-roledescription="slide"
                      aria-label={`${index + 1} of ${heroSlides.length}`}
                      className="grid w-full flex-none items-center gap-8 overflow-hidden pt-8 lg:min-h-[min(520px,calc(100svh-180px))] lg:grid-cols-[0.92fr_1.08fr] lg:gap-4"
                    >
                      <div className="order-2 min-w-0 max-w-[500px] lg:order-1 lg:pr-2">
                        <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-primary/[0.04] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-primary sm:text-[10px]">
                          <Sparkles
                            className="size-3.5 shrink-0"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                          {/* yet to fix */}
                          {slide.eyebrow}
                        </div>
                        <h1
                          id={
                            slidePosition === position
                              ? "hero-heading"
                              : undefined
                          }
                          className="mt-5 max-w-[500px] text-balance font-heading text-[clamp(2rem,3.1vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.045em]"
                        >
                          {slide.title.slice(0, finalWordStart)}
                          <span
                            className="relative left-3 inline-block -skew-x-12 pb-1 pl-1.5 pr-3 text-white shadow-[inset_0_2px_3px_rgba(255,255,255,0.35),inset_0_-3px_5px_rgba(0,0,0,0.12),0_3px_0_rgba(0,0,0,0.12)]"
                            style={{ backgroundColor: slide.color }}
                          >
                            <span className="inline-block skew-x-12">
                              {slide.title.slice(finalWordStart)}
                            </span>
                          </span>
                        </h1>
                        <p className="mt-5 max-w-[450px] text-sm leading-[1.75] text-muted-foreground">
                          {slide.description}
                        </p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                          <Link
                            href={slide.href}
                            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-xl px-4 text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_6px_18px_-6px_var(--primary)] transition-[filter,box-shadow] hover:brightness-95 hover:shadow-[0_8px_22px_-6px_var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                            style={{ backgroundColor: slide.color }}
                          >
                            {slide.cta}
                            <ArrowUpRight
                              className="size-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </Link>
                          <Link
                            href="/about"
                            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-border/80 bg-background px-4 text-sm font-medium text-foreground/80 transition-colors hover:border-[var(--hover-color)] hover:bg-[var(--hover-bg)] hover:text-[var(--hover-color)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                            style={
                              {
                                "--hover-color": slide.color,
                                "--hover-bg": `${slide.color}0D`,
                              } as React.CSSProperties
                            }
                          >
                            Discover Our Story
                            <ArrowRight
                              className="size-4 transition-all motion-safe:group-hover:translate-x-0.5"
                              style={{ color: slide.color }}
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                        <div className="mt-6 flex max-w-[450px] items-center gap-3 border-t border-border/70 pt-4 text-[11px] leading-5 text-muted-foreground">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/[0.05]">
                            <Globe2
                              className="size-4 text-primary"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          </span>
                          Bridging Indian craftsmanship with global markets.
                        </div>
                      </div>

                      <div className="relative order-1 aspect-[4/3] min-w-0 lg:order-2 lg:-translate-x-4 lg:scale-110">
                        <Image
                          src={slide.image}
                          alt={slide.imageAlt}
                          fill
                          priority={copy === 1 && index === 0}
                          loading="eager"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain"
                        />
                      </div>
                    </article>
                  );
                }),
              )}
            </div>
          </div>
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
