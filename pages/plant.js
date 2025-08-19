import { useState } from "react";
import Link from "next/link";

export default function PlantPage() {
  const [stats, setStats] = useState({ water: 90, food: 50, clean: 90, xp: 32, lvl: 1 });

  const bump = (key, delta) =>
    setStats(s => ({ ...s, [key]: Math.max(0, Math.min(100, s[key] + delta)), xp: s.xp + 10 }));

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
  <svg width="140" height="140" aria-label="test-svg" style={{background:'#0b1411'}}>
    <circle cx="70" cy="70" r="55" fill="#ff4d4d" />
  </svg>
</div>

          {/* stonka (animovaná) */}
          <g className="sway">
            <rect x="96" y="70" width="8" height="90" rx="4" fill="#2f6d3a"/>

            {/* listy – jednoduchá „monstera“ silueta */}
            <g fill="#2e8f57" stroke="#1f613c" strokeWidth="1.5">
              <path d="M85 110
                       c-30 -35, 20 -45, 30 -30
                       c 10 15,-5 35,-15 40
                       c-5 3,-10 -2,-15 -10 z"/>
              <path d="M115 95
                       c 25 -28, 48 10, 20 30
                       c-10 7,-25 6,-30 -5
                       c-3 -6, 0 -15, 10 -25 z"/>
              <path d="M100 80
                       c -8 -22, 10 -32, 18 -24
                       c 6 6, 6 18,-4 26
                       c-4 3,-9 3,-14 -2 z"/>
            </g>
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
        <button onClick={() => bump("water", 10)}>Poliať</button>
        <button onClick={() => bump("food", 10)}>Hnojiť</button>
        <button onClick={() => bump("clean", 10)}>Postrek</button>
        <button onClick={() => setStats(s => ({ ...s, lvl: s.lvl + 1 }))}>Presadiť</button>
      </div>

      <p className="hint">Ak by si chcela namiesto inline SVG použiť obrázok z <code>/public/monstera.svg</code>, dá sa to tiež – teraz je to ale
      vložené priamo, aby sme mali istotu, že sa zobrazí a animuje.</p>
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
