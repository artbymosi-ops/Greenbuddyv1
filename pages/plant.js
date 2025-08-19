import Link from "next/link";

export async function getServerSideProps() {
  // Vynútime čerstvé renderovanie (žiadna predgenerovaná cache)
  return { props: { ts: Date.now() } };
}

export default function PlantPage({ ts }) {
  return (
    <main style={{ color: "#eaeaea", fontFamily: "system-ui, sans-serif", padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontWeight: 700 }}>🌱 Greenbuddy</div>
        <Link href="/">Home</Link>
      </header>

      <h1 style={{ margin: "8px 0 16px", fontSize: 28 }}>Virtuálna rastlinka (SVG test)</h1>
      <p style={{ opacity: 0.8, marginBottom: 16 }}>
        Timestamp (má sa meniť pri reload-e): <b>{ts}</b>
      </p>

      {/* STAGE */}
      <div style={{ display: "grid", placeItems: "center", height: 320, marginBottom: 12 }}>
        <svg viewBox="0 0 220 220" width="260" height="260" role="img" aria-label="Greenbuddy plant">
          {/* zem */}
          <ellipse cx="110" cy="172" rx="72" ry="18" fill="#1b1b1b" />
          {/* kvetináč */}
          <path d="M40 160 h140 l-6 42 a8 8 0 0 1 -8 6 h-112 a8 8 0 0 1 -8 -6 z" fill="#2b2b2b"/>
          <ellipse cx="110" cy="160" rx="70" ry="22" fill="#3b3b3b" />

          {/* ANIMOVANÁ STONKA + LISTY */}
          <g className="sway" transform-origin="110 140">
            {/* stonka */}
            <rect x="106" y="70" width="8" height="90" rx="4" fill="#2e8f57" />
            {/* list vľavo */}
            <path
              d="M85 110 c-30 -35, 20 -45, 30 -22 c10 15,-5 35,-15 40 c-5 3,-10 -2,-15 -10 z"
              fill="#2e8f57" stroke="#1f613c" strokeWidth="2"
            />
            {/* list vpravo */}
            <path
              d="M135 110 c30 -35,-20 -45,-30 -22 c-10 15,5 35,15 40 c5 3,10 -2,15 -10 z"
              fill="#2e8f57" stroke="#1f613c" strokeWidth="2"
            />
          </g>

          {/* jednoduchý štýl pre „kývanie“ */}
          <style>{`
            .sway { animation: sway 2.4s ease-in-out infinite; }
            @keyframes sway {
              0%   { transform: rotate(0deg); }
              50%  { transform: rotate(4deg); }
              100% { transform: rotate(0deg); }
            }
          `}</style>
        </svg>
      </div>

      <p style={{ opacity: 0.75 }}>
        Ak vidíš rastlinku, kýve sa a timestamp sa mení pri načítaní, beží nová verzia a môžeme
        pokračovať s „monsterou“ a prepojením na tlačidlá.
      </p>
    </main>
  );
}
