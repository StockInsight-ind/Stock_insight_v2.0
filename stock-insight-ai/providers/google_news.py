"""
google_news.py

Google News RSS Provider
"""

from urllib.parse import quote_plus

from data.rss_sources import GOOGLE_NEWS


class GoogleNewsProvider:

    def build(
        self,
        market: str,
        symbol: str,
    ) -> str:

        market = market.upper()

        config = GOOGLE_NEWS.get(
            market,
            GOOGLE_NEWS["GLOBAL"]
        )

        query = quote_plus(
            f'"{symbol}" stock'
        )

        return (
            "https://news.google.com/rss/search?"
            f"q={query}"
            f"&hl={config['hl']}"
            f"&gl={config['gl']}"
            f"&ceid={config['ceid']}"
        )


google_news_provider = GoogleNewsProvider()