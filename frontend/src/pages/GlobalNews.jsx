import Sidebar from "../components/Sidebar";

export default function GlobalNews() {
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
        <h1>Global News</h1>

        {/* Your Global News UI */}
      </main>
    </div>
  );
}