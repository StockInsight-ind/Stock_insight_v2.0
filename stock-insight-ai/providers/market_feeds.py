"""
market_feeds.py

Static market RSS feeds.
"""

from config.rss_sources import RSS_SOURCES


class MarketFeedProvider:

    def get(
        self,
        market: str,
    ):

        market = market.upper()

        feeds = RSS_SOURCES.get(
            market,
            {}
        )

        result = []

        for category in feeds.values():

            result.extend(category)

        return result


market_feed_provider = MarketFeedProvider()