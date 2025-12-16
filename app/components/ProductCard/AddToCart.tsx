"use client";

import { useCart } from "@/app/context/CartContext";

type Card = {
  id: string;
  title: string;
  handle: string;
  price: string;
  vendor: string;
  featuredImage?: {
    url: string;
  };
};

export default function AddToCart({ product }: { product: Card }) {
  const { addItem, isAdded } = useCart();

  return (
    <button
      className={`uppercase border ${
        isAdded ? "cursor-progress" : "cursor-pointer"
      } border-black rounded-full w-full mt-auto py-2 px-4 inline-block hover:bg-black hover:text-white transition-colors`}
      onClick={() =>
        addItem({
          id: product.id,
          name: product.title,
          image: product.featuredImage?.url || "",
        })
      }
      disabled={isAdded ? true : false}
    >
      Add to Cart
    </button>
  );
}
