import { NextResponse } from "next/server";
// If you’re using the "@/..." alias, keep this line.
// If you still get a module error, switch to: "../../../lib/supabase"
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    // Parse and validate body
    const body = (await req.json()) as Partial<{ code: string; email: string }>;
    const code = (body?.code ?? "").trim();
    const email = (body?.email ?? "").trim();

    if (!code || !email) {
      return NextResponse.json(
        { ok: false, message: "Code and email required" },
        { status: 400 }
      );
    }

    // Call the secured RPC
    const sb = supabaseServer();
    const { data, error } = await sb.rpc("redeem_coupon", {
      p_code: code,
      p_email: email,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 400 }
      );
    }

    // RPC returns a single-row table: { ok: boolean, message: string }
    const row = Array.isArray(data) ? data[0] : data;
    if (!row) {
      return NextResponse.json(
        { ok: false, message: "Unknown response" },
        { status: 500 }
      );
    }

    return NextResponse.json(row);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Server error";
    return NextResponse.json(
      { ok: false, message },
      { status: 500 }
    );
  }
}
