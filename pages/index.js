import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [err, setErr] = useState("");

  function startApp() { router.push("/app"); }
  function adminLogin(e) {
    e.preventDefault();
    const ok = adminUser.trim().toLowerCase() === "admin" && adminPass === "admin";
    if (ok) {
      try { localStorage.setItem("gb_admin", "true"); } catch {}
      router.push("/admin");
    } else {
      setErr("Falsche Admin-Daten.");
      setTimeout(() => setErr(""), 1500);
    }
  }

  return (
    <>
      <Head><title>Greenbuddy – Dein Pflanzen-Tamagotchi</title></Head>
      <div style={{minHeight:"100vh",background:"linear-gradient(180deg,#0b1210,#0f1714)",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
        <div style={{width:"100%",maxWidth:720,background:"#0f1714",color:"#f5fff8",borderRadius:16,border:"1px solid #1b2a24",boxShadow:"0 20px 60px rgba(0,0,0,.35)",padding:24}}>
          <div style={{display:"grid",gridTemplateColumns:"1.2fr .8fr",gap:16,alignItems:"center"}}>
            <div>
              <h1 style={{margin:"4px 0 8px",fontSize:44,fontWeight:800}}>🌿 Greenbuddy</h1>
              <p style={{opacity:.9,lineHeight:1.5}}>Pflanzen-Tamagotchi: gießen, düngen, umtopfen, sprühen – Greenbuddy reagiert, wächst und <b>spricht</b>.</p>
              <div style={{display:"flex",gap:12,marginTop:16}}>
                <button onClick={startApp} style={{background:"#11a26f",color:"#fff",fontWeight:800,padding:"12px 16px",border:"none",borderRadius:12,cursor:"pointer"}}>▶️ Start</button>
                <a href="/app" style={{textDecoration:"none",color:"#bfe9d5",padding:"12px 16px",border:"1px solid #25463a",borderRadius:12}}>Ohne Anmeldung fortfahren</a>
              </div>
            </div>
            <div style={{height:300,borderRadius:14,background:"linear-gradient(180deg,#0f1f19,#0a1512)",display:"grid",placeItems:"center",overflow:"hidden"}}>
              <img src="/monstera.svg" alt="Greenbuddy" style={{width:280,height:280,animation:"sway 3.8s ease-in-out infinite",transformOrigin:"50% 80%"}}/>
            </div>
          </div>
          <div style={{marginTop:18,paddingTop:18,borderTop:"1px solid #182620"}}>
            <h3 style={{margin:"0 0 8px"}}>Kurzes Tutorial</h3>
            <ul style={{margin:0,paddingLeft:18,opacity:.95}}>
              <li>Tippe auf Gießen/Düngen/Umtopfen/Sprühen – XP & Level steigen.</li>
              <li>Im Chat kannst du Fragen zur Pflege stellen.</li>
            </ul>
          </div>
          <div style={{marginTop:22,paddingTop:16,borderTop:"1px dashed #214235"}}>
            <details>
              <summary style={{cursor:"pointer",color:"#9ab3a6"}}>🔒
