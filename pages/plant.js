// pages/plant.js
import { useState } from "react";
import Link from "next/link";

export default function PlantPage() {
  // jednoduchý “stav” rastlinky – zatiaľ len demo
  const [hydration, setHydration] = useState(70);
  const [nutrition, setNutrition] = useState(40);
  const [cleanliness, setCleanliness] = useState(80);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  // chat
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Ahoj! Som Greenbuddy 🌱. Spýtaj sa ma, ako sa starať o svoje rastliny – alebo o mňa.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  function bumpXP(amount = 5) {
    const newXP = xp + amount;
    const newLevel = level + Math.floor(newXP / 100);
    setXp(newXP % 100);
    if (newLevel !== level) setLevel(newLevel);
  }

  function act(action) {
    if (action === "water") {
      setHydration((v) => Math.min(100, v + 10));
      bumpXP(8);
      addBotNote("Ďakujem za zálievku! 💧 Cítim sa sviežo.");
    }
    if (action === "fert") {
      setNutrition((v) => Math.min(100, v + 10));
      bumpXP(10);
      addBotNote("Hnojivo! 🌿 To ma posilní.");
    }
    if (action === "spray") {
      setCleanliness((v) => Math.min(100, v + 10));
      bumpXP(6);
      addBotNote("Postrek hotový ✅ Škodcovia si na mňa neprídu.");
    }
    if (action === "repot") {
      setHydration((v) => Math.max(0, v - 5));
      setNutrition((v) => Math.max(0, v - 5));
      bumpXP(15);
      addBotNote("Presadené! 🪴 Trochu stres, ale bude mi lepšie.");
    }
  }

  function addBotNote(text) {
    setMessages((m) => [...m, { role: "assistant", content: text }]);
  }

  async function sendMessage(e) {
    e.preventDefault();
    const question = input.trim();
    if (!question) return;

    // pridáme tvoju otázku do histórie
    setMessages((m) => [...m, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      // pošleme stav rastlinky ako kontext
      const state = { hydration, nutrition, cleanliness, xp, level };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, state }),
      });

      if (!res.ok) {
        throw new Error(`API error ${res.status}`);
      }

      const data = await res.json();
      const answer = data.answer || "Ups, niečo sa pokazilo.";

      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Ospravedlňujem sa, momentálne neviem odpovedať. Skús to prosím znova.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <span style={styles.logo}>🌱</span>
          <Link href="/" style={styles.brandTitle}>
            Greenbuddy
          </Link>
        </div>
        <Link href="/" style={styles.homeLink}>
          Home
        </Link>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>Virtuálna rastlinka</h1>

        {/* Panel so stavmi */}
        <div style={styles.stats}>
          <Stat label="Hydratácia" value={hydration} />
          <Stat label="Výživa" value={nutrition} />
          <Stat label="Čistota" value={cleanliness} />
          <Stat label="XP" value={xp} />
          <Stat label="Level" value={level} />
        </div>

        {/* Akcie */}
        <div style={styles.actions}>
          <button onClick={() => act("water")} style={styles.btn}>
            Poliať
          </button>
          <button onClick={() => act("fert")} style={styles.btn}>
            Hnojiť
          </button>
          <button onClick={() => act("spray")} style={styles.btn}>
            Postrek
          </button>
          <button onClick={() => act("repot")} style={styles.btn}>
            Presadiť
          </button>
        </div>

        {/* Chat */}
        <section style={styles.chatCard}>
          <h2 style={styles.chatTitle}>Chat s Greenbuddy</h2>
          <div style={styles.chatBox} id="chatBox">
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.msg,
                  ...(m.role === "user" ? styles.user : styles.bot),
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && <div style={styles.typing}>Greenbuddy píše…</div>}
          </div>
          <form onSubmit={sendMessage} style={styles.form}>
            <input
              style={styles.input}
              placeholder="Napíš otázku o starostlivosti…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button style={styles.sendBtn} type="submit" disabled={loading}>
              {loading ? "..." : "Poslať"}
            </button>
          </form>
          <p style={styles.hint}>
            Tip: Skús sa spýtať napr. „Ako často mám polievať monsteru?“
          </p>
        </section>
      </main>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={styles.stat}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#0b0f0e", color: "#eaf6f1" },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
  },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  logo: { fontSize: 24 },
  brandTitle: {
    color: "#eaf6f1",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 20,
  },
  homeLink: { color: "#a9f5d0", textDecoration: "underline" },
  main: { maxWidth: 900, margin: "0 auto", padding: "24px 16px 80px" },
  title: { fontSize: 32, marginBottom: 16, fontWeight: 800 },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: 12,
    marginBottom: 16,
  },
  stat: {
    background: "#121816",
    border: "1px solid #1f2a27",
    borderRadius: 12,
    padding: 12,
    textAlign: "center",
  },
  statLabel: { fontSize: 13, color: "#b8d3c9" },
  statValue: { fontSize: 18, fontWeight: 700 },
  actions: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 },
  btn: {
    background: "#eaf6f1",
    color: "#0b0f0e",
    border: "none",
    borderRadius: 10,
    padding: "10px 14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  chatCard: {
    background: "#0f1513",
    border: "1px solid #1f2a27",
    borderRadius: 16,
    padding: 16,
  },
  chatTitle: { marginBottom: 10, fontSize: 20, fontWeight: 700 },
  chatBox: {
    height: 280,
    overflowY: "auto",
    background: "#0b0f0e",
    border: "1px solid #1f2a27",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  msg: {
    padding: "10px 12px",
    borderRadius: 12,
    marginBottom: 8,
    lineHeight: 1.35,
  },
  user: { background: "#1a2421", alignSelf: "flex-end" },
  bot: { background: "#101716" },
  typing: { fontStyle: "italic", color: "#cde7de", padding: "4px 2px" },
  form: { display: "flex", gap: 8 },
  input: {
    flex: 1,
    borderRadius: 10,
    border: "1px solid #1f2a27",
    background: "#0b0f0e",
    color: "#eaf6f1",
    padding: "10px 12px",
    outline: "none",
  },
  sendBtn: {
    borderRadius: 10,
    border: "none",
    padding: "10px 14px",
    background: "#a9f5d0",
    color: "#0b0f0e",
    fontWeight: 700,
    cursor: "pointer",
  },
  hint: { opacity: 0.7, marginTop: 8, fontSize: 13 },
};
