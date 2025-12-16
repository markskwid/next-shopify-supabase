"use client";

import { useCart } from "../context/CartContext";

export default function Notification() {
  const { lastItemAdded, isAdded } = useCart();

  return (
    <div
      data-notification-id={lastItemAdded?.id}
      className={`fixed transition-opacity bottom-10 right-10 px-2 py-3 w-82 bg-white border border-black rounded-md flex justify-start items-center shadow-black shadow-xl z-0 ${
        isAdded && lastItemAdded ? "opacity-100 z-10" : "opacity-0"
      }`}
    >
      <img src={lastItemAdded?.pictureUrl} className="max-w-25 rounded-sm" />
      <p className="text-black ml-2 font-bold text-xl">
        {lastItemAdded?.name}
        <span className="block font-medium">is added to cart!</span>
      </p>
    </div>
  );
}
