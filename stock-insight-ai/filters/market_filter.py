"""
market_filter.py

Filters articles that belong to the requested market.

Responsibilities
----------------
✓ Verify article belongs to requested market
✓ Remove articles from other markets
✓ Keep only relevant regional news

No company matching.
No duplicate detection.
No ranking.
"""


#this is market filter it will only provide you news with markets for example if 
# #usa market is given to it.........it wil provide you with all sorts of usa market news 
# and then their is stock market the logic will chaneg acoridng to the Dta comng from database ig


from typing import Dict, List

from data.markets import MARKETS


class MarketFilter:

    def __init__(self):

        self.market_keywords = {

            "USA": [
                "nasdaq",
                "nyse",
                "sec",
                "united states",
                "u.s.",
                "usa",
                "wall street",
                "new york",
                "dow jones",
                "s&p 500",
            ],

            "INDIA": [
                "nse",
                "bse",
                "india",
                "indian",
                "mumbai",
                "sensex",
                "nifty",
                "reserve bank of india",
                "rbi",
            ],

            "AUSTRALIA": [
                "asx",
                "australia",
                "australian",
                "sydney",
                "melbourne",
                "reserve bank of australia",
                "rba",
            ],
        }

    def filter(
        self,
        articles: List[Dict],
        market: str
    ) -> List[Dict]:
        """
        Keep only articles that belong to the requested market.
        """

        market = market.upper()

        if market not in MARKETS:
            return []

        filtered = []

        for article in articles:

            if self.is_market_article(article, market):
                filtered.append(article)

        return filtered

    def is_market_article(
        self,
        article: Dict,
        market: str
    ) -> bool:

        text = self._build_text(article)

        keywords = self.market_keywords.get(
            market,
            []
        )

        for keyword in keywords:

            if keyword in text:
                return True

        return False

    @staticmethod
    def _build_text(article: Dict) -> str:

        title = article.get(
            "title",
            ""
        )

        summary = article.get(
            "summary",
            ""
        )

        source = article.get(
            "source",
            ""
        )

        return f"{title} {summary} {source}".lower()


market_filter = MarketFilter()