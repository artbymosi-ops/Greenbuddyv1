import { useState } from "react";
import Link from "next/link";

const s = {
  page: { minHeight:"100vh", background:"#0b0f0e", color:"#eaf6f1" },
  wrap: { maxWidth:860, margin:"0 auto", padding:"28px 18px" },
  header: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 },
  brand: { display:"flex", gap:12, alignItems:"center", fontWeight:800, fontSize:28 },
  h1: { fontSize:44, fontWeight:800, margin:"8px 0 16px" },
  grid: { display:"grid", gridTemplateColumns:"repeat(5, minmax(0,1fr))", gap:14, marginBottom:16 },
  stat: { background:"rgba(234,246,241,.06)", border:"1px solid rgba(234,246,241,.14)", borderRadius:18, padding:"16px 18px" },
  label: { fontSize:14, opacity:.9 },
  val: { fontSize:32, fontWeight:800 },
  btnRow: { display:"flex", gap:16, flexWrap:"wrap", margin:"14px 0 24px" },
  btn: { background:"#eaf6f1", color:"#0b0f0e", border:"none", borderRadius:14, padding:"12px 18px", fontWeight:700, cursor:"pointer" },
  note: { opacity:.8, lineHeight:1.5 },
  chatBox: { marginTop:28, background:"rgba(234,246,241,.05)", border:"1px solid rgba(234,246,241,.12)", borderRadius:18, padding:16 },
  messages: { height:260, overflowY:"auto", padding:12, background:"rgba(234,246,241,.03)", borderRadius:12, border:"1px solid rgba(234,246,241,.08)", marginBottom:12 },
  msgUser: { margin:"8px 0", padding:"10px 12px", background:"#19322a", borderRadius:12, maxWidth:"85%" },
  msgBot:  { margin:"8px 0", padding:"10px 12px", background:"#14201c", borderRadius:12, maxWidth:"85%" },
  chatRow: { display:"flex", gap:10 },
  input: { flex:1, padding:"12px 14px", borderRadius:12, border:"1px solid rgba(234,246,241,.22)", background:"transparent", color:"#eaf6f1", outline:"none" },
};

export default function Plant() {
  const [hydr, setHydr] = useState(70);
  const [food, setFood] = useState(40);
  const [clean, setClean] = useState(80);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  const bump = (setter, by=5) => setter(v => Math.min(100, v + by));
  const addXp = (by=5) => {
    setXp(x => {
      const nx = x + by;
      if (nx >= level * 25) { setLevel(l => l + 1); return 0; }
      return nx;
    });
  };

  // CHAT
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Ahoj, som Greenbuddy. Ako sa má tvoja rastlinka? 🌿" }
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const sendMsg = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next })
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json(); // { reply: "..." }
      setMessages(m => [...m, { role: "assistant", content: data.reply ?? "🤖 (prázdna odpoveď)" }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Ups, nepodarilo sa získať odpoveď. Skús znova." }]);
    } finally {
      setSending(false);
    }
  };

  const onKey = (e) => { if (e.key === "Enter") sendMsg(); };

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <header style={s.header}>
          <div style={s.brand}>
            <span style={{fontSize:30}}>🌱</span> Greenbuddy
          </div>
          <Link href="/" style={{color:"#a9f5d0", textDecoration:"underline"}}>Home</Link>
        </header>

        <h1 style={s.h1}>Virtuálna rastlinka</h1>

        <div style={s.grid}>
          <div style={s.stat}><div style={s.label}>Hydratácia</div><div style={s.val}>{hydr}</div></div>
          <div style={s.stat}><div style={s.label}>Výživa</div><div style={s.val}>{food}</div></div>
          <div style={s.stat}><div style={s.label}>Čistota</div><div style={s.val}>{clean}</div></div>
          <div style={s.stat}><div style={s.label}>XP</div><div style={s.val}>{xp}</div></div>
          <div style={s.stat}><div style={s.label}>Level</div><div style={s.val}>{level}</div></div>
        </div>

        <div style={s.btnRow}>
          <button style={s.btn} onClick={() => { bump(setHydr, 8); addXp(6); }}>Poliať</button>
          <button style={s.btn} onClick={() => { bump(setFood, 7); addXp(6); }}>Hnojiť</button>
          <button style={s.btn} onClick={() => { bump(setClean, 6); addXp(5); }}>Postrek</button>
          <button style={s.btn} onClick={() => { bump(setHydr, 4); bump(setFood, 4); bump(setClean, 4); addXp(10); }}>Presadiť</button>
        </div>

        <p style={s.note}>
          Toto je demo ovládanie rastlinky. Nižšie je chat s AI napojený na <code>/api/chat</code>.
        </p>

        {/* CHAT */}
        <div style={s.chatBox}>
          <div style={{fontWeight:800, marginBottom:8}}>Chat s Greenbuddy 🤖</div>
          <div style={s.messages} id="messages">
            {messages.map((m, i) => (
              <div key={i} style={m.role === "user" ? s.msgUser : s.msgBot}>
                <b>{m.role === "user" ? "Ty:" : "Bot:"}</b> {m.content}
              </div>
            ))}
          </div>
          <div style={s.chatRow}>
            <input
              style={s.input}
              placeholder="Napíš správu…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
            />
            <button style={s.btn} onClick={sendMsg} disabled={sending}>
              {sending ? "Posielam…" : "Odoslať"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
