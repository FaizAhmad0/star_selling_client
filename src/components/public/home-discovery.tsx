"use client";

import { useState } from "react";
import Link from "next/link";
import { useQueries, useQuery } from "@tanstack/react-query";
import { ArrowRight, Check, Mail, Package, Sparkles } from "lucide-react";
import { apiGet } from "@/lib/axios";

type Category = { _id: string; name: string };
type Product = {
  _id: string;
  title: string;
  price: number | null;
  colors: { images: string[] }[];
};
type Catalog = { categories: Category[]; products: Product[] };

const tones = ["bg-[#f1eee7]", "bg-[#ece8e2]", "bg-[#e9ede8]", "bg-[#eee8ec]"];

function CategoryImage({ product }: { product?: Product }) {
  const [broken, setBroken] = useState(false);
  const src = product?.colors[0]?.images[0];

  if (!src || broken || !/^(https?:\/\/|\/(?!\/))/.test(src)) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-primary/[0.035]">
        <Package
          className="size-10 text-primary/25"
          strokeWidth={1.25}
          aria-hidden="true"
        />
      </div>
    );
  }

  /* eslint-disable @next/next/no-img-element */
  return (
    <img
      src={src}
      alt={product.title}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      onError={() => setBroken(true)}
    />
  );
  /* eslint-enable @next/next/no-img-element */
}

export function HomeDiscovery() {
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const { data, isPending, isError } = useQuery({
    queryKey: ["home-category-list"],
    queryFn: ({ signal }) =>
      apiGet<{ data: Catalog }>("/products?limit=1", { signal }),
    staleTime: 60000,
  });
  const categories = data?.data.categories ?? [];
  const productQueries = useQueries({
    queries: categories.map((category) => ({
      queryKey: ["home-category-product", category._id],
      queryFn: ({ signal }: { signal: AbortSignal }) =>
        apiGet<{ data: Catalog }>(
          `/products?category=${encodeURIComponent(category._id)}&limit=1`,
          { signal },
        ),
      staleTime: 60000,
    })),
  });

  return (
    <>
      <section
        aria-labelledby="shop-categories-heading"
        className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 pb-14"
      >
        <div className="mb-8 flex flex-col gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="shop-categories-heading"
              className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Shop by category
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Explore considered finds from independent makers and artisans.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex min-h-10 items-center gap-2 self-start text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:self-auto"
          >
            Explore all products{" "}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {isPending ? (
          <div
            className="flex gap-4 overflow-hidden pb-3"
            role="status"
            aria-label="Loading product categories"
          >
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="min-w-0 shrink-0 basis-[calc(50%-8px)] animate-pulse sm:basis-[calc(33.333%-11px)] lg:basis-[calc((100%-64px)/5)]"
              >
                <div className="aspect-square rounded-xl bg-muted" />
                <div className="mt-3 h-4 w-2/3 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <p
            className="rounded-xl border border-border bg-muted/30 px-5 py-8 text-center text-sm text-muted-foreground"
            role="status"
          >
            Categories are unavailable right now. You can still browse the full
            catalog.
          </p>
        ) : categories.length === 0 ? (
          <p className="rounded-xl border border-border bg-muted/30 px-5 py-8 text-center text-sm text-muted-foreground">
            New categories are on their way. Explore the full catalog to see
            what’s available.
          </p>
        ) : (
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category, index) => {
              const product = productQueries[index]?.data?.data.products[0];
              return (
                <Link
                  key={category._id}
                  href={`/products?category=${encodeURIComponent(category._id)}`}
                  className="group min-w-0 shrink-0 basis-[calc(50%-8px)] snap-start rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:basis-[calc(33.333%-11px)] lg:basis-[calc((100%-64px)/5)]"
                >
                  <div
                    className={`relative aspect-square overflow-hidden rounded-xl ${tones[index % tones.length]}`}
                  >
                    {productQueries[index]?.isPending ? (
                      <div className="h-full w-full animate-pulse bg-muted/60" />
                    ) : (
                      <CategoryImage product={product} />
                    )}
                    <span className="absolute bottom-3 right-3 flex size-9 translate-y-1 items-center justify-center rounded-full bg-background/95 text-foreground opacity-0 shadow-sm transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2 px-0.5 pt-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold capitalize">
                        {category.name}
                      </h3>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {product?.title ?? "Explore this collection"}
                      </p>
                    </div>
                    {product?.price != null && (
                      <span className="shrink-0 pt-0.5 text-xs text-muted-foreground">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section
        aria-labelledby="newsletter-heading"
        className="mx-auto w-full max-w-[1280px] px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12"
      >
        <div className="relative overflow-hidden rounded-2xl bg-[#252a28] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border border-white/[0.08] sm:size-96" />
          <div className="pointer-events-none absolute -right-4 -top-12 size-52 rounded-full border border-white/[0.08] sm:size-72" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-xl">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white">
                <Sparkles
                  className="size-5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                The Star Sellingz newsletter
              </p>
              <h2
                id="newsletter-heading"
                className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Good finds. Fresh inspiration.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/70">
                Get new product stories, thoughtful finds, and ideas for growing
                your business—straight to your inbox.
              </p>
            </div>
            <div className="w-full max-w-md lg:min-w-[390px]">
              <form
                className="flex flex-col gap-2 rounded-xl bg-white p-2 sm:flex-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  setNewsletterMessage(
                    "Newsletter signup is coming soon. Thanks for your interest!",
                  );
                }}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <span className="flex min-h-11 min-w-0 flex-1 items-center gap-2 px-2 text-foreground/45">
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Your email address"
                    className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
                  />
                </span>
                <button
                  type="submit"
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Join the list{" "}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </form>
              <p
                aria-live="polite"
                className="mt-3 min-h-5 text-xs leading-5 text-white/55"
              >
                {newsletterMessage ||
                  "No spam. Just new arrivals and ideas worth opening."}
              </p>
            </div>
          </div>
          <div className="relative mt-8 flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-white/55">
            <Check className="size-4" aria-hidden="true" /> Made for people
            building something of their own.
          </div>
        </div>
      </section>
    </>
  );
}
