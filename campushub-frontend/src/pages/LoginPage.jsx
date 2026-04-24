import { useState } from "react";
import axios from "axios";

function LoginPage({ onLoginSuccess }) {
  const colors = {
    primary: "#0f2747",
    secondary: "#1f3c68",
    background: "#f5f7fb",
    card: "#ffffff",
    text: "#1c2430",
    muted: "#6b7280",
    border: "#d9e1ec",
    error: "#b42318",
    success: "#027a48",
  };

  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: `1px solid ${colors.border}`,
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
    background: "white",
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      if (response.data.role) {
        onLoginSuccess(response.data);
      } else {
        setMessage(response.data);
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Login request failed");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
       
      });

      setMessage(response.data);
      setMessageType(response.data.includes("successfully") ? "success" : "error");

      if (response.data.includes("successfully")) {
        setIsRegisterMode(false);
        setRegisterUsername("");
        setRegisterEmail("");
        setRegisterPassword("");
     
      }
    } catch (error) {
      setMessage("Registration request failed");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 8px 24px rgba(15,39,71,0.08)",
        }}
      >
        <div style={{ marginBottom: "24px", textAlign: "center" }}>
          <h1 style={{ margin: 0, color: colors.primary }}>CampusHub</h1>
          <p style={{ marginTop: "8px", color: colors.muted, fontSize: "14px" }}>
            Uskudar University Smart Campus Management Platform
          </p>
        </div>

        <h2 style={{ marginBottom: "18px", color: colors.secondary }}>
          {isRegisterMode ? "Create Account" : "Sign In"}
        </h2>

        {message && (
          <div
            style={{
              marginBottom: "16px",
              padding: "12px",
              borderRadius: "10px",
              fontSize: "14px",
              background: messageType === "success" ? "#ecfdf3" : "#fef3f2",
              color: messageType === "success" ? colors.success : colors.error,
              border: `1px solid ${
                messageType === "success" ? "#abefc6" : "#fecdca"
              }`,
            }}
          >
            {message}
          </div>
        )}

        {isRegisterMode ? (
          <>
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={registerUsername}
                onChange={(event) => setRegisterUsername(event.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={registerEmail}
                onChange={(event) => setRegisterEmail(event.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={registerPassword}
                onChange={(event) => setRegisterPassword(event.target.value)}
                style={inputStyle}
              />
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                background: colors.primary,
                color: "white",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            <p
              onClick={() => {
                setIsRegisterMode(false);
                setMessage("");
              }}
              style={{
                marginTop: "18px",
                fontSize: "14px",
                color: colors.muted,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Already have an account? Sign In
            </p>
          </>
        ) : (
          <>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                style={inputStyle}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                background: colors.primary,
                color: "white",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p
              onClick={() => {
                setIsRegisterMode(true);
                setMessage("");
              }}
              style={{
                marginTop: "18px",
                fontSize: "14px",
                color: colors.muted,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Do not have an account? Register
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
