import { useState, useRef } from "react";

const SUGGESTED_STOCKS = ["RELIANCE", "INFY", "TCS", "WIPRO", "AAPL", "TSLA", "GOOGL", "MSFT", "AMZN", "META", "BTC", "ETH"];

export default function StockTagInput({ stocks, onChange }) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const suggestions = input.length > 0
    ? SUGGESTED_STOCKS.filter(
      (stock) =>
        stock.toUpperCase().includes(input.toUpperCase()) &&
        !stocks.includes(stock.toUpperCase())
    ).slice(0, 4)
    : [];

  const handleAddStock = (stock) => {
    const upper = stock.toUpperCase();
    if (!stocks.includes(upper) && stocks.length < 3) {
      onChange([...stocks, upper]);
      setInput("");
      setShowSuggestions(false);
    }
  };

  const handleRemoveStock = (index) => {
    onChange(stocks.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      handleAddStock(input.trim());
    } else if (e.key === "Backspace" && input === "" && stocks.length > 0) {
      handleRemoveStock(stocks.length - 1);
    }
  };

  return (
    <div className="stock-input-container">
      <div className="stock-tags-display">
        {stocks.map((stock, idx) => (
          <div key={idx} className="stock-tag">
            <span>{stock}</span>
            <button
              type="button"
              onClick={() => handleRemoveStock(idx)}
              className="tag-remove"
              aria-label={`Remove ${stock}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="stock-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value.toUpperCase());
            setShowSuggestions(e.target.value.length > 0);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => input && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={stocks.length < 3 ? "Add favorite stock (up to 3)" : "Maximum stocks added"}
          disabled={stocks.length >= 3 && !input}
          className="stock-input form-input"
        />

        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleAddStock(suggestion)}
                className="suggestion-item"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="stock-input-hint">
        {stocks.length}/3 stocks selected
      </p>
    </div>
  );
}
