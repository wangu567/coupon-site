export const metadata = { title: "Coupons", description: "Simple coupon site" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, Arial, sans-serif", background: "#f7f7f7" }}>
        <nav style={{ background: "#fff", borderBottom: "1px solid #eee" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: 16, display: "flex", gap: 16 }}>
            <a href="/" style={{ fontWeight: 600 }}>Deals</a>
            <a href="/redeem">Redeem</a>
          </div>
        </nav>
        <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>{children}</main>
      </body>
    </html>
  );
}
