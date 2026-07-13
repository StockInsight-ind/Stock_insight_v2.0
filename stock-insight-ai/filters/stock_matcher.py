
#this is main fiel whihc will actually provide the news of that particular stock as filter/market_filter.py actaully filters determines whihc marekt is called 
"""
stock_matcher.py

Filters articles that belong to the requested stock.

Responsibilities
----------------
✓ Match stock symbol
✓ Calculate relevance score
✓ Return only relevant articles

Input:
    symbol = "AAPL"

Output:
    Articles mentioning AAPL
"""

from typing import Dict, List


class StockMatcher:

    def __init__(self):
        self.minimum_score = 70

    # --------------------------------------------------

    def filter(
        self,
        articles: List[Dict],
        symbol: str,
    ) -> List[Dict]:

        matched_articles = []

        for article in articles:

            score = self.relevance_score(
                article,
                symbol,
            )

            if score >= self.minimum_score:

                article["relevance_score"] = score

                matched_articles.append(article)

        return matched_articles

    # --------------------------------------------------

    def relevance_score(
        self,
        article: Dict,
        symbol: str,
    ) -> int:

        text = self._build_text(article)

        symbol = symbol.upper()

        score = 0

        # Exact symbol match
        if symbol in text.upper():
            score = 100

        return score

    # --------------------------------------------------

    @staticmethod
    def _build_text(
        article: Dict
    ) -> str:

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

        return (
            f"{title} "
            f"{summary} "
            f"{source}"
        )


stock_matcher = StockMatcher()