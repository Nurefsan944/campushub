import { useEffect, useState } from "react";
import axios from "axios";

function DashboardPage({ user, onLogout }) {
  const colors = {
    navy: "#0f2747",
    bg: "#f4f7fb",
    card: "#ffffff",
    border: "#d9e1ec",
    text: "#1c2430",
    muted: "#667085",
    red: "#b42318",
    green: "#027a48",
  };

  const [activePage, setActivePage] = useState("dashboard");

  const [announcements, setAnnouncements] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [advisorId, setAdvisorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [message, setMessage] = useState("");

  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [notice, setNotice] = useState("");

  const advisors = users.filter((item) => item.role === "ADVISOR");
  const pendingRequests = requests.filter((item) => item.status === "PENDING").length;

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

  const buttonStyle = {
    padding: "10px 14px",
    border: "none",
    borderRadius: "10px",
    background: colors.navy,
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  };

  const dangerButton = {
    ...buttonStyle,
    background: colors.red,
  };

  const secondaryButton = {
    padding: "10px 14px",
    borderRadius: "10px",
    border: `1px solid ${colors.border}`,
    background: "white",
    color: colors.navy,
    cursor: "pointer",
    fontWeight: "600",
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "announcements", label: "Announcements" },
    { key: "requests", label: "Requests", hidden: user.role === "ADMIN" },
    { key: "admin", label: "Admin Panel", hidden: user.role !== "ADMIN" },
    { key: "profile", label: "Profile" },
  ].filter((item) => !item.hidden);

  const fetchAnnouncements = () => {
    axios.get("http://localhost:8080/api/announcements").then((res) => {
      setAnnouncements(res.data);
    });
  };

  const fetchCategories = () => {
    axios.get("http://localhost:8080/api/categories").then((res) => {
      setCategories(res.data);
    });
  };

  const fetchUsers = () => {
    const url =
      user.role === "ADMIN"
        ? "http://localhost:8080/api/auth/users"
        : "http://localhost:8080/api/auth/advisors";

    axios.get(url).then((res) => {
      setUsers(res.data);
    });
  };

  const fetchRequests = () => {
    let url = "";

    if (user.role === "STUDENT") {
      url = `http://localhost:8080/api/requests/student/${user.id}`;
    }

    if (user.role === "ADVISOR") {
      url = `http://localhost:8080/api/requests/advisor/${user.id}`;
    }

    if (user.role === "ADMIN") {
      url = "http://localhost:8080/api/requests";
    }

    if (!url) return;

    axios.get(url).then((res) => {
      setRequests(res.data);
    });
  };

  useEffect(() => {
    fetchAnnouncements();
    fetchCategories();
    fetchUsers();
    fetchRequests();
  }, [user]);

  const handleCreateAnnouncement = async () => {
    if (!announcementTitle || !announcementContent) {
      setNotice("Please fill in all fields");
      return;
    }

    await axios.post("http://localhost:8080/api/announcements", {
      title: announcementTitle,
      content: announcementContent,
    });

    setAnnouncementTitle("");
    setAnnouncementContent("");
    setNotice("Announcement created successfully");
    fetchAnnouncements();
  };

  const handleDeleteAnnouncement = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
if (!confirmed) return;

    await axios.delete(`http://localhost:8080/api/announcements/${id}`);
    setNotice("Announcement deleted successfully");
    fetchAnnouncements();
  };

  const handleCreateCategory = async () => {
    if (!categoryName) {
      setNotice("Please enter a category name");
      return;
    }

    await axios.post("http://localhost:8080/api/categories", {
      name: categoryName,
    });

    setCategoryName("");
    setNotice("Category created successfully");
    fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
if (!confirmed) return; 

    await axios.delete(`http://localhost:8080/api/categories/${id}`);
    setNotice("Category deleted successfully");
    fetchCategories();
  };

  const handleCreateRequest = async () => {
    if (!advisorId || !categoryId || !message) {
      setNotice("Please fill in all fields");
      return;
    }

    await axios.post("http://localhost:8080/api/requests", {
      studentId: user.id,
      advisorId: Number(advisorId),
      categoryId: Number(categoryId),
      message,
    });

    setAdvisorId("");
    setCategoryId("");
    setMessage("");
    setNotice("Advisor request created successfully");
    fetchRequests();
  };

  const handleRequestAction = async (requestId, action) => {
    await axios.put(`http://localhost:8080/api/requests/${requestId}/${action}`);
    setNotice(`Request ${action === "accept" ? "accepted" : "rejected"} successfully`);
    fetchRequests();
  };

  const handleDeleteUser = async (id) => {
    if (id === user.id) {
      setNotice("You cannot delete your own account while logged in");
      return;
    }
    const confirmed = window.confirm("Are you sure you want to delete this item?");
if (!confirmed) return;

    await axios.delete(`http://localhost:8080/api/auth/users/${id}`);
    setNotice("User deleted successfully");
    fetchUsers();
  };

  const handleUpdateUserRole = async (id, role) => {
    await axios.put(`http://localhost:8080/api/auth/users/${id}/role`, { role });
    setNotice("User role updated successfully");
    fetchUsers();
  };

  const statusStyle = (status) => {
    if (status === "ACCEPTED") return { background: "#ecfdf3", color: colors.green };
    if (status === "REJECTED") return { background: "#fef3f2", color: colors.red };
    return { background: "#fffaeb", color: "#b54708" };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        display: "flex",
        fontFamily: "Arial, sans-serif",
        color: colors.text,
      }}
    >
      <aside
        style={{
          width: "260px",
          background: colors.navy,
          color: "white",
          padding: "28px 20px",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "26px" }}>CampusHub</h1>
        <p style={{ marginTop: "8px", fontSize: "13px", opacity: 0.85 }}>
          Smart University Platform
        </p>

        <div style={{ marginTop: "36px", display: "grid", gap: "12px" }}>
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActivePage(item.key);
                setNotice("");
              }}
              style={{
                textAlign: "left",
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                background:
                  activePage === item.key
                    ? "rgba(255,255,255,0.22)"
                    : "rgba(255,255,255,0.08)",
                color: "white",
                cursor: "pointer",
                fontWeight: activePage === item.key ? "700" : "500",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      <div style={{ flex: 1 }}>
        <header
          style={{
            background: "white",
            padding: "20px 32px",
            borderBottom: `1px solid ${colors.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>{pageTitle(activePage, user.role)}</h2>
            <p style={{ margin: "6px 0 0", color: colors.muted }}>
             Modern university communication and management system
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ textAlign: "right" }}>
              <strong>{user.username}</strong>
              <div style={{ fontSize: "12px", color: colors.muted }}>{user.role}</div>
            </div>
            <button onClick={onLogout} style={secondaryButton}>
              Sign Out
            </button>
          </div>
        </header>

        <main style={{ padding: "32px", display: "grid", gap: "24px" }}>
          {notice && (
            <div
              style={{
                background: "#eef4ff",
                border: `1px solid ${colors.border}`,
                color: colors.navy,
                padding: "14px 18px",
                borderRadius: "12px",
              }}
            >
              {notice}
            </div>
          )}

          {activePage === "dashboard" && (
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "18px",
              }}
            >
              {user.role === "ADMIN" && (
                <>
                  <StatCard title="Total Users" value={users.length} colors={colors} />
                  <StatCard title="Announcements" value={announcements.length} colors={colors} />
                  <StatCard title="Categories" value={categories.length} colors={colors} />
                  <StatCard title="Pending Requests" value={pendingRequests} colors={colors} />
                </>
              )}

              {user.role === "STUDENT" && (
                <>
                  <StatCard title="My Requests" value={requests.length} colors={colors} />
                  <StatCard title="Announcements" value={announcements.length} colors={colors} />
                  <StatCard title="Available Advisors" value={advisors.length} colors={colors} />
                  <StatCard title="Request Categories" value={categories.length} colors={colors} />
                </>
              )}

              {user.role === "ADVISOR" && (
                <>
                  <StatCard title="Incoming Requests" value={requests.length} colors={colors} />
                  <StatCard title="Pending Requests" value={pendingRequests} colors={colors} />
                  <StatCard title="Announcements" value={announcements.length} colors={colors} />
                  <StatCard title="Categories" value={categories.length} colors={colors} />
                </>
              )}
            </section>
          )}

          {activePage === "announcements" && (
            <>
              {(user.role === "ADMIN" || user.role === "ADVISOR") && (
                <section style={panel(colors)}>
                  <h3 style={panelTitle(colors)}>Publish Announcement</h3>
                  <div style={{ display: "grid", gap: "12px" }}>
                    <input
                      placeholder="Announcement title"
                      value={announcementTitle}
                      onChange={(e) => setAnnouncementTitle(e.target.value)}
                      style={inputStyle}
                    />
                    <textarea
                      placeholder="Announcement content"
                      value={announcementContent}
                      onChange={(e) => setAnnouncementContent(e.target.value)}
                      style={{ ...inputStyle, minHeight: "90px" }}
                    />
                    <button onClick={handleCreateAnnouncement} style={buttonStyle}>
                      Publish Announcement
                    </button>
                  </div>
                </section>
              )}

              <section style={panel(colors)}>
                <h3 style={panelTitle(colors)}>Latest Announcements</h3>
                <div style={{ display: "grid", gap: "14px" }}>
                  {announcements.map((announcement) => (
                    <div key={announcement.id} style={card(colors)}>
                      <h4 style={{ marginTop: 0 }}>{announcement.title}</h4>
                      <p style={{ color: colors.muted }}>{announcement.content}</p>

                      {user.role === "ADMIN" && (
                        <button
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                          style={dangerButton}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activePage === "requests" && (
            <>
              {user.role === "STUDENT" && (
                <section style={panel(colors)}>
                  <h3 style={panelTitle(colors)}>Create Advisor Request</h3>
                  <div style={{ display: "grid", gap: "12px" }}>
                    <select
                      value={advisorId}
                      onChange={(e) => setAdvisorId(e.target.value)}
                      style={inputStyle}
                    >
                      <option value="">Select advisor</option>
                      {advisors.map((advisor) => (
                        <option key={advisor.id} value={advisor.id}>
                          {advisor.username}
                        </option>
                      ))}
                    </select>

                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      style={inputStyle}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    <textarea
                      placeholder="Request message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ ...inputStyle, minHeight: "90px" }}
                    />

                    <button onClick={handleCreateRequest} style={buttonStyle}>
                      Submit Request
                    </button>
                  </div>
                </section>
              )}

              <section style={panel(colors)}>
                <h3 style={panelTitle(colors)}>
                  {user.role === "STUDENT" ? "My Requests" : "Incoming Requests"}
                </h3>

                <div style={{ display: "grid", gap: "14px" }}>
                  {requests.map((request) => (
                    <div key={request.id} style={card(colors)}>
                      <h4 style={{ marginTop: 0 }}>{request.category?.name}</h4>
                      <p style={{ color: colors.muted }}>{request.message}</p>

                      <span
                        style={{
                          ...statusStyle(request.status),
                          padding: "7px 12px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        {request.status}
                      </span>

                      {user.role === "ADVISOR" && request.status === "PENDING" && (
                        <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                          <button
                            onClick={() => handleRequestAction(request.id, "accept")}
                            style={{ ...buttonStyle, background: colors.green }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRequestAction(request.id, "reject")}
                            style={dangerButton}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activePage === "admin" && user.role === "ADMIN" && (
            <>
              <section style={panel(colors)}>
                <h3 style={panelTitle(colors)}>Category Management</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "12px",
                    marginBottom: "18px",
                  }}
                >
                  <input
                    placeholder="Category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    style={inputStyle}
                  />
                  <button onClick={handleCreateCategory} style={buttonStyle}>
                    Add Category
                  </button>
                </div>

                <div style={{ display: "grid", gap: "10px" }}>
                  {categories.map((category) => (
                    <div key={category.id} style={row(colors)}>
                      <span>{category.name}</span>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        style={dangerButton}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section style={panel(colors)}>
                <h3 style={panelTitle(colors)}>User Management</h3>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={th(colors)}>ID</th>
                        <th style={th(colors)}>Username</th>
                        <th style={th(colors)}>Email</th>
                        <th style={th(colors)}>Role</th>
                        <th style={th(colors)}>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((item) => (
                        <tr key={item.id}>
                          <td style={td(colors)}>{item.id}</td>
                          <td style={td(colors)}>{item.username}</td>
                          <td style={td(colors)}>{item.email}</td>
                          <td style={td(colors)}>
                            <select
                              value={item.role}
                              onChange={(e) =>
                                handleUpdateUserRole(item.id, e.target.value)
                              }
                              style={inputStyle}
                            >
                              <option value="STUDENT">STUDENT</option>
                              <option value="ADVISOR">ADVISOR</option>
                              <option value="ADMIN">ADMIN</option>
                            </select>
                          </td>
                          <td style={td(colors)}>
                            <button
                              onClick={() => handleDeleteUser(item.id)}
                              style={{
                                ...dangerButton,
                                opacity: item.id === user.id ? 0.5 : 1,
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activePage === "profile" && (
            <section style={panel(colors)}>
              <h3 style={panelTitle(colors)}>Profile</h3>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function pageTitle(activePage, role) {
  if (activePage === "dashboard") return `${role} Dashboard`;
  if (activePage === "announcements") return "Announcements";
  if (activePage === "requests") return "Requests";
  if (activePage === "admin") return "Admin Panel";
  if (activePage === "profile") return "Profile";
  return "CampusHub";
}

function panel(colors) {
  return {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(15,39,71,0.06)",
  };
}

function panelTitle(colors) {
  return {
    marginTop: 0,
    marginBottom: "18px",
    color: colors.navy,
  };
}

function card(colors) {
  return {
    border: `1px solid ${colors.border}`,
    borderRadius: "14px",
    padding: "18px",
    background: "#fbfcfe",
  };
}

function row(colors) {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "12px 14px",
    background: "#fbfcfe",
  };
}

function th(colors) {
  return {
    textAlign: "left",
    padding: "12px",
    borderBottom: `1px solid ${colors.border}`,
    color: colors.navy,
    fontSize: "13px",
  };
}

function td(colors) {
  return {
    padding: "12px",
    borderBottom: `1px solid ${colors.border}`,
    fontSize: "14px",
  };
}

function StatCard({ title, value, colors }) {
  return (
    <div style={panel(colors)}>
      <div style={{ color: colors.muted, fontSize: "13px", marginBottom: "8px" }}>
        {title}
      </div>
      <div style={{ fontSize: "30px", fontWeight: "800", color: colors.navy }}>
        {value}
      </div>
    </div>
  );
}

export default DashboardPage;
