import CartList from "../components/CartList";
import PageContainer from "../components/PageContainer";
import Link from "next/link";

export default async function CartPage() {
  const res = await fetch("http://localhost:3000/api/cart");
  const cartData = await res.json();

  return (
    <PageContainer>
      <div className="flex flex-col mt-12">
        <div className="flex justify-start items-center mb-5">
          <Link href="/" title="Go back home" className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-left-icon lucide-move-left"
            >
              <path d="M6 8L2 12L6 16" />
              <path d="M2 12H22" />
            </svg>
          </Link>
          <h1 className="text-4xl font-bold">Your Cart</h1>
        </div>
        <CartList initialItems={cartData} />
      </div>
    </PageContainer>
  );
}
