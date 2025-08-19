// pages/admin.js
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("gb_admin") === "true";
    if (!isAdmin) {
      window.location.href = "/";
    } else {
      setOk(true);
    }
  }, []);

  if (!ok) return null;

  return (
    <main style={{ minHeight: "100vh", background: "#0c1012", color: "#fff", padding: 24 }}>
      <h1>🔐 Admin panel (demo)</h1>
      <p>Si prihlásená ako admin. Tu neskôr pribudne moderovanie fóra a nástroje.</p>
      <button
        onClick={() => { localStorage.removeItem("gb_admin"); window.location.href = "/"; }}
        style={{ marginTop: 16 }}
      >
        Odhlásiť
      </button>
    </main>
  );
}
