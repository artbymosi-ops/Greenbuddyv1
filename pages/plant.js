// pages/plant.js
import { useState } from "react";
import Link from "next/link";
import Plant from "../components/Plant";

export default function PlantPage() {
  const [hydration, setHydration] = useState(90);
  const [nutrition, setNutrition] = useState(50);
  const [cleanliness, setCleanliness] = useState(90);
  const [xp, setXp] = useState(32);

  const level = Math.floor(xp / 50) + 1;

  function clamp(v) {
    return Math.max(0, Math.min(100, v));
  }

  const actions = {
    water: () => {
      setHydration((h) => clamp(h + 8));
      setCleanliness((c) => clamp(c - 2));
      setXp((x) => x + 3);
    },
    fertilize: () => {
      setNutrition((n) => clamp(n + 8));
      setCleanliness((c) => clamp(c - 3));
      setXp((x) => x + 4);
    },
    spray: () => {
      setCleanliness((c) => clamp(c + 8));
      setXp((x) => x + 2);
    },
    repot: () => {
      setNutrition((n) => clamp(n + 5));
      setHydration((h) => clamp(h - 4));
      setCleanliness((c) => clamp(c - 6));
      setXp((x) => x + 10);
    },
  };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 44, lineHeight: 1.1, margin: 0 }}>Virtuelle Pflanze</h1>
        <Link href="/" style={{ fontSize: 18, textDecoration: "underline" }}>
          Startseite
        </Link>
      </header>

      <Plant hydration={hydration} nutrition={nutrition} cleanliness={cleanliness} />

      {/* Stavové karty */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(160px, 1fr))",
          gap: 12,
        }}
      >
        <Card title="Bewässerung" value={hydration} />
        <Card title="Nährstoffe" value={nutrition} />
        <Card title="Sauberkeit" value={cleanliness} />
        <Card title="XP" value={xp} />
        <Card title="Level" value={level} />
      </section>

      {/* Ovládacie tlačidlá */}
      <section style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
        <Btn onClick={actions.water}>Gießen</Btn>
        <Btn onClick={actions.fertilize}>Düngen</Btn>
        <Btn onClick={actions.spray}>Sprühen</Btn>
        <Btn onClick={actions.repot}>Umtopfen</Btn>
      </section>

      {/* Info */}
      <p style={{ opacity: 0.75, marginTop: 18 }}>
        Demo der Pflanzsteuerung. Der Chat mit Greenbuddy AI bleibt funkčný na stránke{" "}
        <code style={{ background: "rgba(255,255,255,.08)", padding: "2px 6px", borderRadius: 6 }}>
          /api/chat
        </code>{" "}
        (frontend bubliny vieme doplniť hneď potom).
      </p>
    </main>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: 12,
        padding: "14px 16px",
      }}
    >
      <div style={{ opacity: 0.7, fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function Btn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,.2)",
        background: "rgba(255,255,255,.06)",
        fontSize: 16,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
