
import yfinance as yf
from datetime import datetime
from data.commodities import COMMODITIES
from services.getMarket import get_market


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