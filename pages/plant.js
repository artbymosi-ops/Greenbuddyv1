export default function PlantTest() {
  return (
    <div style={{minHeight:"100vh",background:"#0b0b0b",color:"#7CFC00",display:"grid",placeItems:"center",fontFamily:"system-ui"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:36,fontWeight:800}}>PLANT TEST v3 ✅</div>
        <div style={{marginTop:12,opacity:.8}}>TS: {new Date().toISOString()}</div>
        <div style={{marginTop:24,fontSize:14,opacity:.7}}>/plant route živá = uvidíš zelený text</div>
      </div>
    </div>
  );
}
