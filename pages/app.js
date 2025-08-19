import { useEffect, useState } from "react";

export default function AppPage(){
  const [s,setS]=useState({hydration:70,nutrition:40,cleanliness:80,xp:0,level:1,pests:0,mood:80});
  const clamp=(v,min=0,max=100)=>Math.max(min,Math.min(max,v));
  const mood=(st)=>clamp(0.35*st.hydration + 0.2*st.nutrition + 0.1*st.cleanliness + 34);

  useEffect(()=>{
    const id=setInterval(()=>{
      setS(st=>{
        const n={...st};
        n.hydration=clamp(n.hydration-0.05);
        n.nutrition=clamp(n.nutrition-0.02);
        n.cleanliness=clamp(n.cleanliness-0.03);
        if(n.xp>=n.level*20) n.level++;
        n.mood=mood(n);
        return n;
      });
    },500);
    return ()=>clearInterval(id);
  },[]);

  function act(kind){
    setS(st=>{
      const n={...st};
      if(kind==='water') n.hydration=clamp(n.hydration+20);
      if(kind==='fert')  n.nutrition=clamp(n.nutrition+15);
      if(kind==='spray'){ n.cleanliness=clamp(n.cleanliness+10); n.pests=Math.max(0,n.pests-2); }
      if(kind==='repot'){ n.cleanliness=clamp(n.cleanliness+5); n.nutrition=clamp(n.nutrition+10); }
      n.xp+=4; n.mood=mood(n);
      return n;
    });
  }

  // chat
  const [msgs,setMsgs]=useState([]);
  const [tts,setTts]=useState(true);
  async function ask(q){
    if(!q) return;
    setMsgs(m=>[...m,{me:true,t:q}]);
    const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,stats:s})});
    const j=await res.json();
    const reply=j.reply || 'Bitte nochmal fragen.';
    setMsgs(m=>[...m,{me:false,t:reply}]);
    if(tts && typeof window!=='undefined' && 'speechSynthesis' in window){
      const u=new SpeechSynthesisUtterance(reply); u.lang='de-DE'; speechSynthesis.speak(u);
    }
  }

  return (
    <div className="container">
      <div className="top">
        <h1 style={{fontFamily:'Chewy, cursive'}}>Greenbuddy 🌿</h1>
        <label style={{display:'flex',alignItems:'center',gap:6}}>
          <input type="checkbox" checked={tts} onChange={e=>setTts(e.target.checked)} />
          Antworten vorlesen
        </label>
      </div>

      <div className="card">
        <div className="plant-stage">
          <img className="plant" src="/monstera.svg" alt="plant"/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginTop:12}}>
          <button className="btn" onClick={()=>act('water')}>Gießen</button>
          <button className="btn" onClick={()=>act('fert')}>Düngen</button>
          <button className="btn" onClick={()=>act('repot')}>Umtopfen</button>
          <button className="btn" onClick={()=>act('spray')}>Sprühen</button>
        </div>
        <div className="stats">
          <div className="stat"><span>Hydration</span><b>{s.hydration.toFixed(0)}</b></div>
          <div className="stat"><span>Nahrung</span><b>{s.nutrition.toFixed(0)}</b></div>
          <div className="stat"><span>Sauberkeit</span><b>{s.cleanliness.toFixed(0)}</b></div>
          <div className="stat"><span>XP</span><b>{s.xp.toFixed(0)}</b></div>
          <div className="stat"><span>Level</span><b>{s.level}</b></div>
          <div className="stat"><span>Stimmung</span><b>{s.mood.toFixed(0)}%</b></div>
        </div>
      </div>

      <div className="card">
        <h2>Frag Greenbuddy 💬</h2>
        <div className="chat">
          {msgs.map((m,i)=>(<div key={i} className={'msg '+(m.me?'you':'')}>
            <div className={'bubble '+(m.me?'user':'ai')}>{m.t}</div>
          </div>))}
        </div>
        <form className="form-row" onSubmit={(e)=>{e.preventDefault(); const inp=e.target.q; ask(inp.value.trim()); inp.value='';}}>
          <input name="q" placeholder="z. B. Meine Blätter werden gelb – was tun?" />
          <button className="btn">Senden</button>
        </form>
      </div>
    </div>
  );
}
