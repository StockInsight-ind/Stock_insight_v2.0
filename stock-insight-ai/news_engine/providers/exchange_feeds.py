"""
exchange_feeds.py

Official exchange announcement feeds.
"""

from config.rss_sources import EXCHANGES


class ExchangeFeedProvider:

    def get(
        self,
        market: str,
    ):

        return EXCHANGES.get(
            market.upper(),
            []
        )


exchange_feed_provider = ExchangeFeedProvider()