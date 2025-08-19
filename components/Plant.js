// components/Plant.js
import { useMemo } from "react";

export default function Plant({ hydration, nutrition, cleanliness }) {
  // Vypočítame „zdravie“ (0–100)
  const health = useMemo(() => {
    const vals = [hydration, nutrition, cleanliness];
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [hydration, nutrition, cleanliness]);

  // Odvodíme vizuálny stav
  const tilt = useMemo(() => {
    // čím nižšie zdravie, tým väčší náklon (do -18°)
    return -18 + (health / 100) * 18;
  }, [health]);

  const brightness = useMemo(() => {
    // 0.8–1.1 (tmavšie keď je zle)
    return 0.8 + (health / 100) * 0.3;
  }, [health]);

  const saturation = useMemo(() => {
    // 0.7–1.2
    return 0.7 + (health / 100) * 0.5;
  }, [health]);

  const drop = useMemo(() => {
    // jemný „pokles“ listov pri zlom stave
    return (100 - health) * 0.08; // px
  }, [health]);

  const face = health >= 70 ? "😊" : health >= 40 ? "😕" : "🥀";

  return (
    <div style={{ display: "grid", placeItems: "center", margin: "28px 0" }}>
      <div
        style={{
          width: 220,
          height: 220,
          transition: "transform .6s ease, filter .6s ease",
          transform: `translateY(${drop}px) rotate(${tilt}deg)`,
          filter: `saturate(${saturation}) brightness(${brightness})`,
        }}
        aria-label={`Gesundheit: ${health}%`}
      >
        {/* Použijeme SVG v /public/monstera.svg */}
        <img
          src="/monstera.svg"
          alt="Monstera-Pflanze"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div
        style={{
          fontSize: 18,
          opacity: 0.85,
          marginTop: 8,
          transition: "opacity .3s",
        }}
      >
        Zustand: <strong>{health}%</strong> {face}
      </div>
    </div>
  );
}
