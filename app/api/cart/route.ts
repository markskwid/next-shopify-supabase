import { supabase } from "@/app/lib/supabaseClient";
import shopifyClient from "@/app/utils/shopifyClient";
import { NextResponse, NextRequest } from "next/server";

/**
 * Adding product to cart uses REST API (JSON-SERVER)
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    const { data: existingItem, error: fetchError } = await supabase
      .from("Cart")
      .select("quantity")
      .eq("id", id)
      .single();

    const newQuantity = (existingItem?.quantity || 0) + 1;

    const { data: upsertedItem, error: upsertError } = await supabase
      .from("Cart")
      .upsert(
        { id, quantity: newQuantity, created_at: new Date() },
        { onConflict: "id" }
      )
      .select();

    if (upsertError) {
      return NextResponse.json(
        { message: upsertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(upsertedItem?.[0] || [], { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred";

    return NextResponse.json(
      {
        error: message,
        details: message,
      },
      { status: 500 }
    );
  }
}

/**
 * Getting product to cart uses REST API (JSON-SERVER)
 */

export async function GET() {
  try {
    const { data, error } = await supabase.from("Cart").select("*");

    const ids = data!.map(
      (item: { id: string; quantity: number }) =>
        `gid://shopify/Product/${item.id}`
    );
    const products = await getShopifyProducts(ids);

    const mergedCart = data!.map((item: any) => ({
      ...item,
      ...products.nodes.find((p: any) => p.id.endsWith(item.id)),
    }));

    return NextResponse.json(mergedCart, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred";

    return NextResponse.json(
      {
        error: "Failed to fetch products (merged)",
        details: message,
      },
      { status: 500 }
    );
  }
}

async function getShopifyProducts(ids: string[]) {
  try {
    const query = `query GetCartProducts($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on Product {
          id
          title
          handle
          vendor
          featuredImage {
            url
          }
        }
      }
    }`;

    const { data } = await shopifyClient.request(query, {
      variables: {
        ids,
      },
    });

    return data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred";

    return message;
  }
}
