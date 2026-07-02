// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Sidebar() {
//   const navigate = useNavigate();

//   return (
//     <aside
//       style={{
//         width: "240px",
//         borderRight: "1px solid #ddd",
//         padding: "20px",
//         background: "transparent",
//         boxSizing: "border-box",
//       }}
//     >
//       <div style={{ textAlign: "center", marginBottom: "30px" }}>
//         <img
//           src="/logo.png"
//           alt="Stock Insights"
//           style={{ width: "70px", height: "70px" }}
//         />

//         <h2 style={{ marginTop: "8px" }}>Stock Insights</h2>
//       </div>

//       <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//         <button onClick={() => navigate("/dashboard")}>Overview</button>
//         <button onClick={() => navigate("/news-analysis")}>News Analysis</button>
//         <button onClick={() => navigate("/global-news")}>Global News</button>
//         <button onClick={() => navigate("/settings")}>Settings</button>
//       </nav>
//     </aside>
//   );
// }



import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside
      style={{
        width: "240px",
        borderRight: "1px solid #ddd",
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <img
          src="/logo.png"
          alt="Stock Insights"
          style={{
            width: "70px",
            height: "70px",
          }}
        />

        <h2>Stock Insights</h2>
      </div>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <button onClick={() => navigate("/dashboard")}>
          Overview
        </button>

        <button onClick={() => navigate("/news-analysis")}>
          News Analysis
        </button>

        <button onClick={() => navigate("/global-news")}>
          Global News
        </button>

        <button onClick={() => navigate("/settings")}>
          Settings
        </button>
      </nav>
    </aside>
  );
}