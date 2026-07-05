from services.commodities import get_global_commodities
from services.forexMarket import get_global_forex
from services.marketIndices import get_global_indices
from services.marketSentiment import get_market_sentiment


def get_commodities():
    return get_global_commodities()

def get_forex():
    return get_global_forex()

def get_indices():
    return get_global_indices()

def get_sentiment():
    return get_market_sentiment()