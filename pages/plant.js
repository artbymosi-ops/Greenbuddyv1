import Plant from "../components/Plant";

export default function PlantPage() {
  // predpokladám, že tieto hodnoty už máš v state `stats`
  // napr. const [stats, setStats] = useState({ water: 100, food: 60, clean: 90, xp: 52, level: 1 });

  const stats = typeof window !== "undefined" && window.__GB_STATS
    ? window.__GB_STATS
    : { water: 100, food: 60, clean: 90, xp: 52, level: 1 };

  return (
    <main className="wrap">
      {/* ...tvoja hlavička... */}

      <section style={{ paddingTop: 24, paddingBottom: 8 }}>
        <Plant
          water={stats.water}
          food={stats.food}
          clean={stats.clean}
          level={stats.level}
        />
      </section>

      {/* ...indikátory/štatistiky a tlačidlá... */}
    </main>
  );
}
import VoiceAssistant from "../components/VoiceAssistant";
import { diagnose } from "../lib/diagnostics";

function formatDiag(stats) {
  return diagnose(stats).join(" ");
}

export default function PlantPage() {
  // ... ako vyššie
  const [messages, setMessages] = useState([]);

  const handleAsk = async (text, speak) => {
    // 1) lokálna diagnostika
    const local = formatDiag(stats);

    // 2) jednoduchá heuristika – ak používateľ sa pýta všeobecne, stačí lokálne
    if (/ako|čo|prečo|škodc/i.test(text)) {
      setMessages(m => [...m, {role:"user", text}, {role:"assistant", text: local}]);
      speak?.(local);
      return;
    }

    // 3) inak (voliteľne) pošli na existujúci /api/chat a odpoveď prehraj
    try {
      const res = await fetch("/api/chat", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ message: text, context: stats })
      });
      const data = await res.json();
      const reply = data.reply || local;
      setMessages(m => [...m, {role:"user", text}, {role:"assistant", text: reply}]);
      speak?.(reply);
    } catch {
      setMessages(m => [...m, {role:"user", text}, {role:"assistant", text: local}]);
      speak?.(local);
    }
  };

  return (
    <main className="wrap">
      {/* ... */}
      <Plant {...stats} />
      <VoiceAssistant onAsk={handleAsk} />

      {/* jednoduchý chat pod tým (ak chceš): */}
      <div style={{maxWidth:560, margin:"16px auto"}}>
        <ul style={{listStyle:"none", padding:0}}>
          {messages.map((m,i)=>(
            <li key={i} style={{margin:"8px 0"}}>
              <b>{m.role==="user"?"Ty":"AI"}: </b>{m.text}
            </li>
          ))}
        </ul>
        <form onSubmit={(e)=>{
          e.preventDefault();
          const q = e.target.q.value.trim();
          if (!q) return;
          handleAsk(q);
          e.target.reset();
        }}>
          <input name="q" placeholder="Napíš otázku..." style={{width:"75%"}} />
          <button type="submit">Poslať</button>
        </form>
      </div>
    </main>
  );
                        }
