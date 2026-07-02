import Sidebar from "../components/Sidebar";

export default function Settings() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <h1>Settings</h1>

        <p style={{ color: "#6b7280" }}>
          Settings page coming soon...
        </p>
      </main>
    </div>
  );
}