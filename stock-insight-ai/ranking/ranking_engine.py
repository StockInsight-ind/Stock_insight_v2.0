"""
ranking_engine.py

Final ranking engine for the
Stock Insight News Engine.

Responsibilities
----------------
✓ Calculate overall article score
✓ Sort articles
✓ Return Top N articles

No filtering.
No RSS fetching.
"""










#this file  code wil actually determine what news to show like it wil kep only top 10 news and rest all irelevant news will be filtered out 
#shoud work on this file more wht sorts of news to keep and display it to user 

from typing import Dict, List

from data.news_weights import (
    RANKING_WEIGHTS,
    ARTICLE_LIMITS,
)


class RankingEngine:

    def __init__(self):

        self.weights = RANKING_WEIGHTS

        self.max_articles = ARTICLE_LIMITS[
            "maximum_articles"
        ]

    # ---------------------------------------------------

    def rank(
        self,
        articles: List[Dict]
    ) -> List[Dict]:

        ranked = []

        for article in articles:

            article["overall_score"] = self.calculate_score(
                article
            )

            ranked.append(article)

        ranked.sort(

            key=lambda x: x["overall_score"],

            reverse=True,

        )

        return ranked[: self.max_articles]

    # ---------------------------------------------------

    def calculate_score(
        self,
        article: Dict
    ) -> float:

        source = article.get(
            "source_score",
            0,
        )

        impact = article.get(
            "impact_score",
            0,
        )

        freshness = article.get(
            "freshness_score",
            0,
        )

        relevance = article.get(
            "relevance_score",
            0,
        )

        score = (

            source * self.weights["source"]

            +

            impact * self.weights["impact"]

            +

            freshness * self.weights["freshness"]

            +

            relevance * self.weights["relevance"]

        )

        return round(score, 2)


ranking_engine = RankingEngine()