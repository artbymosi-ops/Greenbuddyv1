// KRAJŠIA MONSTERA S MOODOM, RASTOM A ŠKODCAMI
import { useMemo } from "react";

export default function Plant({
  water=80, food=70, spray=60,
  pests=10, disease=0, level=1, mood="ok"
}) {
  // normalizácie
  const clamp = (n, lo=0, hi=100) => Math.max(lo, Math.min(hi, n));
  water = clamp(water); food = clamp(food); spray = clamp(spray);
  pests = clamp(pests); disease = clamp(disease);
  level = Math.max(1, level);

  // stage podľa levelu
  const stage = level <= 2 ? 1 : level <= 4 ? 2 : 3;

  // farby podľa „zdravia“
  const stress = Math.max(pests/100, disease/100);           // 0–1
  const vigor  = (water + food + spray) / 300;                // 0–1
  const sat    = Math.max(0.25, 0.7 * (1 - stress) * (0.6 + 0.6*vigor));
  const light  = 0.32 + 0.12 * vigor;                         // 0.32–0.44
  const leaf = `hsl(140 ${Math.round(sat*100)}% ${Math.round(light*100)}%)`;
  const stem = `hsl(140 ${Math.round(Math.max(20, sat*80))}% 28%)`;

  // mood -> sklon, dýchanie
  const lean =
    mood === "sick" ? 8 :
    mood === "sad"  ? 5 :
    mood === "happy"? -2 : 0;

  const scale = 0.9 + Math.min(level, 6) * 0.08;             // rast

  // listová plocha podľa výživy
  const leafScale = 0.8 + food/100 * 0.45;

  // fenestrácie (dierky) rastú so stage
  const fen = stage === 1 ? 0 : stage === 2 ? 0.4 : 0.8;      // 0–0.8

  // pomocné tvary listov (ľavý, pravý, horný)
  const Leaf = ({ x, y, r=26, flip=false, rotate=0 }) => (
    <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${flip?-1:1},1)`}>
      <path d={`
        M 0 ${-r}
        C ${r*0.9} ${-r*0.8}, ${r*1.1} ${-r*0.2}, ${r*0.9} ${r*0.4}
        C ${r*0.6} ${r*1.0}, ${r*0.2} ${r*1.2}, 0 ${r}
        C ${-r*0.2} ${r*1.2}, ${-r*0.6} ${r*1.0}, ${-r*0.9} ${r*0.4}
        C ${-r*1.1} ${-r*0.2}, ${-r*0.9} ${-r*0.8}, 0 ${-r}
        Z
      `}
        fill={leaf} stroke={`rgba(0,0,0,0.15)`} strokeWidth="1.5"
        style={{ transition: "fill 400ms ease" }}
      />
      {/* fenestrácie (jednoduché „výrezy“) */}
      {fen > 0 && (
        <>
          <path d={`M ${r*0.2} ${-r*0.2} c ${r*0.2} ${r*0.1}, ${r*0.15} ${r*0.35}, 0 ${r*0.6}`}
                fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth={fen*2}/>
          <path d={`M ${-r*0.1} ${-r*0.1} c ${r*0.1} ${r*0.15}, ${r*0.1} ${r*0.35}, 0 ${r*0.5}`}
                fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth={fen*1.6}/>
        </>
      )}
    </g>
  );

  // škodcovia – malé „pakomáre“ okolo listov pri vysokom pests
  const Bugs = () => {
    if (pests < 25) return null;
    const n = Math.min(8, Math.round(pests/12)); // 2..8
    return (
      <g opacity={0.6}>
        {Array.from({length:n}).map((_,i)=>(
          <circle key={i} cx={80 + Math.sin(i*1.7)*30} cy={70 + Math.cos(i*2.2)*20} r="2"
                  fill="#ffd166">
            <animate attributeName="cy" dur={`${2+i%3}s`} values="68;72;68" repeatCount="indefinite"/>
          </circle>
        ))}
      </g>
    );
  };

  // choroba – fľaky na listoch
  const Spots = () => {
    if (disease < 20) return null;
    const n = Math.min(6, Math.round(disease/15));
    return (
      <g opacity={0.35}>
        {Array.from({length:n}).map((_,i)=>(
          <circle key={i} cx={100 + (i-2)*8} cy={95 + (i%3)*6} r="3" fill="#4b3d2a"/>
        ))}
      </g>
    );
  };

  return (
    <svg viewBox="0 0 200 200" width="320" height="320" role="img" aria-label="Monstera"
         style={{ display:"block", margin:"0 auto" }}>
      {/* tieň */}
      <ellipse cx="100" cy="174" rx={52*scale} ry="10" fill="black" opacity="0.22" />

      {/* kvetináč */}
      <g transform={`translate(0, 10) scale(${scale})`}>
        <rect x="50" y="120" width="100" height="36" rx="10" fill="#6b4a33"/>
        <rect x="44" y="114" width="112" height="10" rx="6" fill="#8b5a3a"/>
      </g>

      {/* stonka + listy (sklon podľa moodu) */}
      <g transform={`rotate(${lean}, 100, 120)`} style={{ transition:"transform 400ms ease" }}>
        {/* stonka */}
        <rect x="98" y="80" width="4" height="70" rx="2" fill={stem}/>

        {/* listy – layout podľa stage, veľkosť podľa výživy */}
        <g transform={`translate(0,0) scale(${leafScale})`} style={{ transition:"transform 400ms ease" }}>
          {/* stage 1: 2 listy */}
          {stage >= 1 && (
            <>
              <Leaf x={78} y={100} r={24} rotate={-14}/>
              <Leaf x={122} y={104} r={22} flip rotate={10}/>
            </>
          )}
          {/* stage 2: tretí list */}
          {stage >= 2 && <Leaf x={100} y={88} r={26} rotate={0}/>}
          {/* stage 3: veľký horný + menší bočný */}
          {stage >= 3 && (
            <>
              <Leaf x={95} y={80} r={30} rotate={-4}/>
              <Leaf x={135} y={92} r={20} flip rotate={12}/>
            </>
          )}
        </g>

        {/* vizuálne efekty */}
        <Bugs/>
        <Spots/>
      </g>
    </svg>
  );
}
