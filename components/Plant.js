// jednoduché prepojenie vzhľadu s props
export default function Plant({ water = 100, food = 100, clean = 100, level = 1 }) {
  // normalizácie
  const clamp = (n, lo=0, hi=100) => Math.max(lo, Math.min(hi, n));

  water = clamp(water);
  food  = clamp(food);
  clean = clamp(clean);
  level = Math.max(1, level);

  // z parametrov odvodíme vizuál
  const scale = 0.8 + Math.min(level, 5) * 0.1;               // rast s levelom
  const lean  = (50 - water) * 0.3;                           // menej vody -> väčší náklon
  const leafScale = 0.8 + (food / 100) * 0.4;                 // výživa -> väčšie listy
  const green = 90 + Math.round((clean / 100) * 80);          // čistota -> svetlejšia zeleň
  const leafFill = `hsl(140 ${green}% 35%)`;
  const stemFill = `hsl(140 ${green - 10}% 30%)`;

  // tieň pod kvetináčom podľa levelu
  const shadowScale = 0.8 + Math.min(level, 5) * 0.08;

  return (
    <svg viewBox="0 0 200 200" width="260" height="260" role="img" aria-label="Rastlinka"
         style={{ display: "block", margin: "0 auto" }}>
      {/* tieň */}
      <ellipse cx="100" cy="165" rx={55 * shadowScale} ry="10" fill="black" opacity="0.25" />

      {/* kvetináč */}
      <g transform={`translate(0, ${10}) scale(${scale})`}>
        <rect x="50" y="120" width="100" height="35" rx="10" fill="#6b4a33" />
        <rect x="42" y="115" width="116" height="10" rx="6" fill="#8b5a3a" />
      </g>

      {/* stonka + listy */}
      <g transform={`translate(0,0) rotate(${lean}, 100, 120)`} style={{ transition: "transform 400ms ease" }}>
        {/* stonka */}
        <rect x="98" y="80" width="4" height="70" rx="2" fill={stemFill}
              style={{ transition: "fill 400ms ease" }} />

        {/* listy – škálujeme podľa výživy */}
        <g transform={`translate(0,0) scale(${leafScale})`} style={{ transition: "transform 400ms ease" }}>
          <circle cx="80" cy="90" r="22" fill={leafFill} style={{ transition: "fill 400ms ease" }} />
          <circle cx="122" cy="98" r="20" fill={leafFill} style={{ transition: "fill 400ms ease" }} />
        </g>
      </g>
    </svg>
  );
}
