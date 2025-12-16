"use client";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import shopifyClient from "@/app/utils/shopifyClient";
import { getBanners } from "@/app/utils/shopify.queries";

export default function HeroCarousel({ banners }: any) {
  const [emblaRef] = useEmblaCarousel();
  console.log(banners);

  return (
    <section className="w-full p-0 mx-auto overflow-hidden">
      <div className="embla overflow-hidden h-[500px]" ref={emblaRef}>
        <div className="embla__container h-full flex [&>div]:min-h-0 [&>div]:flex-none [&>div]:basis-full [&>div>img]:w-full [&>div>img]:h-full [&>div>img]:object-cover [&>div>img]:object-center">
          {banners.map((banner: any) => (
            <div className="embla__slide h-full relative" id={banner.id}>
              <img
                src={banner.fields[3].reference?.image?.url}
                alt={banner.fields[1].value}
                className="h-full object-cover"
              />

              <div className="absolute right-0 bottom-0 flex justify-end items-end p-5 pb-12 w-full h-full bg-slate-800/50">
                <div>
                  <h3 className="text-5xl lg:text-7xl font-bold">
                    {banner.fields[1].value}
                  </h3>
                  <p className="mt-2 lg:text-lg lg:max-w-1/2">
                    {banner.fields[2].value}
                  </p>
                  <a
                    href="#"
                    className="inline-block mt-2 rounded-full bg-amber-400 py-2 px-5 text-xl font-bold text-black w-auto"
                  >
                    {banner.fields[1].value}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
