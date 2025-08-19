import { useState } from "react";
import Link from "next/link";

export default function PlantPage() {
  const [stats, setStats] = useState({
    water: 90,
    food: 50,
    clean: 90,
    xp: 32,
    lvl: 1,
  });

  const bump = (key, delta) => {
    setStats((s) => {
      const next = Math.max(0, Math.min(100, s[key] + delta));
      const gain = delta > 0 ? 5 : 0;
      return { ...s, [key]: next, xp: s.xp + gain };
    });
  };

  // amplitúda kývania podľa hydratácie (len pre efekt)
  const swayAmt = Math.max(2, Math.min(10, Math.round(stats.water / 10)));

  return (
    <main className="wrap">
      <header className="topbar">
        <div className="brand">
          <span className="sprout">🌱</span> <strong>Greenbuddy</strong>
        </div>
        <Link href="/">Home</Link>
      </header>

      <h1>Virtuálna rastlinka</h1>

      {/* SVG rastlinka */}
      <div className="plant-stage">
        <svg
          viewBox="0 0 200 220"
          width="280"
          height="308"
          aria-label="Monstera v kvetináči"
        >
          {/* zem */}
          <ellipse cx="100" cy="160" rx="60" ry="12" fill="#2f2f2f" opacity="0.25" />

          {/* kvetináč */}
          <path
            d="M40 160 h120 l-12 42 a8 8 0 0 1 -8 6 H60 a8 8 0 0 1 -8 -6 Z"
            fill="#7a3e1b"
          />
          <ellipse cx="100" cy="160" rx="60" ry="12" fill="#8b4a21" />

          {/* stonka + listy (animované kývanie) */}
          <g
            className="sway"
            style={{
              transformOrigin: "100px 160px",
              animationDuration: `${6 - Math.min(4, Math.floor(stats.clean / 25))}s`,
            }}
          >
            {/* stonka */}
            <rect x="97" y="70" width="6" height="90" rx="3" fill="#2e8f57" />

            {/* list 1 */}
            <path
              d="M85 110
                 c-30 -35, 20 -45, 30 -25
                 c 10 15,-5 35,-15 40
                 c-5  3,-10 -2,-15 -10 Z"
              fill="#2e8f57"
              stroke="#1f613b"
              strokeWidth="2"
            />

            {/* list 2 */}
            <path
              d="M115 95
                 c 25 -28, 48 10, 20 35
                 c-10  7,-25  6,-30 -5
                 c -3 -6, 0 -15, 10 -25 Z"
              fill="#2e8f57"
              stroke="#1f613b"
              strokeWidth="2"
            />

            {/* list 3 */}
            <path
              d="M100 80
                 c -8 -22, 10 -32, 18 -18
                 c  6  6,  6 18, -4 26
                 c -4  3,-9  3,-14 -2 Z"
              fill="#2e8f57"
              stroke="#1f613b"
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
        <Stat label="Level" value={stats.lvl} />
      </section>

      {/* tlačidlá */}
      <div className="buttons">
        <button onClick={() => bump("water", +10)}>Poliať</button>
        <button onClick={() => bump("food", +10)}>Hnojiť</button>
        <button onClick={() => bump("clean", +10)}>Postrek</button>
        <button onClick={() => setStats((s) => ({ ...s, water: 50, food: 50, clean: 50 }))}>
          Presadiť
        </button>
      </div>

      <p className="hint">
        Ak nič nevidíš, znamená to, že sa neaplikovali štýly – táto stránka obsahuje všetko
        potrebné v jednom súbore.
      </p>

      {/* lokálne štýly – nech je to viditeľné bez ďalších CSS */}
      <style jsx>{`
        .wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 24px 16px 80px;
          color: #fff;
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
            Arial;
        }
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
        }
        h1 {
          font-size: 40px;
          margin: 12px 0 8px;
          line-height: 1.1;
        }
        .plant-stage {
          display: grid;
          place-items: center;
          padding: 12px 0 4px;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          margin: 12px 0 18px;
        }
        .stat {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 10px 12px;
          text-align: center;
        }
        .stat-label {
          font-size: 12px;
          opacity: 0.8;
        }
        .stat-value {
          font-size: 20px;
          font-weight: 700;
        }
        .buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }
        button {
          background: #fff;
          color: #111;
          border: none;
          border-radius: 10px;
          padding: 10px 14px;
          font-weight: 600;
        }
        .hint {
          opacity: 0.7;
          font-size: 14px;
        }

        /* animácia – jemné kývanie podľa hydratácie */
        @keyframes sway {
          0% {
            transform: rotate(-${swayAmt}deg);
          }
          50% {
            transform: rotate(${swayAmt}deg);
          }
          100% {
            transform: rotate(-${swayAmt}deg);
          }
        }
        .sway {
          animation: sway 5.5s ease-in-out infinite;
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
