import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Ahoj 🌱 Som tvoj GreenBuddy! Ako ti môžem pomôcť?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { role: "user", content: input };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  };

  return (
    <div className="container">
      <h1>🌿 GreenBuddy AI</h1>
      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>
            <b>{m.role === "assistant" ? "GreenBuddy" : "Ty"}:</b> {m.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Napíš správu..."
        />
        <button onClick={sendMessage}>Poslať</button>
      </div>
    </div>
  );
}
