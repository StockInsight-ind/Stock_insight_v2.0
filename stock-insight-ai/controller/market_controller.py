from services.commodities import get_global_commodities
from services.forexMarket import get_global_forex
from services.marketIndices import get_global_indices
from services.marketSentiment import get_market_sentiment
from services.global_events_news import get_global_news_feed as fetch_global_news_feed


def get_commodities():
    return get_global_commodities()

def get_forex():
    return get_global_forex()

def get_indices():
    return get_global_indices()

def get_sentiment():
    return get_market_sentiment()


async def get_global_news_feed():
    return await fetch_global_news_feed()