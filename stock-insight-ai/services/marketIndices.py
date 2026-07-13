import yfinance as yf
from datetime import datetime
from data.indices import INDICES
from services.getMarket import get_market



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