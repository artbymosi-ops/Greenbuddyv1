import { useEffect, useRef, useState } from "react";

export default function VoiceAssistant({ onAsk }) {
  const [listening, setListening] = useState(false);
  const recRef = useRef(null);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "sk-SK";
    window.speechSynthesis.speak(u);
  };

  const start = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { speak("Prepáč, hlasové ovládanie nie je podporované."); return; }
    const rec = new SR();
    rec.lang = "sk-SK"; rec.interimResults = false; rec.continuous = false;
    rec.onresult = (e) => {
      const q = e.results[0][0].transcript;
      onAsk(q, speak);  // pošli otázku do chatu/diagnostiky
    };
    rec.onend = ()=>setListening(false);
    rec.start(); setListening(true); recRef.current = rec;
  };

  useEffect(()=>()=>recRef.current?.abort(), []);

  return (
    <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:12 }}>
      <button onClick={start}>{listening ? "Počúvam…" : "🎙️ Spýtať sa hlasom"}</button>
      <button onClick={()=>speak("Ahoj! Som Greenbuddy. Povedz: ako sa má monstera?")}>🔊 Vypýtať radu</button>
    </div>
  );
}
