export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌱 Welcome to Greenbuddy</h1>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer"
        }}
        onClick={() => (window.location.href = "/app")}
      >
        Start
      </button>

      <div style={{ marginTop: "40px" }}>
        <details>
          <summary style={{ cursor: "pointer" }}>Admin Login</summary>
          <form style={{ marginTop: "10px" }}>
            <input type="text" placeholder="Admin" /><br />
            <input type="password" placeholder="Password" /><br />
            <button type="submit">Login</button>
          </form>
        </details>
      </div>
    </div>
  );
}
