function RegisterPage() {
  const colors = {
    primary: "#0f2747",
    secondary: "#1f3c68",
    accent: "#c8a96b",
    background: "#f5f7fb",
    card: "#ffffff",
    text: "#1c2430",
    muted: "#6b7280",
    border: "#d9e1ec",
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

        <h2 style={{ marginBottom: "18px", color: colors.secondary }}>Create Account</h2>

        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: colors.text }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: `1px solid ${colors.border}`,
              outline: "none",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: colors.text }}>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: `1px solid ${colors.border}`,
              outline: "none",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: colors.text }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: `1px solid ${colors.border}`,
              outline: "none",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: colors.text }}>
            Role
          </label>
          <select
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: `1px solid ${colors.border}`,
              outline: "none",
              fontSize: "14px",
              boxSizing: "border-box",
              background: "white",
            }}
          >
            <option>STUDENT</option>
            <option>ADVISOR</option>
            <option>ADMIN</option>
          </select>
        </div>

        <button
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
          }}
        >
          Register
        </button>

        <p style={{ marginTop: "18px", fontSize: "14px", color: colors.muted, textAlign: "center" }}>
          Already have an account? Sign In
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
