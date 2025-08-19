// pages/plant.js
import { useState } from "react";
import Link from "next/link";

export default function Plant() {
  const [hydration, setHydration] = useState(90);
  const [nutrition, setNutrition] = useState(50);
  const [cleanliness, setCleanliness] = useState(90);
  const [xp, setXp] = useState(32);
  const level = Math.max(1, Math.min(5, Math.floor(xp / 30) + 1));

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [recentAction, setRecentAction] = useState(null); // "water" | "feed" | "spray" | "repot" | null

  // ——— ovládacie akcie ———
  function bumpXP(x = 4) {
    setXp((v) => v + x);
  }
  function flashAction(name) {
    setRecentAction(name);
    setTimeout(() => setRecentAction(null), 900);
  }

  const water = () => {
    setHydration((v) => Math.min(100, v + 20));
    bumpXP();
    flashAction("water");
  };
  const feed = () => {
    setNutrition((v) => Math.min(100, v + 15));
    bumpXP();
    flashAction("feed");
  };
  const spray = () => {
    setCleanliness((v) => Math.min(100, v + 10));
    bumpXP();
    flashAction("spray");
  };
  const repot = () => {
    setHydration((v) => Math.min(100, v + 10));
    setNutrition((v) => Math.min(100, v + 10));
    bumpXP(8);
    flashAction("repot");
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMsg = message.trim();
    setChat((c) => [...c, { role: "user", content: userMsg }]);
    setMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, lang: "de" }),
      });
      const data = await res.json();
      const aiText =
        data?.reply ||
        "Ich bin mir nicht sicher. Formuliere es bitte anders. 🌱";
      setChat((c) => [...c, { role: "assistant", content: aiText }]);
    } catch (e) {
      setChat((c) => [
        ...c,
        {
          role: "assistant",
          content:
            "Die Verbindung zum Server ist fehlgeschlagen. Versuche es bitte erneut. 🌱",
        },
      ]);
    }
  };

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "24px 20px" }}>
      <Header />

      {/* ANIMOVANÁ RASTLINA */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <PlantStage
          hydration={hydration}
          nutrition={nutrition}
          cleanliness={cleanliness}
          level={level}
          recentAction={recentAction}
        />

        {/* stavové karty + tlačidlá */}
        <div>
          <h1 className="title">Virtuálna rastlinka</h1>
          <div className="stats">
            <Stat label="Hydratácia" value={hydration} />
            <Stat label="Výživa" value={nutrition} />
            <Stat label="Čistota" value={cleanliness} />
            <Stat label="XP" value={xp} />
            <Stat label="Level" value={level} />
          </div>

          <div className="buttons">
            <button onClick={water}>Poliať</button>
            <button onClick={feed}>Hnojiť</button>
            <button onClick={spray}>Postrek</button>
            <button onClick={repot}>Presadiť</button>
          </div>
        </div>
      </div>

      {/* Chat */}
      <section style={{ marginTop: 28 }}>
        <h2 className="chatTitle">
          Chat s Greenbuddy AI <span className="sprout">🌱</span>
        </h2>

        <div className="chatBox">
          {chat.map((m, i) => (
            <p key={i}>
              <b>{m.role === "user" ? "Ty:" : "AI:"}</b> {m.content}
            </p>
          ))}
        </div>

        <div className="chatInput">
          <input
            placeholder="Napíš správu…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Poslať</button>
        </div>
      </section>

      <style jsx>{`
        .title {
          font-size: 42px;
          line-height: 1.1;
          margin: 0 0 18px;
          font-weight: 800;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 16px;
        }
        .buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 8px;
        }
        button {
          padding: 10px 16px;
          border-radius: 10px;
          border: 0;
          background: #e7efe9;
          color: #0b1410;
          font-weight: 600;
          cursor: pointer;
        }
        button:hover {
          filter: brightness(0.95);
        }
        .chatTitle {
          font-size: 28px;
          font-weight: 800;
          margin: 6px 0 8px;
        }
        .chatBox {
          min-height: 80px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 12px;
        }
        .chatInput {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }
        .chatInput input {
          flex: 1;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(0, 0, 0, 0.2);
          color: #fff;
        }

        @media (max-width: 780px) {
          .title {
            font-size: 34px;
          }
        }
      `}</style>
    </main>
  );
}

/** Komponent ukazuje a animuje Monsteru podľa stavu */
function PlantStage({ hydration, nutrition, cleanliness, level, recentAction }) {
  // rýchlosť a uhol kývania – zdravšia rastlina = jemnejšie a pomalšie
  const health = Math.round((hydration + nutrition + cleanliness) / 3);
  const angle = Math.max(2, 12 - Math.floor(health / 10)); // 2–12°
  const speed = Math.max(3, 10 - Math.floor(health / 12)); // 3–10 s

  // farebná aura podľa akcie
  const aura =
    recentAction === "water"
      ? "var(--aqua)"
      : recentAction === "feed"
      ? "var(--lime)"
      : recentAction === "spray"
      ? "var(--mint)"
      : recentAction === "repot"
      ? "var(--amber)"
      : "transparent";

  // mierka podľa levelu
  const scale = 0.9 + level * 0.08;

  return (
    <div className="plantWrap">
      <div
        className={`plant ${recentAction ? "shake" : ""}`}
        style={{
          "--angle": `${angle}deg`,
          "--speed": `${speed}s`,
          "--aura": aura,
          transform: `scale(${scale})`,
        }}
        aria-label="Monstera animated"
      >
        <img src="/monstera.svg" alt="Monstera" />
      </div>

      <style jsx>{`
        .plantWrap {
          display: grid;
          place-items: end center;
          min-height: 320px;
          padding: 8px 0 0;
          position: relative;
        }
        .plant {
          width: min(360px, 86%);
          transform-origin: bottom center;
          animation: sway var(--speed) ease-in-out infinite;
          filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.35));
          position: relative;
        }
        .plant::after {
          content: "";
          position: absolute;
          inset: -10% -6% -20%;
          pointer-events: none;
          background: radial-gradient(60% 60% at 50% 60%, var(--aura), transparent);
          opacity: 0.55;
          transition: background 0.3s ease, opacity 0.3s ease;
        }
        .plant img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* krátky „shake“ pri akcii */
        .shake {
          animation:
            bop 0.6s ease-out 1,
            sway var(--speed) ease-in-out infinite 0.6s;
        }

        @keyframes sway {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(var(--angle));
          }
          100% {
            transform: rotate(0deg);
          }
        }
        @keyframes bop {
          0% {
            transform: translateY(0) rotate(0);
          }
          25% {
            transform: translateY(-6px) rotate(0.6deg);
          }
          60% {
            transform: translateY(0) rotate(-0.6deg);
          }
          100% {
            transform: translateY(0) rotate(0);
          }
        }
      `}</style>

      <style jsx global>{`
        :root {
          --aqua: rgba(88, 199, 255, 0.25);
          --lime: rgba(124, 220, 72, 0.25);
          --mint: rgba(120, 240, 200, 0.22);
          --amber: rgba(255, 184, 76, 0.22);
        }
      `}</style>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "12px 14px",
      }}
    >
      <div style={{ opacity: 0.8, fontSize: 14 }}>{label}</div>
      <div style={{ fontWeight: 800, fontSize: 24 }}>{value}</div>
    </div>
  );
}

function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 26 }}>🌱</span>
        <b style={{ fontSize: 22 }}>Greenbuddy</b>
      </div>
      <Link href="/">Home</Link>
    </header>
  );
}
