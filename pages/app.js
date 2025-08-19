// pages/app.js
export default function AppPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0c1012", color: "#fff",
                   padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 20 }}>🌱 Greenbuddy</div>
        <nav>
          <a href="/" style={{ color: "#9dd79d" }}>Home</a>
        </nav>
      </header>

      <section style={{ marginTop: 32, textAlign: "center" }}>
        <h1>Virtuálna rastlinka (demo)</h1>
  <div style={{ display: "grid", placeItems: "center", height: 320, margin: "16px 0" }}>
  <svg viewBox="0 0 220 220" width="260" height="260" role="img" aria-label="Greenbuddy plant">
    <ellipse cx="110" cy="172" rx="72" ry="18" fill="#1b1b1b" />
    <path d="M40 160 h140 l-6 42 a8 8 0 0 1 -8 6 h-112 a8 8 0 0 1 -8 -6 z" fill="#2b2b2b"/>
    <ellipse cx="110" cy="160" rx="70" ry="22" fill="#3b3b3b" />
    <g className="sway" transform-origin="110 140">
      <rect x="106" y="70" width="8" height="90" rx="4" fill="#2e8f57" />
      <path d="M85 110 c-30 -35, 20 -45, 30 -22 c10 15,-5 35,-15 40 c-5 3,-10 -2,-15 -10 z"
            fill="#2e8f57" stroke="#1f613c" strokeWidth="2"/>
      <path d="M135 110 c30 -35,-20 -45,-30 -22 c-10 15,5 35,15 40 c5 3,10 -2,15 -10 z"
            fill="#2e8f57" stroke="#1f613c" strokeWidth="2"/>
    </g>
    <style>{`
      .sway { animation: sway 2.4s ease-in-out infinite; }
      @keyframes sway { 0%{transform:rotate(0)} 50%{transform:rotate(4deg)} 100%{transform:rotate(0)} }
    `}</style>
  </svg>
</div>
        <p>Tu bude interaktívna rastlinka, tlačidlá a chat. Zatiaľ jednoduchá stránka, aby nepadal 404.</p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
          <button>Poliať</button>
          <button>Hnojiť</button>
          <button>Postrek</button>
          <button>Presadiť</button>
        </div>
      </section>
    </main>
  );
}
