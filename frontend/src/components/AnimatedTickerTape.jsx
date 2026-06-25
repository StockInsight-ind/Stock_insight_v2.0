import { useEffect, useState } from "react";

export default function AnimatedTickerTape() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 100);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const tickers = [
    { symbol: "NIFTY", change: "+1.2%", color: "#22C55E" },
    { symbol: "SENSEX", change: "+0.8%", color: "#22C55E" },
    { symbol: "AAPL", change: "+2.1%", color: "#22C55E" },
    { symbol: "TSLA", change: "-0.4%", color: "#EF4444" },
    { symbol: "RELIANCE", change: "+1.8%", color: "#22C55E" },
  ];

  const tickerString = tickers
    .map((t) => `${t.symbol} ${t.change}`)
    .join(" · ");

  return (
    <div className="ticker-tape">
      <div className="ticker-content" style={{ transform: `translateX(-${offset}%)` }}>
        <span className="ticker-text">{tickerString}</span>
        <span className="ticker-text">{tickerString}</span>
      </div>
    </div>
  );
}
