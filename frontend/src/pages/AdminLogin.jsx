import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/admin", { replace: true });
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg,#1A0D00,#3D1F00)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
    }}>
      <div style={{
        background: "#FDF8F0", width: "100%", maxWidth: "420px",
        border: "1px solid rgba(201,150,63,0.3)"
      }}>
        <div style={{ background: "#1A0D00", padding: "1.5rem", textAlign: "center" }}>
          <h1 style={{ fontFamily: "Georgia,serif", color: "#E8C97A", fontSize: "1.5rem", margin: 0 }}>
            Kalapriya Admin
          </h1>
          <p style={{ color: "#C9963F", fontSize: "0.7rem", letterSpacing: "0.2em", margin: "0.3rem 0 0", textTransform: "uppercase" }}>
            Event Management Portal
          </p>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {error && (
            <div style={{ background: "rgba(181,69,75,0.1)", border: "1px solid rgba(181,69,75,0.3)", color: "#B5454B", padding: "0.75rem", fontSize: "0.85rem", textAlign: "center" }}>
              {error}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7A6A" }}>Username</label>
            <input
              value={username} onChange={e => setUsername(e.target.value)}
              placeholder="Admin username" required autoFocus
              style={{ padding: "0.75rem 1rem", border: "1px solid rgba(201,150,63,0.3)", background: "white", fontFamily: "inherit", fontSize: "0.9rem", outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7A6A" }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Admin password" required
              style={{ padding: "0.75rem 1rem", border: "1px solid rgba(201,150,63,0.3)", background: "white", fontFamily: "inherit", fontSize: "0.9rem", outline: "none" }}
            />
          </div>
          <button
            type="submit" disabled={loading}
            style={{
              padding: "1rem", background: loading ? "#8A7A6A" : "#1A0D00", color: "#E8C97A",
              border: "none", fontFamily: "inherit", fontSize: "0.85rem", fontWeight: "600",
              letterSpacing: "0.15em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer",
              marginTop: "0.5rem"
            }}
          >
            {loading ? "Verifying..." : "Login to Dashboard"}
          </button>
          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#8A7A6A" }}>
            <a href="/" style={{ color: "#C9963F", textDecoration: "none" }}>← Back to Website</a>
          </p>
        </form>
      </div>
    </div>
  );
}
