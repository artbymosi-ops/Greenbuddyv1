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
