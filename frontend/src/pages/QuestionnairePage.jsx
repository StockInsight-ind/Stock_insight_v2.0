import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPreferences, saveUserPreferences } from "../api/userApi";
import { searchStocks } from "../services/stockSearchService";

const marketOptions = [
  { id: "usa", label: "USA", accent: "S&P 500" },
  { id: "india", label: "India", accent: "NIFTY 50" },
  { id: "australia", label: "Australia", accent: "ASX 200" },
];

function StockAutocomplete({
  marketId,
  marketCode,
  marketLabel,
  selectedStocks,
  onAddStock,
  onRemoveStock,
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const isQueryTooShort = query.trim().length < 2;

useEffect(() => {
  let active = true;

  if (isQueryTooShort) {
    setSuggestions([]);
    setLoading(false);
    setStatus("");
    return;
  }

  const timer = setTimeout(async () => {
    try {
      setLoading(true);

      const results = await searchStocks(query.trim(), marketCode);

      if (!active) return;

      const filtered = results
        .filter(
          (item) =>
            item?.symbol &&
            !selectedStocks.includes(item.symbol.toUpperCase())
        )
        .slice(0, 6);

      setSuggestions(filtered);
      setStatus(filtered.length ? "" : "No exact match found.");
    } catch {
      if (active) {
        setSuggestions([]);
        setStatus("Stock search is temporarily unavailable.");
      }
    } finally {
      if (active) setLoading(false);
    }
  }, 250);

  return () => {
    active = false;
    clearTimeout(timer);
  };
}, [query, marketCode, selectedStocks, isQueryTooShort]);

  const handleAddSuggestion = (suggestion) => {
    onAddStock(marketId, suggestion.symbol.toUpperCase());
    setQuery("");
    setSuggestions([]);
    setStatus("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (suggestions.length > 0) {
        handleAddSuggestion(suggestions[0]);
      }
    }
  };

  return (
    <div className="stock-market-block">
      <div className="stock-market-header">
        <div>
          <h4>{marketLabel}</h4>
          <p>Pick valid symbols from the stock master service.</p>
        </div>
        <span className="market-search-badge">{loading ? "Searching..." : "Autocomplete"}</span>
      </div>

      <div className="stock-tags">
        {selectedStocks.map((symbol) => (
          <span key={symbol} className="stock-chip">
            {symbol}
            <button type="button" onClick={() => onRemoveStock(marketId, symbol)} aria-label={`Remove ${symbol}`}>
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="stock-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Search ${marketLabel} stocks, e.g. Tesla`}
          aria-label={`Search stocks for ${marketLabel}`}
          className="form-input stock-search-input"
          autoComplete="off"
        />

        {suggestions.length > 0 && (
          <div className="suggestions-dropdown" role="listbox">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.symbol}
                type="button"
                className="suggestion-item"
                onClick={() => handleAddSuggestion(suggestion)}
              >
                <strong>{suggestion.symbol}</strong>
                <span>{suggestion.company_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {status && <p className="stock-input-hint">{status}</p>}
    </div>
  );
}

export default function QuestionnairePage() {
  const navigate = useNavigate();
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [stocksByMarket, setStocksByMarket] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hydrating, setHydrating] = useState(true);

  useEffect(() => {
    let active = true;

    const hydratePreferences = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please log in to continue onboarding.");
        setHydrating(false);
        navigate("/login");
        return;
      }

      try {
        const preferences = await getUserPreferences();

        if (!active || !preferences) {
          return;
        }

        const savedMarkets = Array.isArray(preferences.markets)
          ? preferences.markets.filter((marketId) => marketOptions.some((option) => option.id === marketId))
          : [];

        setSelectedMarkets(savedMarkets);
        setStocksByMarket(preferences.stocks || {});
      } catch (error) {
        if (active && error.response?.status !== 401) {
          setMessage(error.response?.data?.message || "Unable to load your saved preferences.");
        }
      } finally {
        if (active) {
          setHydrating(false);
        }
      }
    };

    hydratePreferences();

    return () => {
      active = false;
    };
  }, []);

  const filteredStocksByMarket = Object.fromEntries(
  Object.entries(stocksByMarket).filter(([marketId]) =>
    selectedMarkets.includes(marketId)
  )
);

  const toggleMarket = (marketId) => {
    setSelectedMarkets((previous) =>
      previous.includes(marketId)
        ? previous.filter((id) => id !== marketId)
        : [...previous, marketId]
    );
  };

  const addStock = (marketId, symbol) => {
    setStocksByMarket((previous) => {
      const existing = previous[marketId] || [];
      const normalizedSymbol = String(symbol || "").trim().toUpperCase();

      if (!normalizedSymbol || existing.includes(normalizedSymbol)) {
        return previous;
      }

      return {
        ...previous,
        [marketId]: [...existing, normalizedSymbol],
      };
    });
  };

  const removeStock = (marketId, symbol) => {
    setStocksByMarket((previous) => ({
      ...previous,
      [marketId]: (previous[marketId] || []).filter((item) => item !== symbol),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (selectedMarkets.length === 0) {
      setMessage("Please choose at least one market.");
      return;
    }

    const payload = {
      markets: selectedMarkets,
      stocks: selectedMarkets.reduce((accumulator, marketId) => {
        accumulator[marketId] = filteredStocksByMarket[marketId] || [];
        return accumulator;
      }, {}),
    };

    setLoading(true);

    try {
      await saveUserPreferences(payload);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to save preferences.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-shell">
      <section className="insight-panel" aria-labelledby="questionnaire-headline">
        <div className="ambient-glow ambient-glow-green" />
        <div className="ambient-glow ambient-glow-blue" />
        <div className="market-orbits" aria-hidden="true" />

        <div className="insight-content">
          <p className="eyebrow">Onboarding</p>
          <h1 id="questionnaire-headline">
            Tell us what you trade.
            <span>We’ll shape the dashboard around it.</span>
          </h1>
          <p className="hero-description">
            Pick the markets you care about, then search and save the exact symbols you want in
            your watchlist, news feed, and alerts.
          </p>
        </div>
      </section>

      <section className="form-panel" aria-labelledby="questionnaire-form-title">
        <form className="registration-form questionnaire-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <p className="form-kicker">Step 1 of onboarding</p>
            <h2 id="questionnaire-form-title" className="form-title">
              Personalize your markets
            </h2>
            <p className="form-subtitle">
              Choose markets first, then add verified stock symbols with autocomplete.
            </p>
          </div>

          {message && (
            <div className={`status-message ${message.includes("Unable") ? "error" : ""}`}>
              {message}
            </div>
          )}

          {hydrating && <div className="status-message">Loading your saved preferences...</div>}

          <div className="market-selection">
            <h3>Preferred markets</h3>
            <div className="market-grid">
              {marketOptions.map((market) => (
                <button
                  key={market.id}
                  type="button"
                  className={
                    selectedMarkets.includes(market.id)
                      ? "market-chip selected"
                      : "market-chip"
                  }
                  onClick={() => toggleMarket(market.id)}
                >
                  <strong>{market.label}</strong>
                  <span>{market.accent}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="stock-preferences">
            <h3>Stocks by market</h3>
            {selectedMarkets.length === 0 && (
              <p className="stock-input-hint">
                Choose a market above to start adding stock symbols.
              </p>
            )}

            {selectedMarkets.map((marketId) => {
              const market = marketOptions.find((item) => item.id === marketId);

              return (
                <StockAutocomplete
                  key={marketId}
                  marketId={marketId}
                  marketCode={market?.id || "usa"}
                  marketLabel={market?.label || marketId}
                  selectedStocks={filteredStocksByMarket[marketId] || []}
                  onAddStock={addStock}
                  onRemoveStock={removeStock}
                />
              );
            })}
          </div>

          <div className="onboarding-note">
            <strong>No free typing.</strong>
            <span>We only save verified symbols from the stock search API.</span>
          </div>

          <button type="submit" className="submit-button" disabled={loading || hydrating}>
            {loading ? "Saving preferences..." : "Save and continue"}
          </button>
        </form>
      </section>
    </main>
  );
}


