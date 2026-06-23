import { useState } from "react";

export default function DashboardPage() {
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-card">
        <h1>Welcome {user?.firstName || "Investor"}</h1>
        <p>{user?.email}</p>
        <button className="button button-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </main>
  );
}
