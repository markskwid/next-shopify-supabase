import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase.from("Cart").select("*");

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
