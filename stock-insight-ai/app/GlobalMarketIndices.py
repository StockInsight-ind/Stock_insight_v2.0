# import os
# import requests

# API_KEY = os.getenv("EODHD_API_KEY")

# INDICES = {
#     "sp500": "GSPC.INDX",
#     "nasdaq": "IXIC.INDX",
#     "dowjones": "DJI.INDX",
#     "nifty50": "NSEI.INDX",
#     "sensex": "BSESN.INDX",
#     "stoxx600": "STOXX.INDX",
#     "nikkei225": "N225.INDX",
#     "asx200": "AXJO.INDX",
# }


# def get_quote(symbol):
#     url = (
#         f"https://eodhd.com/api/real-time/{symbol}"
#         f"?api_token={API_KEY}&fmt=json"
#     )

#     r = requests.get(url, timeout=10)

#     if r.status_code != 200:
#         return {
#             "error": r.text
#         }

#     data = r.json()

#     if "close" not in data:
#         return data

#     return {
#         "price": data["close"],
#         "change": data["change"],
#         "changePercent": data["change_p"],
#         "open": data["open"],
#         "high": data["high"],
#         "low": data["low"],
#         "previousClose": data["previousClose"],
#         "timestamp": data["timestamp"]
#     }


# def get_global_indices():
#     results = {}

#     for key, symbol in INDICES.items():
#         results[key] = get_quote(symbol)

#     return results



import yfinance as yf
from datetime import datetime

INDICES = [
    {
        "id": "sp500",
        "country": "USA",
        "index": "S&P 500",
        "symbol": "^GSPC"
    },
    {
        "id": "nasdaq",
        "country": "USA",
        "index": "NASDAQ Composite",
        "symbol": "^IXIC"
    },
    {
        "id": "dow",
        "country": "USA",
        "index": "Dow Jones",
        "symbol": "^DJI"
    },
    {
        "id": "nifty50",
        "country": "India",
        "index": "NIFTY 50",
        "symbol": "^NSEI"
    },
    {
        "id": "sensex",
        "country": "India",
        "index": "Sensex",
        "symbol": "^BSESN"
    },
    {
        "id": "stoxx600",
        "country": "Europe",
        "index": "STOXX Europe 600",
        "symbol": "^STOXX"
    },
    {
        "id": "nikkei225",
        "country": "Japan",
        "index": "Nikkei 225",
        "symbol": "^N225"
    },
    {
        "id": "asx200",
        "country": "Australia",
        "index": "S&P/ASX 200",
        "symbol": "^AXJO"
    }
]


def get_market(symbol):

    ticker = yf.Ticker(symbol)

    hist = ticker.history(period="2d", interval="1m")

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


def get_global_indices():

    response = {}

    for market in INDICES:

        response[market["id"]] = {
            "country": market["country"],
            "index": market["index"],
            "symbol": market["symbol"],
            "data": get_market(market["symbol"])
        }

    return response