import { useState } from "react";
import Link from "next/link";

export default function PlantPage() {
  const [hydration, setHydration] = useState(70);
  const [nutrition, setNutrition] = useState(40);
  const [cleanliness, setCleanliness] = useState(80);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [note, setNote] = useState("");

  function bumpXP(amount = 5) {
    const newXP = xp + amount;
    const gained = Math.floor(newXP / 100);
    setXp(newXP % 100);
    if (gained > 0) setLevel((L) => L + gained);
  }

  function flash(text) {
    setNote(text);
    setTimeout(() => setNote(""), 1800);
  }

  const water = () => {
    setHydration((v) => Math.min(100, v + 10));
    bumpXP(8);
    flash("💧 Poliate!");
  };
  const fertilize = () => {
    setNutrition((v) => Math.min(100, v + 10));
    bumpXP(10);
    flash("🌿 Prihnojené!");
  };
  const spray = () => {
    setCleanliness((v) => Math.min(100, v + 10));
    bumpXP(6);
    flash("✅ Postrek hotový!");
  };
  const repot = () => {
    setHydration((v) => Math.max(0, v - 5));
    setNutrition((v) => Math.max(0, v - 5));
    bumpXP(15);
    flash("🪴 Presadené!");
  };

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={s.brand}>
          <span style={s.logo}>🌱</span>
          <Link href="/" style={s.brandTitle}>Greenbuddy</Link>
        </div>
        <Link href="/" style={s.homeLink}>Home</Link>
      </header>

      <main style={s.main}>
        <h1 style={s.title}>Virtuálna rastlinka</h1>

        <div style={s.stats}>
          <Stat label="Hydratácia" value={hydration} />
          <Stat label="Výživa" value={nutrition} />
          <Stat label="Čistota" value={cleanliness} />
          <Stat label="XP" value={xp} />
          <Stat label="Level" value={level} />
        </div>

        <div style={s.actions}>
          <button style={s.btn} onClick={water}>Poliať</button>
          <button style={s.btn} onClick={fertilize}>Hnojiť</button>
          <button style={s.btn} onClick={spray}>Postrek</button>
          <button style={s.btn} onClick={repot}>Presadiť</button>
        </div>

        {!!note && <div style={s.note}>{note}</div>}

        <p style={s.hint}>
          Toto je demo ovládanie rastlinky. Chat nájdeme neskôr v /api/chat po pridaní ďalšieho kroku.
        </p>
      </main>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={s.stat}>
      <div style={s.statLabel}>{label}</div>
      <div style={s.statValue}>{value}</div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#0b0f0e", color: "#eaf6f1" },
  header: { display: "flex", justifyContent: "space-between", padding: "16px 20px" },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  logo: { fontSize: 24 },
  brandTitle: { color: "#eaf6f1", textDecoration: "none", fontWeight: 700, fontSize: 20 },
  homeLink: { color: "#a9f5d0", textDecoration: "underline" },
  main: { maxWidth: 900, margin: "0 auto", padding: "24px 16px 80px" },
  title: { fontSize: 32, marginBottom: 16, fontWeight: 800 },
  stats: { display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 16 },
  stat: { background: "#121816", border: "1px solid #1f2a27", borderRadius: 12, padding: 12, textAlign: "center" },
  statLabel: { fontSize: 13, color: "#b8d3c9" },
  statValue: { fontSize: 18, fontWeight: 700 },
  actions: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 },
  btn: { background: "#eaf6f1", color: "#0b0f0e", border: "none", borderRadius: 10, padding: "10px 14px", fontWeight: 600, cursor: "pointer" },
  note: { marginTop: 8, background: "#101716", border: "1px solid #1f2a27", padding: "10px 12px", borderRadius: 10, width: "fit-content" },
  hint: { opacity: 0.7, marginTop: 18, fontSize: 13 },
};
