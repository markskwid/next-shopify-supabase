"use client";

import FloatingCart from "../components/CartHeader";
import CartProvider from "../context/CartContext";

export default function Providers({ children }: any) {
  return (
    <CartProvider>
      <FloatingCart />
      {children}
    </CartProvider>
  );
}
