"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Package } from "lucide-react";
import { apiGet } from "@/lib/axios";

type Product = {
  _id: string;
  title: string;
  shortDescription: string;
  price: number | null;
  colors: { images: string[] }[];
};

type Catalog = { products: Product[] };

const cardColors = ["#e8eae3", "#eee5dc", "#e5e8e8", "#eae7dc", "#ebe7eb"];

function setScrollPositionImmediately(element: HTMLElement, left: number) {
  element.style.scrollBehavior = "auto";
  element.scrollLeft = left;
  element.style.scrollBehavior = "";
}

function HomeProductImage({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [broken, setBroken] = useState(false);
  const src = product.colors[0]?.images[0];

  if (!src || broken || !/^(https?:\/\/|\/(?!\/))/.test(src)) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Package className="size-14 text-foreground/20" aria-hidden="true" />
      </div>
    );
  }

  /* eslint-disable @next/next/no-img-element */
  return (
    <img
      src={src}
      alt={product.title}
      loading={index < 5 ? "eager" : "lazy"}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      onError={() => setBroken(true)}
    />
  );
  /* eslint-enable @next/next/no-img-element */
}

export function HomeProducts() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { data, isPending, isError } = useQuery({
    queryKey: ["home-products"],
    queryFn: ({ signal }) =>
      apiGet<{ data: Catalog }>("/products?limit=10", { signal }),
    staleTime: 60000,
  });
  const products = (data?.data.products ?? []).slice(0, 10);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard || products.length < 2) return;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    setScrollPositionImmediately(track, step * products.length);
  }, [products.length]);

  useEffect(() => {
    if (products.length < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const track = trackRef.current;
    if (!track) return;

    let index = 0;
    let resetTimer: number | undefined;
    const timer = window.setInterval(() => {
      const firstCard = track.firstElementChild as HTMLElement | null;
      if (!firstCard) return;
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
      const step = firstCard.getBoundingClientRect().width + gap;
      index = (index + 1) % products.length;
      const wrapped = index === 0;
      const physicalIndex =
        products.length + index + (wrapped ? products.length : 0);
      track.scrollTo({ left: physicalIndex * step, behavior: "smooth" });

      if (wrapped) {
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
          setScrollPositionImmediately(track, products.length * step);
        }, 500);
      }
    }, 1000);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(resetTimer);
    };
  }, [products.length]);

  return (
    <section
      aria-labelledby="home-products-heading"
      className="mx-auto w-full max-w-[1280px] px-5 py-8 sm:px-8 lg:px-12"
    >
      <div className="mb-8 flex flex-col gap-4 border-b border-border/70 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="shop-categories-heading"
            className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Featured Products
          </h2>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Discover our handpicked collection of standout products, crafted
            with quality, creativity.
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
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
          aria-label="Loading products"
          role="status"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square rounded-xl bg-muted" />
              <div className="mt-3 h-4 w-3/4 rounded bg-muted" />
              <div className="mt-2 h-3 w-1/3 rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : isError || products.length === 0 ? (
        <p
          className="py-12 text-center text-sm text-muted-foreground"
          role="status"
        >
          {isError
            ? "Unable to load products right now."
            : "Products are coming soon."}
        </p>
      ) : (
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Featured products"
        >
          {Array.from({ length: 3 }, (_, copy) =>
            products.map((product, index) => (
              <article
                key={`${copy}-${product._id}`}
                aria-hidden={copy !== 1}
                className="group min-w-0 shrink-0 basis-[calc(50%-8px)] snap-start sm:basis-[calc(33.333%-11px)] lg:basis-[calc((100%-64px)/5)]"
              >
                <Link
                  href={`/products?product=${encodeURIComponent(product._id)}`}
                  tabIndex={copy === 1 ? 0 : -1}
                  className="block overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  style={{
                    backgroundColor: cardColors[index % cardColors.length],
                  }}
                  aria-label={`View ${product.title}`}
                >
                  <div className="aspect-square overflow-hidden">
                    <HomeProductImage product={product} index={index} />
                  </div>
                </Link>
                <div className="px-0.5 pt-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-[13px] font-semibold leading-5 sm:text-sm">
                      {product.title}
                    </h3>
                    <p className="mt-1 h-8 overflow-hidden text-[11px] leading-4 text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                      {product.shortDescription}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {product.price != null
                        ? `₹${product.price.toLocaleString("en-IN")}`
                        : "Price on request"}
                    </p>
                  </div>
                </div>
              </article>
            )),
          )}
        </div>
      )}
    </section>
  );
}
