import { getProducts } from "../../utils/shopify.queries";
import shopifyClient from "../../utils/shopifyClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, errors } = await shopifyClient.request(getProducts);

    if (errors) {
      return NextResponse.json(
        { error: "Shopify Graphql error" },
        { status: 400 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred";

    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: message,
      },
      { status: 500 }
    );
  }
}
