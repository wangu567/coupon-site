import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { code, email } = await req.json();
    if (!code || !email) {
      return NextResponse.json(
        { ok: false, message: "Code and email required" },
        { status: 400 }
      );
    }

    const sb = supabaseServer();
    const { data, error } = await sb.rpc("redeem_coupon", {
      p_code: code,
      p_email: email,
    });

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
    }

    const row = Array.isArray(data) ? data[0] : data;
    return NextResponse.json(row ?? { ok: false, message: "Unknown response" });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, message: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
