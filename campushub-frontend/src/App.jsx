import { useEffect, useState } from "react";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("campushub_user");
    const savedToken = localStorage.getItem("campushub_token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("campushub_user", JSON.stringify(userData));
    localStorage.setItem("campushub_token", userData.token);

    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;

    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("campushub_user");
    localStorage.removeItem("campushub_token");

    delete axios.defaults.headers.common["Authorization"];

    setUser(null);
  };

  if (user) {
    return <DashboardPage user={user} onLogout={handleLogout} />;
  }

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
}

export default App;
