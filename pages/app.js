export default function AppTest() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#ff0077",
      color: "white",
      display: "grid",
      placeItems: "center",
      fontFamily: "system-ui"
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 44, fontWeight: 900 }}>APP TEST V4 💥</div>
        <div style={{ marginTop: 8, opacity: .9 }}>
          {new Date().toISOString()}
        </div>
        <p style={{ marginTop: 16 }}>Ak toto VIDÍŠ na /app, build a doména sú OK.</p>
      </div>
    </div>
  );
}
