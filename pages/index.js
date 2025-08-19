// pages/index.js
import { useState } from "react";

export default function Home() {
  const [adminName, setAdminName] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminName.trim().toLowerCase() === "admin" && adminPass === "admin") {
      // jednoduché demo overenie
      localStorage.setItem("gb_admin", "true");
      window.location.href = "/admin";
    } else {
      setError("Nesprávne údaje.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0c1012", color: "#fff",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", padding: "40px 16px" }}>
      <h1 style={{ fontSize: 40, margin: 0 }}>🌱 Welcome to <b>Greenbuddy</b></h1>

      <button
        style={{ marginTop: 24, padding: "12px 28px", fontSize: 18, borderRadius: 10,
                 border: "1px solid #ccc", background: "#fff", color: "#111", cursor: "pointer" }}
        onClick={() => (window.location.href = "/app")}
      >
        Start
      </button>

      <div style={{ marginTop: 36, width: "100%", maxWidth: 420 }}>
        <details>
          <summary style={{ cursor: "pointer", fontSize: 18 }}>Admin Login</summary>
          <form onSubmit={handleAdminLogin} style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <input
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              placeholder="Admin"
              style={{ padding: 10, borderRadius: 8, border: "1px solid #444", background: "#0f1417", color: "#fff" }}
            />
            <input
              type="password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              placeholder="Password"
              style={{ padding: 10, borderRadius: 8, border: "1px solid #444", background: "#0f1417", color: "#fff" }}
            />
            {error && <div style={{ color: "#ff7474", fontSize: 14 }}>{error}</div>}
            <button type="submit" style={{ padding: "10px 16px", borderRadius: 8, cursor: "pointer" }}>
              Login
            </button>
          </form>
        </details>
      </div>
    </div>
  );
}
