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
