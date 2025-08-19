// pages/plant.js
import { useEffect, useRef, useState } from "react";

export default function Plant() {
  const [hydration, setHydration] = useState(90);
  const [nutrition, setNutrition] = useState(50);
  const [cleanliness, setCleanliness] = useState(90);
  const [xp, setXp] = useState(32);
  const [level, setLevel] = useState(1);

  // chat
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Aktionen – nur Demo-Logik
  function water() {
    setHydration((v) => Math.min(100, v + 10));
    setXp((v) => v + 5);
  }
  function fertilize() {
    setNutrition((v) => Math.min(100, v + 10));
    setXp((v) => v + 5);
  }
  function spray() {
    setCleanliness((v) => Math.min(100, v + 10));
    setXp((v) => v + 5);
  }
  function repot() {
    setNutrition((v) => Math.min(100, v + 20));
    setXp((v) => v + 10);
  }

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          plant: { hydration, nutrition, cleanliness, xp, level },
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Entschuldigung, ich konnte keine Antwort generieren." },
        ]);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Es gab ein Problem mit dem Server. Bitte später erneut versuchen." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16, color: "white", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Virtuelle Pflanze</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 12 }}>
        <div style={card}>Feuchtigkeit <b>{hydration}</b></div>
        <div style={card}>Nährstoffe <b>{nutrition}</b></div>
        <div style={card}>Sauberkeit <b>{cleanliness}</b></div>
        <div style={card}>XP <b>{xp}</b></div>
        <div style={card}>Level <b>{level}</b></div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <button style={btn} onClick={water}>Bewässern</button>
        <button style={btn} onClick={fertilize}>Düngen</button>
        <button style={btn} onClick={spray}>Sprühen</button>
        <button style={btn} onClick={repot}>Umtopfen</button>
      </div>

      <div style={panel}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Chat mit Greenbuddy AI 🌱</h2>

        <div style={chatBox}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <b>{m.role === "user" ? "Du" : "AI"}:</b> {m.content}
            </div>
          ))}
          {loading && <div style={{ color: "#9ca3af" }}>AI schreibt…</div>}
          <div ref={endRef} />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Schreibe eine Nachricht…"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={inputStyle}
          />
          <button style={btn} onClick={sendMessage}>Senden</button>
        </div>
      </div>
    </div>
  );
}

const card = {
  background: "#1f2937",
  padding: 12,
  borderRadius: 8,
  textAlign: "center",
};

const btn = {
  background: "#10b981",
  color: "black",
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
};

const panel = {
  background: "#111827",
  padding: 16,
  borderRadius: 12,
};

const chatBox = {
  height: 180,
  overflowY: "auto",
  border: "1px solid #374151",
  padding: 8,
  borderRadius: 8,
  background: "black",
  marginBottom: 8,
  fontSize: 14,
  lineHeight: 1.4,
};

const inputStyle = {
  flex: 1,
  background: "#1f2937",
  color: "white",
  border: "1px solid #374151",
  borderRadius: 8,
  padding: "8px 10px",
};
