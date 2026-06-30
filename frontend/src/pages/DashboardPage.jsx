import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserPreferences } from "../api/userApi";


export default function DashboardPage() {


  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const firstName = user.firstName;
 

  const navigate = useNavigate();

  const [selectedMarkets, setSelectedMarkets] = useState([]);

  const marketCards = {
    usa: {
      label: "USA",
      index: "S&P 500",
      emoji: "🇺🇸",
      description: "Large-cap market pulse and U.S. blue chips.",
    },
    india: {
      label: "India",
      index: "NIFTY 50",
      emoji: "🇮🇳",
      description: "Benchmark coverage for Indian equities.",
    },
    australia: {
      label: "Australia",
      index: "ASX 200",
      emoji: "🇦🇺",
      description: "Core Australian market movers.",
    },
    europe: {
      label: "Europe",
      index: "FTSE 100",
      emoji: "🇬🇧",
      description: "Blue-chip European market overview.",
    },
    japan: {
      label: "Japan",
      index: "Nikkei 225",
      emoji: "🇯🇵",
      description: "Japanese market direction and breadth.",
    },
  };

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const data = await getUserPreferences();

        console.log("Backend Response:", data);

        if (data?.markets) {
          setSelectedMarkets(data.markets);
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    };

    loadPreferences();
  }, []);

  const topRow =
    selectedMarkets.length > 0
      ? selectedMarkets
          .map((marketId) => marketCards[marketId])
          .filter(Boolean)
      : Object.values(marketCards).slice(0, 3);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
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

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <h1>Welcome {firstName}</h1>

        {/* Market Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          {topRow.map((market) => (
            <div
              key={market.label}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <span style={{ fontSize: "28px" }}>
                  {market.emoji}
                </span>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                  }}
                >
                  {market.label}
                </h2>
              </div>

              <h3
                style={{
                  marginBottom: "10px",
                }}
              >
                {market.index}
              </h3>

              <p
                style={{
                  color: "#666",
                  lineHeight: "1.5",
                }}
              >
                {market.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}