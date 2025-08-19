import { useState } from "react";
import Link from "next/link";

export default function PlantPage() {
  const [stats, setStats] = useState({
    water: 90,
    food: 50,
    clean: 90,
    xp: 32,
    lv: 1,
  });

  const bump = (key, delta) => {
    setStats((s) => {
      const next = { ...s, [key]: Math.max(0, Math.min(100, s[key] + delta)) };
      // pridaj aj XP pri akcii
      if (["water", "food", "clean"].includes(key)) {
        next.xp = s.xp + 10;
        if (next.xp >= 100) {
          next.lv = s.lv + 1;
          next.xp = 0;
        }
      }
      return next;
    });
  };

  // menšia amplitúda kývania keď je rastlinka spokojná
  const swaySec = 4;
  const swayDeg = Math.max(2, 10 - Math.floor((stats.water + stats.food) / 25)); // 2–10°

  return (
    <main className="wrap">
      <header className="topbar">
        <div className="brand">
          <span className="sprout">🌱</span>
          <Link href="/">Home</Link>
        </div>
      </header>

      <h1>Virtuálna rastlinka</h1>

      {/* SVG rastlinka */}
      <div className="plant-stage">
        <svg
          viewBox="0 0 240 280"
          width="260"
          height="300"
          role="img"
          aria-label="Monstera v kvetináči"
        >
          {/* tieň */}
          <ellipse cx="120" cy="255" rx="70" ry="12" fill="#0f1214" opacity="0.5" />

          {/* kvetináč */}
          <path
            d="M60 210 h120 l-10 40 a8 8 0 0 1 -8 6 H78 a8 8 0 0 1 -8 -6 Z"
            fill="#a06b3b"
          />
          <ellipse cx="120" cy="210" rx="60" ry="12" fill="#bf8551" />

          {/* zem */}
          <ellipse cx="120" cy="205" rx="52" ry="8" fill="#3b2b22" />

          {/* celá rastlina v skupine kvôli animácii kývania */}
          <g className="plant" transform="translate(0,-10)">
            {/* stonka */}
            <rect x="116" y="110" width="8" height="98" rx="4" fill="#2e8f57" />

            {/* list 1 (ľavý) */}
            <path
              d="M110 140
                 c -45 -30, -35 -70, -5 -80
                 c 26 -8, 44 12, 35 28
                 c -5 10, -18 18, -30 20 z"
              fill="#2e8f57"
              stroke="#1f6139"
              strokeWidth="2"
            />
            {/* list 2 (pravý) */}
            <path
              d="M126 132
                 c 48 -28, 50 -62, 18 -74
                 c -22 -8, -40 4, -36 22
                 c 3 12, 10 20, 18 26 z"
              fill="#2e8f57"
              stroke="#1f6139"
              strokeWidth="2"
            />
            {/* list 3 (hore) */}
            <path
              d="M120 120
                 c -18 -34, 8 -58, 30 -56
                 c 20 2, 28 18, 18 32
                 c -8 12, -24 20, -38 24 z"
              fill="#2e8f57"
              stroke="#1f6139"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>

      {/* ukazovatele */}
      <section className="stats">
        <Stat label="Hydratácia" value={stats.water} />
        <Stat label="Výživa" value={stats.food} />
        <Stat label="Čistota" value={stats.clean} />
        <Stat label="XP" value={stats.xp} />
        <Stat label="Level" value={stats.lv} />
      </section>

      {/* tlačidlá */}
      <div className="buttons">
        <button onClick={() => bump("water", 10)}>Poliať</button>
        <button onClick={() => bump("food", 10)}>Hnojiť</button>
        <button onClick={() => bump("clean", 10)}>Postrek</button>
        <button onClick={() => setStats((s) => ({ ...s, water: 50, food: 50, clean: 50 }))}>
          Presadiť
        </button>
      </div>

      <p className="hint">
        Ak SVG predtým nebolo vidieť, býva to väčšinou tým, že sa build zastavil na
        chybách v atribútoch (napr. <code>stroke-width</code> vs <code>strokeWidth</code>)
        alebo farby splynuli s pozadím. Tu je všetko pripravené pre React/Next.
      </p>

      <style jsx>{`
        .wrap {
          max-width: 880px;
          margin: 0 auto;
          padding: 24px 16px 80px;
          color: #e9f0ec;
        }
        .topbar {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 12px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sprout {
          font-size: 20px;
        }
        h1 {
          font-size: 42px;
          margin: 12px 0 10px;
        }
        .plant-stage {
          display: flex;
          justify-content: center;
          margin: 10px 0 6px;
        }
        /* animácia kývania – pivot dole pri kvetináči */
        .plant {
          transform-origin: 120px 210px;
          animation: sway ${swaySec}s ease-in-out infinite alternate;
        }
        @keyframes sway {
          from {
            transform: rotate(-${swayDeg}deg);
          }
          to {
            transform: rotate(${swayDeg}deg);
          }
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          margin: 8px 0 14px;
        }
        .stat {
          background: #0f1214;
          border: 1px solid #2a2f33;
          border-radius: 10px;
          padding: 10px 12px;
          text-align: center;
        }
        .stat-label {
          font-size: 12px;
          opacity: 0.85;
        }
        .stat-value {
          font-size: 22px;
          font-weight: 700;
          margin-top: 2px;
        }
        .buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 8px 0 16px;
        }
        button {
          background: #111518;
          border: 1px solid #2a2f33;
          border-radius: 10px;
          padding: 10px 14px;
          color: #e9f0ec;
        }
        button:active {
          transform: translateY(1px);
        }
        .hint {
          opacity: 0.75;
          font-size: 14px;
        }
        code {
          background: #0f1214;
          padding: 2px 6px;
          border-radius: 6px;
          border: 1px solid #2a2f33;
        }
        @media (max-width: 640px) {
          .stats {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
