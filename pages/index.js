// pages/index.js
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // stav „virtuálnej rastlinky“
  const [stats, setStats] = useState({
    hydration: 90,
    nutrition: 50,
    cleanliness: 80,
    xp: 32,
    level: 1,
  });

  // jemné nakláňanie SVG rastliny
  const [tilt, setTilt] = useState(0);
  const timerRef = useRef(null);

  const sway = (dir = 1) => {
    // dir: 1 = doprava, -1 = doľava
    if (timerRef.current) clearTimeout(timerRef.current);
    setTilt(8 * dir);
    timerRef.current = setTimeout(() => setTilt(0), 900);
  };

  // akcie tlačidiel
  const water = () => {
    setStats((s) => ({
      ...s,
      hydration: Math.min(100, s.hydration + 20),
      xp: s.xp + 4,
    }));
    sway(-1);
  };

  const feed = () => {
    setStats((s) => ({
      ...s,
      nutrition: Math.min(100, s.nutrition + 15),
      xp: s.xp + 3,
    }));
    sway(1);
  };

  const spray = () => {
    setStats((s) => ({
      ...s,
      cleanliness: Math.min(100, s.cleanliness + 15),
      xp: s.xp + 2,
    }));
    sway(-1);
  };

  const repot = () => {
    setStats((s) => ({
      ...s,
      hydration: Math.max(0, s.hydration - 10),
      nutrition: Math.max(0, s.nutrition - 10),
      cleanliness: Math.max(0, s.cleanliness - 10),
      xp: s.xp + 10,
      level: s.level + 1,
    }));
    sway(1);
  };

  // pekné zaoblené „badge“ pre hodnoty
  const Stat = ({ label, value }) => (
    <div className="stat">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );

  return (
    <main className="wrap">
      <header className="brand">
        <span className="sprout">🌱</span> <span>Greenbuddy</span>
      </header>

      <h1 className="title">Virtuálna rastlinka</h1>

      <section className="stats">
        <Stat label="Hydratácia" value={stats.hydration} />
        <Stat label="Výživa" value={stats.nutrition} />
        <Stat label="Čistota" value={stats.cleanliness} />
        <Stat label="XP" value={stats.xp} />
        <Stat label="Level" value={stats.level} />
      </section>

      {/* ANIMOVANÁ MONSTERA */}
      <section className="plantBox">
        <div
          className="plant"
          style={{ transform: `translateY(0) rotate(${tilt}deg)` }}
          aria-label="Animovaná Monstera"
        >
          {/* jednoduchá SVG „monstera v kvetináči“ */}
          <svg
            viewBox="0 0 180 220"
            width="220"
            height="270"
            role="img"
            aria-hidden="true"
          >
            {/* kvetináč */}
            <g>
              <rect x="40" y="150" width="100" height="40" rx="8" fill="#8B5E3C" />
              <rect x="35" y="140" width="110" height="16" rx="8" fill="#A07048" />
            </g>

            {/* stonka */}
            <path
              d="M90 150 C 90 120, 85 100, 90 70"
              fill="none"
              stroke="#2f6d3a"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* listy monstéry – pár „dierovaných“ listov */}
            <g fill="#2DAA5A" stroke="#207e44" strokeWidth="2">
              <path d="M92 95 C 130 70, 145 65, 150 85 C 147 100, 120 105, 100 110 C 95 104, 94 100, 92 95 Z" />
              <circle cx="128" cy="87" r="5" fill="#0b6e3a" />
              <circle cx="118" cy="96" r="4" fill="#0b6e3a" />

              <path d="M88 85 C 60 60, 35 65, 30 88 C 34 104, 60 108, 82 110 C 86 102, 87 95, 88 85 Z" />
              <circle cx="50" cy="84" r="5" fill="#0b6e3a" />
              <circle cx="60" cy="95" r="4" fill="#0b6e3a" />

              <path d="M90 110 C 120 110, 135 125, 132 138 C 118 150, 100 145, 92 135 C 90 128, 90 120, 90 110 Z" />
              <circle cx="118" cy="130" r="4" fill="#0b6e3a" />
            </g>
          </svg>
        </div>
      </section>

      {/* ovládacie tlačidlá */}
      <section className="actions">
        <button onClick={water}>Poliať</button>
        <button onClick={feed}>Hnojiť</button>
        <button onClick={spray}>Postrek</button>
        <button onClick={repot}>Presadiť</button>
      </section>

      {/* miesto na chat – funkčný backend /api/chat už máš, sem potom len doplníme UI */}
      <p className="hint">
        Toto je demo animácie. Chat doplníme neskôr do spodnej časti.
      </p>

      {/* štýly (styled-jsx – funguje hneď v Next.js /pages routeri) */}
      <style jsx>{`
        .wrap {
          max-width: 960px;
          margin: 0 auto;
          padding: 28px 18px 80px;
          color: #eaeaea;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI,
            Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          letter-spacing: 0.3px;
          color: #d7ffd7;
          opacity: 0.9;
          margin-bottom: 8px;
        }
        .brand .sprout {
          font-size: 22px;
        }
        .title {
          font-size: 42px;
          line-height: 1.1;
          margin: 6px 0 18px;
          letter-spacing: 0.3px;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 18px;
        }
        .stat {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 12px 14px;
        }
        .label {
          font-size: 13px;
          opacity: 0.8;
        }
        .value {
          font-size: 28px;
          font-weight: 800;
          margin-top: 2px;
        }
        .plantBox {
          display: grid;
          place-items: center;
          padding: 10px 0 6px;
          margin: 6px 0 8px;
        }
        .plant {
          transition: transform 0.85s cubic-bezier(0.25, 0.8, 0.25, 1);
          will-change: transform;
          filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.35));
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin: 10px 0 4px;
        }
        button {
          background: #0f172a;
          color: #eaeaea;
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 10px 14px;
          border-radius: 10px;
          font-weight: 600;
        }
        button:hover {
          background: #111827;
        }
        .hint {
          opacity: 0.75;
          text-align: center;
          margin-top: 8px;
          font-size: 14px;
        }
      `}</style>
    </main>
  );
}
