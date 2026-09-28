import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Globe2, HeartHandshake, Sparkles } from "lucide-react";

export const metadata: Metadata = { title: "About Us | Star Sellingz" };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About Star Sellingz</p>
      <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">Local roots.<br /><span className="text-primary">A world of possibility.</span></h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Bridging local artisans to global markets is at the heart of Star Sellingz. We believe thoughtfully made products deserve to be discovered, and every selling journey deserves a place to begin.</p>
      <div className="my-12 grid gap-5 md:grid-cols-3 sm:my-16">
        {[
          { icon: HeartHandshake, title: "Rooted in craft", text: "Celebrating the people, care, and creativity behind every product." },
          { icon: Globe2, title: "Looking beyond borders", text: "Connecting local ideas with the possibility of a wider audience." },
          { icon: Sparkles, title: "Moving forward together", text: "Making room for fresh ideas and the next chapter of your journey." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border border-border bg-primary/[0.025] p-7">
            <Icon className="size-7 text-primary" strokeWidth={1.5} aria-hidden="true" />
            <h2 className="mt-6 font-heading text-lg font-semibold tracking-tight">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
      <Link href="/products" className="inline-flex min-h-12 items-center gap-4 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Explore Products <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
    </section>
  );
}
