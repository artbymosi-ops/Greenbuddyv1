import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [logged, setLogged] = useState(false);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  function login(e) {
    e.preventDefault();
    const okUser = u.trim().toLowerCase() === "admin";
    const okPass = p.trim().toLowerCase() === "admin";
    if (okUser && okPass) {
      setLogged(true);
      setErr("");
    } else {
      setErr("Nesprávne prihlasovacie údaje.");
    }
  }

  function logout() {
    setLogged(false);
    setU(""); setP(""); setErr("");
  }

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={s.brand}>
          <span style={s.logo}>🔐</span>
          <Link href="/" style={s.brandTitle}>Admin panel (demo)</Link>
        </div>
        <Link href="/" style={s.homeLink}>Domov</Link>
      </header>

      <main style={s.main}>
        {!logged ? (
          <form onSubmit={login} style={s.card}>
            <h1 style={s.title}>Admin Login</h1>
            <label style={s.label}>Meno</label>
            <input style={s.input} value={u} onChange={(e)=>setU(e.target.value)} placeholder="admin" />
            <label style={s.label}>Heslo</label>
            <input style={s.input} type="password" value={p} onChange={(e)=>setP(e.target.value)} placeholder="admin" />
            {err && <div style={s.err}>{err}</div>}
            <button style={s.btn} type="submit">Prihlásiť</button>
          </form>
        ) : (
          <div style={s.card}>
            <h1 style={s.title}>✅ Prihlásená ako admin</h1>
            <p>Tu neskôr pribudnú moderovanie a nástroje.</p>
            <button style={s.btn} onClick={logout}>Odhlásiť</button>
          </div>
        )}
      </main>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#0b0f0e", color: "#eaf6f1" },
  header: { display: "flex", justifyContent: "space-between", padding: "16px 20px" },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  logo: { fontSize: 22 },
  brandTitle: { color: "#eaf6f1", textDecoration: "none", fontWeight: 700, fontSize: 20 },
  homeLink: { color: "#a9f5d0", textDecoration: "underline" },
  main: { maxWidth: 640, margin: "0 auto", padding: "24px 16px 80px" },
  card: { background: "#0f1513", border: "1px solid #1f2a27", borderRadius: 14, padding: 16 },
  title: { marginBottom: 12
