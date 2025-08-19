import Link from "next/link";

export default function PlantPage() {
  return (
    <main style={{maxWidth:880, margin:"0 auto", padding:"24px 16px", color:"#e9f0ec"}}>
      <header style={{display:"flex", justifyContent:"flex-end", marginBottom:12}}>
        <Link href="/">Home</Link>
      </header>

      <h1>Virtuálna rastlinka</h1>

      {/* >>>>>>>>>>> SVG DEMO <<<<<<<<<< */}
      <h2 style={{marginTop:8}}>SVG DEMO ⬇️</h2>
      <div style={{border:"1px dashed #555", padding:16, margin:"12px 0"}}>
        <svg width="160" height="120" viewBox="0 0 160 120" role="img" aria-label="Test SVG">
          <rect x="10" y="10" width="140" height="100" fill="red" />
        </svg>
      </div>

      <p style={{opacity:.8}}>
        Ak nevidíš červený štvorec vyššie, beží stará verzia – pozri nižšie “Ako overiť nasadenie”.
      </p>
    </main>
  );
}
