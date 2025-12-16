import { supabase } from "@/app/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

/**
 * Delete an item on cart
 */

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase.from("Cart").delete().eq("id", id);

    return NextResponse.json({ message: "Item deleted!" }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred";

    return NextResponse.json(
      {
        error: "Failed to delete product",
        details: message,
      },
      { status: 500 }
    );
  }
}

/**
 * Patch quantity of one product item on cart
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { quantity } = body;

    const { data, error } = await supabase
      .from("Cart")
      .update({ quantity })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    if (data.length === 0 || !data) {
      return NextResponse.json(
        { message: "Cannot find item to delete" },
        { status: 404 }
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

/**
 * Get specific item on cart
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(
      `http://${process.env.PUBLIC_CART_URL}/${params.id}`
    );

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Something went wrong!",
        },
        { status: 401 }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected error occurred";

    return NextResponse.json(
      {
        error: "Failed to fetch item",
        details: message,
      },
      { status: 500 }
    );
  }
}
