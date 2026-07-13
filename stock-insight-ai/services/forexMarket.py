import yfinance as yf
from datetime import datetime
from data.forex import FOREX
from services.getMarket import get_market



def get_global_forex():

    response = {}

    for pair in FOREX:

        response[pair["id"]] = {
            "pair": pair["name"],
            "symbol": pair["symbol"],
            "data": get_market(pair["symbol"])
        }

    return response