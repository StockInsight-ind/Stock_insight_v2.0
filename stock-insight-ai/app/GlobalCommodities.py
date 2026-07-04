
import yfinance as yf
from datetime import datetime

COMMODITIES = [
    {
        "id": "gold",
        "name": "Gold",
        "symbol": "GC=F",
        "unit": "USD/oz"
    },
    {
        "id": "silver",
        "name": "Silver",
        "symbol": "SI=F",
        "unit": "USD/oz"
    },
    {
        "id": "brent",
        "name": "Brent Crude",
        "symbol": "BZ=F",
        "unit": "USD/barrel"
    },
    {
        "id": "wti",
        "name": "WTI Crude",
        "symbol": "CL=F",
        "unit": "USD/barrel"
    },
    {
        "id": "copper",
        "name": "Copper",
        "symbol": "HG=F",
        "unit": "USD/lb"
    },
    {
        "id": "natural_gas",
        "name": "Natural Gas",
        "symbol": "NG=F",
        "unit": "USD/MMBtu"
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


def get_global_commodities():

    response = {}

    for commodity in COMMODITIES:

        response[commodity["id"]] = {
            "commodity": commodity["name"],
            "symbol": commodity["symbol"],
            "unit": commodity["unit"],
            "data": get_market(commodity["symbol"])
        }

    return response