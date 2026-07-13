import yfinance as yf
from datetime import datetime
from data.sentiment import SENTIMENT
from services.getMarket import get_market

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