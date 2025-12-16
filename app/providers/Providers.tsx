"use client";

import CartProvider from "../context/CartContext";

export default function Providers({ children }: any) {
  return <CartProvider>{children}</CartProvider>;
}
