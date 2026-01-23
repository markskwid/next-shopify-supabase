"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function FloatingCart() {
  const { cartCount } = useCart();

  return (
    <div className="mx-auto mb-2 block text-end bg-slate-400 p-4 fixed z-50 top-0 left-0 right-0">
      <div className="max-w-[1440px]">
        <Link
          href="/shop-all"
          title="Shop All"
          className="cursor-pointer border px-5 py-2 rounded-full hover:border-slate-300 hover:bg-slate-300 hover:text-black transition-all mr-2"
        >
          <span className="uppercase font-bold mr-1">Shop All</span>
        </Link>

        <Link
          href="/cart"
          title="Cart"
          className="cursor-pointer border px-5 py-2 rounded-full hover:border-slate-300 hover:bg-slate-300 hover:text-black transition-all"
        >
          <span className="uppercase font-bold mr-1">Cart</span>
          <span className="font-bold">({cartCount})</span>
        </Link>
      </div>
    </div>
  );
}
