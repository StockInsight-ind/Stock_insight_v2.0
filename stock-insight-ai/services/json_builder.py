"""
json_builder.py

Builds the final JSON response returned
by the Stock Insight News Engine.

Responsibilities
----------------
✓ Format API response
✓ Remove internal fields
✓ Return frontend-friendly JSON
"""




#this will format all the data of filtered news and prodie it in json object

from datetime import datetime, timezone
from typing import Dict, List


class JsonBuilder:

    def build(
        self,
        market: str,
        symbol: str,
        articles: List[Dict],
    ) -> Dict:

        response_articles = []

        for article in articles:

            response_articles.append(
                self._article(article)
            )

        return {

            "success": True,

            "market": market,

            "symbol": symbol,

            "last_updated": datetime.now(
                timezone.utc
            ).isoformat(),

            "total_articles": len(response_articles),

            "articles": response_articles,

        }

    # -----------------------------------------------------

    def _article(
        self,
        article: Dict,
    ) -> Dict:

        return {

            "title":
                article.get("title"),

            "summary":
                article.get("summary"),

            "url":
                article.get("url"),

            "source":
                article.get("source"),

            "published":
                article.get("published"),

            "relevance_score":
                article.get(
                    "relevance_score"
                ),

            "impact_score":
                article.get(
                    "impact_score"
                ),

            "freshness_score":
                article.get(
                    "freshness_score"
                ),

            "source_score":
                article.get(
                    "source_score"
                ),

            "overall_score":
                article.get(
                    "overall_score"
                ),

        }


json_builder = JsonBuilder()