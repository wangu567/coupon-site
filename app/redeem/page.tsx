'use client';
import { useState } from "react";

export default function RedeemPage() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string>();

  async function submit() {
    setMsg(undefined);
    const res = await fetch("/api/redeem", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ code, email })
    });
    const j = await res.json();
    setMsg(j.message ?? (j.ok ? "Redeemed" : "Failed"));
  }

  return (
    <div style={{maxWidth:420}}>
      <h1 style={{fontSize:24, fontWeight:700, marginBottom:12}}>Redeem your coupon</h1>
      <div style={{display:"grid", gap:8}}>
        <input placeholder="Code" value={code} onChange={e=>setCode(e.target.value)} style={{padding:10, border:"1px solid #ddd", borderRadius:8}} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{padding:10, border:"1px solid #ddd", borderRadius:8}} />
        <button onClick={submit} style={{padding:10, borderRadius:8, background:"#111", color:"#fff", fontWeight:700}}>Redeem</button>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}
