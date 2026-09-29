import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";

export const metadata: Metadata = { title: "Social Media Content | Star Sellingz" };

export default function SocialMediaContentPage() {
  return (
    <section aria-labelledby="social-media-content-heading" className="relative">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-64 top-0 size-[500px] rounded-full bg-primary/[0.025] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1150px] px-5 pb-10 pt-4 sm:px-8 sm:pb-12 sm:pt-5 lg:px-12">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="mt-5 grid items-start gap-8 sm:mt-6 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0 max-w-xl">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
              <span className="h-px w-8 shrink-0 bg-primary" aria-hidden="true" />
              Social Media Content
            </p>
            <h1
              id="social-media-content-heading"
              className="mt-4 text-balance font-heading text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.12] tracking-[-0.045em]"
            >
              Give your brand a voice of its own.
            </h1>
            <p className="mt-4 max-w-[440px] text-[15px] leading-7 text-muted-foreground sm:text-base">
              A space for fresh ideas, product stories, and content that brings your presence to life.
            </p>
          </div>

          <div className="w-full min-w-0 lg:ml-auto lg:max-w-[460px]">
            <div className="rounded-2xl border border-primary/10 bg-primary/[0.035] px-6 py-7 text-center sm:p-8">
              <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-primary/10 bg-background text-primary shadow-sm shadow-primary/5">
                <Sparkles className="size-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h2 className="mx-auto mt-5 max-w-xs text-balance font-heading text-xl font-semibold leading-snug tracking-tight sm:text-[22px]">
                Fresh content is on its way
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                Explore posts and creative resources here as they become available.
              </p>
              <Link
                href="/about"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/10 transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Get to know us
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
