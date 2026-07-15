"""
provider_manager.py

Combines all providers.
"""

from providers.google_news import google_news_provider
from providers.yahoo_finance import yahoo_finance_provider
from providers.market_feeds import market_feed_provider
from providers.exchange_feeds import exchange_feed_provider


class ProviderManager:

    def get_feeds(
        self,
        market: str,
        symbol: str,
    ):

        feeds = []

        feeds.extend(
            market_feed_provider.get(market)
        )

        feeds.extend(
            exchange_feed_provider.get(market)
        )

        feeds.append(
            google_news_provider.build(
                market,
                symbol,
            )
        )

        feeds.append(
            yahoo_finance_provider.build(
                symbol,
            )
        )

        # Remove duplicates while preserving order
        seen = set()
        unique = []

        for feed in feeds:

            if feed not in seen:

                unique.append(feed)

                seen.add(feed)

        return unique


provider_manager = ProviderManager()