// pages/plant.js
import { useState, useMemo } from "react";
import Link from "next/link";

export default function PlantPage() {
  // stav rastlinky
  const [hydr, setHydr] = useState(90);
  const [nutr, setNutr] = useState(50);
  const [clean, setClean] = useState(90);
  const [xp, setXp] = useState(32);
  const level = 1;

  // „zdravie“ 0–100
  const health = useMemo(
    () => Math.max(0, Math.min(100, Math.round((hydr + nutr + clean) / 3))),
    [hydr, nutr, clean]
  );

  // mierne naklonenie podľa zdravia
  const tilt = useMemo(() => (health - 50) / 6, [health]); // cca -8° až +8°

  const bump = (setter, by) => {
    setter(v => Math.max(0, Math.min(100, v + by)));
    setXp(x => x + Math.max(1, Math.floor(Math.abs(by) / 2)));
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 16px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ fontSize: 28 }}>🌱</div>
        <div style={{ fontWeight: 700, fontSize: 28 }}>Greenbuddy</div>
        <div style={{ marginLeft: "auto" }}>
          <Link href="/">Home</Link>
        </div>
      </header>

      <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: 0.4, margin: "8px 0 4px" }}>
        Virtuálna rastlinka
      </h1>

      {/* RASTLINKA */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>
        {/* SVG monstera */}
        <div
          style={{
            justifySelf: "center",
            width: 240,
            height: 240,
            transform: `rotate(${tilt}deg)`,
            transition: "transform 400ms ease, filter 400ms ease",
            filter: `saturate(${0.7 + health / 200}) brightness(${0.9 + health / 250})`,
          }}
          aria-label="Monstera"
          role="img"
        >
          {/* inline SVG – žiadny súbor netreba */}
          <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#5fd063" />
                <stop offset="1" stopColor="#2b8f45" />
              </linearGradient>
            </defs>
            {/* kvetináč */}
            <rect x="85" y="170" width="90" height="36" rx="8" fill="#7a4a2a" />
            <rect x="75" y="162" width="110" height="18" rx="9" fill="#9a623a" />
            {/* stonka */}
            <rect x="127" y="90" width="6" height="80" rx="3" fill="#2f7d3a" />
            {/* listy */}
            <g fill="url(#g)" stroke="#1c5d2a" strokeWidth="2">
              <path d="M126 120c-40-30-70-10-75 10 25 10 35-5 45 5 8 8 15 20 30 12 3-18 1-23 0-27z" />
              <path d="M134 120c40-30 70-10 75 10-25 10-35-5-45 5-8 8-15 20-30 12-3-18-1-23 0-27z" />
              <path d="M126 100c-20-28-50-24-62-5 20 6 29 0 38 6 7 5 14 12 24 7 1-6 1-7 0-8z" />
              <path d="M134 100c20-28 50-24 62-5-20 6-29 0-38 6-7 5-14 12-24 7-1-6-1-7 0-8z" />
            </g>
          </svg>
        </div>

        {/* ukazovatele + tlačidlá */}
        <div>
          <Stat label="Hydratácia" value={hydr} />
          <Stat label="Výživa" value={nutr} />
          <Stat label="Čistota" value={clean} />
          <Stat label="XP" value={xp} />
          <Stat label="Level" value={level} />

          <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
            <Btn onClick={() => bump(setHydr, +10)}>Poliať</Btn>
            <Btn onClick={() => bump(setNutr, +10)}>Hnojiť</Btn>
            <Btn onClick={() => bump(setClean, +10)}>Postrek</Btn>
            <Btn onClick={() => bump(setHydr, -5) || bump(setNutr, -5) || bump(setClean, -5)}>
              Presadiť
            </Btn>
          </div>

          <p style={{ opacity: 0.7, marginTop: 14 }}>
            Toto je demo ovládanie rastlinky. Chat nájdeme neskôr v <code>/api/chat</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div
      style={{
        display: "inline-block",
        minWidth: 120,
        padding: "10px 14px",
        margin: "6px 10px 0 0",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 14,
      }}
    >
      <div style={{ opacity: 0.8, fontSize: 14 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 24 }}>{value}</div>
    </div>
  );
}

function Btn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.25)",
        background: "transparent",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
