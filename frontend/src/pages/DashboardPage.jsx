import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { getUserPreferences } from "../api/userApi";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user.firstName || "Investor";

  //const navigate = useNavigate();
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState("usa");
  const [userStocks, setUserStocks] = useState({});

  const stocksForSelectedMarket = userStocks[selectedMarket] || [];

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

        if (Array.isArray(data?.markets) && data.markets.length > 0) {
          setSelectedMarkets(data.markets);
          setSelectedMarket(data.markets[0]);
        }

        if (data?.stocks) {
          setUserStocks(data.stocks);
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
          .map((marketId) =>
            marketCards[marketId] ? { ...marketCards[marketId], id: marketId } : null
          )
          .filter(Boolean)
      : Object.entries(marketCards)
          .slice(0, 3)
          .map(([marketId, market]) => ({ ...market, id: marketId }));

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
        <h1>Welcome {firstName}</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          {topRow.map((market) => {
            const isActive = selectedMarket === market.id;

            return (
              <div
                key={market.id}
                onClick={() => setSelectedMarket(market.id)}
                style={{
                  border: isActive ? "2px solid #2563eb" : "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  cursor: "pointer",
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
                  <span style={{ fontSize: "28px" }}>{market.emoji}</span>
                  <h2 style={{ margin: 0, fontSize: "20px" }}>{market.label}</h2>
                </div>

                <h3 style={{ marginBottom: "10px" }}>{market.index}</h3>
                <p style={{ color: "#666", lineHeight: "1.5" }}>{market.description}</p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "30px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            background: "#fff",
            padding: "20px",
            minHeight: "350px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ margin: 0, marginBottom: "20px" }}>My Stocks</h2>
          <p style={{ marginTop: 0, marginBottom: "18px", color: "#374151" }}>
            Showing stocks for {marketCards[selectedMarket]?.label || "USA"}
          </p>

          {stocksForSelectedMarket.length === 0 ? (
            <p style={{ color: "#374151" }}>No stocks added for this market.</p>
          ) : (
            stocksForSelectedMarket.map((stock) => (
              <div
                key={stock}
                style={{
                  border: "1px solid #e5e7eb",
                  background: "#f8fafc",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              >
                <h3 style={{ margin: 0, color: "#0f172a" }}>{stock}</h3>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
