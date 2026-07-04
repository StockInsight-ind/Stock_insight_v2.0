import yfinance as yf
from datetime import datetime

SENTIMENT = [
    {
        "id": "vix",
        "name": "CBOE VIX",
        "symbol": "^VIX",
        "type": "Fear Index"
    },
    {
        "id": "india_vix",
        "name": "India VIX",
        "symbol": "^INDIAVIX",
        "type": "Fear Index"
    },
    {
        "id": "us10y",
        "name": "US 10Y Treasury Yield",
        "symbol": "^TNX",
        "type": "Bond Yield"
    }
]


def get_market(symbol):

    ticker = yf.Ticker(symbol)

    hist = ticker.history(
        period="2d",
        interval="1m"
    )

    if hist.empty:
        return None

    current = float(hist["Close"].iloc[-1])

    if len(hist) > 1:
        previous = float(hist["Close"].iloc[-2])
    else:
        previous = current

    change = current - previous

    percent = 0

    if previous != 0:
        percent = (change / previous) * 100

    return {
        "current": round(current,4),
        "change": round(change,4),
        "percent": round(percent,4),
        "high": round(float(hist["High"].iloc[-1]),4),
        "low": round(float(hist["Low"].iloc[-1]),4),
        "open": round(float(hist["Open"].iloc[-1]),4),
        "previous_close": round(float(ticker.fast_info.get("previousClose", previous)),4),
        "volume": int(hist["Volume"].iloc[-1]),
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }


def get_market_sentiment():

    response = {}

    for item in SENTIMENT:

        response[item["id"]] = {
            "name": item["name"],
            "symbol": item["symbol"],
            "type": item["type"],
            "data": get_market(item["symbol"])
        }

    return response