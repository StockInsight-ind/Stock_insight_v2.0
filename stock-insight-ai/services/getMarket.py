from datetime import datetime

import yfinance as yf


def get_market(symbol: str):

    ticker = yf.Ticker(symbol)

    hist = ticker.history(period="2d", interval="1m")

    if hist.empty:
        return None

    current = float(hist["Close"].iloc[-1])

    previous = (
        float(hist["Close"].iloc[-2])
        if len(hist) > 1
        else current
    )

    change = current - previous

    percent = (
        (change / previous) * 100
        if previous != 0
        else 0
    )

    return {
        "current": round(current, 4),
        "change": round(change, 4),
        "percent": round(percent, 4),
        "high": round(float(hist["High"].iloc[-1]), 4),
        "low": round(float(hist["Low"].iloc[-1]), 4),
        "open": round(float(hist["Open"].iloc[-1]), 4),
        "previous_close": round(
            float(
                ticker.fast_info.get(
                    "previousClose",
                    previous,
                )
            ),
            4,
        ),
        "volume": int(hist["Volume"].iloc[-1]),
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }