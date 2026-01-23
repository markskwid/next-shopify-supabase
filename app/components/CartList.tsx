"use client";

import { useRef } from "react";
import { useCart } from "../context/CartContext";

export default function CartList({ initialItems }: any) {
  const { deleteItem, cartItems } = useCart();
  const ref = useRef<(HTMLInputElement | null)[]>([]);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  const displayCart = cartItems.map((item) => {
    const product = initialItems.find(
      (p: any) => p.id === `gid://shopify/Product/${item.id}`,
    );
    return { ...item, ...product };
  });

  const increment = (index: number, id: string) => {
    if (ref.current[index]) {
      const input = ref.current[index];
      const currentValue = Number(input.value) || 0;
      input.value = (currentValue + 1).toString();

      if (timeOutRef.current) clearTimeout(timeOutRef.current);

      timeOutRef.current = setTimeout(() => {
        saveValue(index, id);
      }, 2000);
    }
  };

  const decrement = (index: number, id: string) => {
    if (ref.current[index]) {
      const input = ref.current[index];
      const currentValue = Number(input.value) || 0;
      input.value = (currentValue - 1).toString();
      const newValue = currentValue - 1;

      if (newValue === 0) {
        deleteItem(id);
      } else {
        if (timeOutRef.current) clearTimeout(timeOutRef.current);

        timeOutRef.current = setTimeout(() => {
          saveValue(index, id);
        }, 2000);
      }
    }
  };

  const saveValue = async (refIndex: number, productId: string) => {
    if (!ref.current) return;

    const newQuantity = Number(ref.current[refIndex]?.value);
    const numeridId = JSON.stringify(productId).includes("gid")
      ? (productId.split("/").pop() as string)
      : productId;

    const res = await fetch(`/api/cart/${numeridId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      console.log("Problem updating item quantity");
      return;
    }

    console.log("Quantity Updated");
  };

  return (
    <div>
      <div className="text-white w-full mb-2 flex justify-between items-center">
        <table className="table-fixed border-collapse w-full text-white border border-gray-50">
          <thead className="bg-slate-500 text-xl">
            <tr>
              <th className="border border-gray-50">Product</th>
              <th className="border border-gray-50">Quantity</th>
              <th className="border border-gray-50">Delete</th>
            </tr>
          </thead>

          <tbody>
            {displayCart &&
              displayCart.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td className="border border-gray-50 py-2">
                    <div className="flex justify-start items-start px-5">
                      <img
                        src={item.featuredImage?.url}
                        alt={item.title}
                        className="max-w-15"
                      />
                      <div className="wrapper ml-2 text-start">
                        <h2 className="font-semibold text-xl">{item.title}</h2>
                        <span className="uppercase font-light text-xs">
                          {item.vendor}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="border border-gray-50 text-center">
                    <div className="flex justify-center items-center w-1/2 mx-auto gap-2 [&_button]:cursor-pointer">
                      <button
                        onClick={() => decrement(index, item.id)}
                        type="button"
                        className="bg-white round-md px-2 py-0 min-w-8 text-black font-bold rounded-md"
                      >
                        -
                      </button>
                      <input
                        ref={(el) => {
                          ref.current[index] = el;
                        }}
                        type="number"
                        className="bg-white rounded-md text-black text-center w-15 appearance-none"
                        max={99}
                        defaultValue={item.quantity}
                      />
                      <button
                        onClick={() => increment(index, item.id)}
                        type="button"
                        className="bg-white round-md px-2 py-0 min-w-8 text-black font-bold rounded-md"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-50 text-center">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="bg-red-500 w-auto px-15 py-3 rounded-sm uppercase font-bold cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
