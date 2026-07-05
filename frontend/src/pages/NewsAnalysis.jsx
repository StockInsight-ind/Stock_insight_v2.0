import Sidebar from "../components/Sidebar";

export default function NewsAnalysis() {
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
        <h1>News Analysis</h1>
      </main>
    </div>
  );
}