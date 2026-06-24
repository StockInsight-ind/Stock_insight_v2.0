import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPreferences } from "../api/userApi";

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

const sentimentCycle = ["Bullish", "Neutral", "Bearish"];
const eventCycle = ["Earnings", "Dividends", "Splits"];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState(null);
  const [message, setMessage] = useState("Loading your dashboard...");
  const [loading, setLoading] = useState(true);

  const user = useMemo(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }, []);

  useEffect(() => {
    let active = true;

    const loadPreferences = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Sign in to view your personalized dashboard.");
        setLoading(false);
        return;
      }

      try {
        const data = await getUserPreferences();

        if (!active) {
          return;
        }

        if (data?.user && !data.user.onboarding_completed) {
          navigate("/questionnaire");
          return;
        }

        setPreferences(data);
        setMessage("");
      } catch (error) {
        if (!active) {
          return;
        }

        setMessage(error.response?.data?.message || "Unable to load personalized data.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPreferences();

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const selectedMarkets = preferences?.markets || [];
  const selectedStocks = preferences?.stocks || {};
  const watchlist = [...new Set(Object.values(selectedStocks).flat())];
  const topRow = selectedMarkets.length > 0
    ? selectedMarkets.map((marketId) => marketCards[marketId]).filter(Boolean)
    : Object.values(marketCards).slice(0, 3);

  const newsItems = watchlist.length > 0
    ? watchlist.map((symbol) => ({
        title: `${symbol} News`,
        body: `Personalized coverage for ${symbol} based on your saved preferences.`,
      }))
    : [];

  const insights = watchlist.length > 0
    ? watchlist.map((symbol, index) => ({
        symbol,
        sentiment: sentimentCycle[index % sentimentCycle.length],
      }))
    : [];

  const upcomingEvents = watchlist.length > 0
    ? watchlist.map((symbol, index) => ({
        symbol,
        event: eventCycle[index % eventCycle.length],
      }))
    : [];

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <div className="dashboard-hero">
          <div>
            <p className="form-kicker">Personalized dashboard</p>
            <h1>Welcome {user?.firstName || "Investor"}</h1>
            <p>
              Your markets, watchlist, alerts, and AI insights are now filtered from the
              preferences you saved during onboarding.
            </p>
          </div>

          <div className="dashboard-actions">
            <button className="button button-secondary" onClick={() => navigate("/questionnaire")}>
              Edit preferences
            </button>
            <button className="button button-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {message && <div className="status-message dashboard-message">{message}</div>}

        {loading ? (
          <div className="dashboard-grid">
            <div className="dashboard-card">Loading market view...</div>
          </div>
        ) : (
          <div className="dashboard-grid">
            <section className="dashboard-section">
              <div className="section-heading">
                <h2>Top Row</h2>
                <span>Selected markets</span>
              </div>
              <div className="market-grid dashboard-market-grid">
                {topRow.map((market) => (
                  <article key={market.label} className="market-card dashboard-market-card">
                    <div className="market-card-top">
                      <div className="market-flag">{market.emoji}</div>
                      <div className="market-name">{market.label}</div>
                    </div>
                    <strong>{market.index}</strong>
                    <p>{market.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="dashboard-section">
              <div className="section-heading">
                <h2>Watchlist</h2>
                <span>Saved stocks</span>
              </div>
              <div className="tag-cloud">
                {watchlist.length > 0 ? (
                  watchlist.map((symbol) => (
                    <span key={symbol} className="dashboard-pill">
                      {symbol}
                    </span>
                  ))
                ) : (
                  <p className="empty-state">No stocks saved yet.</p>
                )}
              </div>
            </section>

            <section className="dashboard-section">
              <div className="section-heading">
                <h2>Latest News</h2>
                <span>Only from saved stocks</span>
              </div>
              <div className="stack-list">
                {newsItems.length > 0 ? (
                  newsItems.map((item) => (
                    <article key={item.title} className="stack-card">
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </article>
                  ))
                ) : (
                  <p className="empty-state">News will appear after you save preferences.</p>
                )}
              </div>
            </section>

            <section className="dashboard-section">
              <div className="section-heading">
                <h2>AI Insights</h2>
                <span>Sentiment by symbol</span>
              </div>
              <div className="stack-list">
                {insights.length > 0 ? (
                  insights.map((item) => (
                    <article key={item.symbol} className="stack-card">
                      <strong>{item.symbol} sentiment: {item.sentiment}</strong>
                      <p>Model summary for {item.symbol} based on your watchlist.</p>
                    </article>
                  ))
                ) : (
                  <p className="empty-state">AI insights will appear here once stocks are saved.</p>
                )}
              </div>
            </section>

            <section className="dashboard-section">
              <div className="section-heading">
                <h2>Upcoming Events</h2>
                <span>Earnings, dividends, splits</span>
              </div>
              <div className="stack-list">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((item) => (
                    <article key={`${item.symbol}-${item.event}`} className="stack-card">
                      <strong>{item.symbol} {item.event}</strong>
                      <p>Tracked automatically from your selected stocks.</p>
                    </article>
                  ))
                ) : (
                  <p className="empty-state">Upcoming events will populate here after onboarding.</p>
                )}
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
