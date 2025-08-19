import { useState } from "react";

export default function Home() {
  // Jednoduchý lokálny stav – nech vidíš animovanú rastlinku + čísla sa menia tlačidlami
  const [hydr, setHydr] = useState(90);
  const [nutr, setNutr] = useState(50);
  const [clean, setClean] = useState(90);
  const [xp, setXp] = useState(32);
  const level = 1;

  // pomocné funkcie
  const clamp = (n) => Math.max(0, Math.min(100, n));
  const gainXp = (n) => setXp((x) => x + n);

  const poliat = () => {
    setHydr((h) => clamp(h + 10));
    gainXp(10);
  };
  const hnojit = () => {
    setNutr((n) => clamp(n + 10));
    gainXp(10);
  };
  const postrek = () => {
    setClean((c) => clamp(c + 10));
    gainXp(5);
  };
  const presadit = () => {
    setHydr((h) => clamp(h - 5));
    setNutr((n) => clamp(n + 5));
    gainXp(15);
  };

  // Farba listov podľa hydratácie (iba jemná ukážka)
  const leafColor =
    hydr >= 70 ? "#36b37e" : hydr >= 40 ? "#8bc34a" : "#d4c24f";

  return (
    <div className="wrap">
      <header className="topbar">
        <span className="logo" aria-hidden>🌱</span>
        <h1 className="brand">Greenbuddy</h1>
        <a className="home" href="/">Home</a>
      </header>

      {/* ANIMOVANÁ RASTLINKA */}
      <div className="plantStage">
        <MonsteraSVG leafColor={leafColor} />
      </div>

      {/* ŠTATISTIKY */}
      <h2 className="title">Virtuálna rastlinka</h2>
      <div className="stats">
        <StatCard label="Hydratácia" value={hydr} />
        <StatCard label="Výživa" value={nutr} />
        <StatCard label="Čistota" value={clean} />
        <StatCard label="XP" value={xp} />
        <StatCard label="Level" value={level} />
      </div>

      {/* AKCIE */}
      <div className="actions">
        <button onClick={poliat}>Poliať</button>
        <button onClick={hnojit}>Hnojiť</button>
        <button onClick={postrek}>Postrek</button>
        <button onClick={presadit}>Presadiť</button>
      </div>

      <p className="hint">
        Toto je prvá verzia s animovanou rastlinkou. Neskôr pridáme zmeny vzhľadu
        podľa stavu & levelu a doplníme chat.
      </p>

      <style jsx>{`
        .wrap {
          min-height: 100vh;
          background: #0f1412;
          color: #e8f5e9;
          padding-bottom: 64px;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI,
            Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
        }
        .topbar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 16px;
        }
        .logo { font-size: 24px; }
        .brand { margin: 0; font-size: 20px; font-weight: 700; }
        .home {
          margin-left: auto;
          color: #a7f3d0;
          text-decoration: none;
          border-bottom: 1px dotted #a7f3d0;
        }

        .plantStage {
          display: grid;
          place-items: center;
          margin: 8px 0 12px;
        }

        .title {
          font-size: 36px;
          line-height: 1.1;
          text-align: center;
          margin: 8px 0 16px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
          padding: 0 16px;
          max-width: 980px;
          margin: 0 auto 8px;
        }
        @media (max-width: 680px) {
          .stats { grid-template-columns: repeat(3, 1fr); }
        }

        .actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          padding: 16px;
          flex-wrap: wrap;
        }
        button {
          background: #e8f5e9;
          color: #0f1412;
          border: 0;
          padding: 10px 16px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
        }
        button:hover { transform: translateY(-1px); }

        .hint {
          text-align: center;
          opacity: 0.7;
          margin-top: 8px;
          padding: 0 16px;
        }
      `}</style>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <style jsx>{`
        .card {
          background: #101a16;
          border: 1px solid #1e2a25;
          border-radius: 16px;
          padding: 12px 14px;
          display: grid;
          place-items: center;
        }
        .label { font-size: 14px; opacity: 0.8; }
        .value { font-size: 28px; font-weight: 800; }
      `}</style>
    </div>
  );
}

/** Jednoduchá “Monstera” (SVG) s jemným hojdanim */
function MonsteraSVG({ leafColor = "#36b37e" }) {
  return (
    <>
      <svg
        width="220"
        height="260"
        viewBox="0 0 220 260"
        role="img"
        aria-label="Monstera rastlinka"
      >
        {/* tieň pod kvetináčom */}
        <ellipse cx="110" cy="232" rx="60" ry="10" fill="rgba(0,0,0,0.25)" />

        {/* kvetináč */}
        <g>
          <rect x="60" y="180" width="100" height="42" rx="10" fill="#5b4636" />
          <rect x="56" y="176" width="108" height="10" rx="6" fill="#7b5b45" />
        </g>

        {/* celá rastlina – animujeme jemné “sway” */}
        <g className="plant">
          {/* stonka */}
          <path
            d="M110 178 C110 150, 108 120, 110 88"
            stroke="#2f7a52"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* list vľavo */}
          <path
            d="M82 120
               c-28 -10 -36 -36 -14 -46
               c14 -6 30 2 40 14
               c10 12 -2 42 -26 32z"
            fill={leafColor}
          />
          {/* list vpravo */}
          <path
            d="M116 108
               c12 -22 44 -30 54 -10
               c8 16 -10 34 -28 38
               c-18 4 -38 -6 -26 -28z"
            fill={leafColor}
          />
          {/* stredný menší list */}
          <path
            d="M98 98
               c-10 -16 -2 -28 12 -28
               c12 0 24 12 18 24
               c-6 12 -22 16 -30 4z"
            fill={leafColor}
          />
        </g>
      </svg>

      <style jsx>{`
        @keyframes sway {
          0%   { transform: rotate(-2deg); }
          50%  { transform: rotate(1.5deg); }
          100% { transform: rotate(-2deg); }
        }
        svg { overflow: visible; }
        .plant {
          transform-origin: 110px 180px; /* pri pätke stonky */
          animation: sway 4.8s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
