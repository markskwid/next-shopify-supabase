import CartList from "../components/CartList";
import PageContainer from "../components/PageContainer";
import Link from "next/link";
import { headers } from "next/headers";

export default async function CartPage() {
  const headersList = headers();
  const host = (await headersList).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/cart`, {
    cache: "no-store",
  });
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
