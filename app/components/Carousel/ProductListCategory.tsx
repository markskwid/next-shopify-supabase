"use client";
import useEmblaCarousel from "embla-carousel-react";
import Card from "../ProductCard/Card";

export default function ProductListCategory({ collection }: any) {
  const [emblaRef] = useEmblaCarousel();
  const products = collection.products;

  return (
    <section className="w-full p-0 mx-auto overflow-hidden my-2">
      <h2 className="text-2xl font-semibold uppercase mb-2">
        {collection.title}
      </h2>
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container h-full flex [&>div]:min-h-0 [&>div]:flex-none [&>div]:basis-[15%] gap-2 [&>div>img]:w-full [&>div>img]:h-full [&>div>img]:object-cover [&>div>img]:object-center">
          {products.edges.map(({ node }: any, index: number) => (
            <div
              className="embla__slide h-full relative"
              id={node.id}
              key={index}
            >
              <Card props={node} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
