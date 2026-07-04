import yfinance as yf
from datetime import datetime

FOREX = [
    {
        "id": "dxy",
        "name": "US Dollar Index",
        "symbol": "DX-Y.NYB"
    },
    {
        "id": "usd_inr",
        "name": "USD/INR",
        "symbol": "INR=X"
    },
    {
        "id": "eur_usd",
        "name": "EUR/USD",
        "symbol": "EURUSD=X"
    },
    {
        "id": "gbp_usd",
        "name": "GBP/USD",
        "symbol": "GBPUSD=X"
    },
    {
        "id": "usd_jpy",
        "name": "USD/JPY",
        "symbol": "JPY=X"
    },
    {
        "id": "aud_usd",
        "name": "AUD/USD",
        "symbol": "AUDUSD=X"
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


def get_global_forex():

    response = {}

    for pair in FOREX:

        response[pair["id"]] = {
            "pair": pair["name"],
            "symbol": pair["symbol"],
            "data": get_market(pair["symbol"])
        }

    return response