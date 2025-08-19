import { useState } from "react";

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

  function water() {
    setHydration(Math.min(100, hydration + 10));
    setXp(xp + 5);
  }
  function fertilize() {
    setNutrition(Math.min(100, nutrition + 10));
    setXp(xp + 5);
  }
  function spray() {
    setCleanliness(Math.min(100, cleanliness + 10));
    setXp(xp + 5);
  }
  function repot() {
    setNutrition(Math.min(100, nutrition + 20));
    setXp(xp + 10);
  }

  async function sendMessage() {
    if (!input) return;
    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Virtuálna rastlinka</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-gray-800 rounded">Hydratácia {hydration}</div>
        <div className="p-3 bg-gray-800 rounded">Výživa {nutrition}</div>
        <div className="p-3 bg-gray-800 rounded">Čistota {cleanliness}</div>
        <div className="p-3 bg-gray-800 rounded">XP {xp}</div>
        <div className="p-3 bg-gray-800 rounded">Level {level}</div>
      </div>
      <div className="flex gap-2 mb-6">
        <button onClick={water} className="px-3 py-1 bg-blue-600 rounded">Poliať</button>
        <button onClick={fertilize} className="px-3 py-1 bg-green-600 rounded">Hnojiť</button>
        <button onClick={spray} className="px-3 py-1 bg-teal-600 rounded">Postrek</button>
        <button onClick={repot} className="px-3 py-1 bg-yellow-600 rounded">Presadiť</button>
      </div>

      {/* Chat box */}
      <div className="bg-gray-900 p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Chat s Greenbuddy AI 🌱</h2>
        <div className="h-40 overflow-y-auto mb-2 border border-gray-700 p-2 rounded bg-black text-sm">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "text-green-400" : "text-blue-400"}>
              <b>{msg.role === "user" ? "Ty" : "AI"}:</b> {msg.content}
            </div>
          ))}
          {loading && <div className="text-gray-400">AI píše...</div>}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Napíš správu..."
            className="flex-1 p-2 rounded bg-gray-800 text-white"
          />
          <button onClick={sendMessage} className="px-3 py-1 bg-green-600 rounded">Poslať</button>
        </div>
      </div>
    </div>
  );
}
