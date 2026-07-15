"""
impact_score.py

Calculates how impactful a news article is
for the selected company.

Responsibilities
----------------
✓ Detect important business events
✓ Assign impact score
✓ Store impact score inside article

No freshness scoring.
No source scoring.
No ranking.
"""










#the star indicates scores like (100 95 any number btw 0.1 to 100) whihc will be provided by config/news_weights code 


# Apple acquires OpenAI	                    ⭐⭐⭐⭐⭐
# Apple beats earnings	                    ⭐⭐⭐⭐⭐
# Apple announces dividend	                ⭐⭐⭐⭐
# Apple launches new product	            ⭐⭐⭐
# Apple participates in conference	        ⭐⭐
# Apple CEO gives interview	                ⭐

# So this module should only calculate impact, nothing else.




from typing import Dict

from data.news_weights import (
    IMPACT_SCORES,
)


class ImpactScorer:

    def __init__(self):

        # Highest score keywords first
        self.keyword_scores = sorted(
            IMPACT_SCORES.items(),
            key=lambda item: item[1],
            reverse=True,
        )

    # ------------------------------------------------

    def score(
        self,
        article: Dict
    ) -> Dict:

        impact = self.calculate(article)

        article["impact_score"] = impact

        return article

    # ------------------------------------------------

    def calculate(
        self,
        article: Dict
    ) -> int:

        text = self._build_text(article)

        highest_score = IMPACT_SCORES["general"]

        matched_keywords = []

        for keyword, score in self.keyword_scores:

            if keyword == "general":
                continue

            if keyword in text:

                matched_keywords.append(keyword)

                highest_score = max(
                    highest_score,
                    score,
                )

        article["impact_keywords"] = matched_keywords

        return highest_score

    # ------------------------------------------------

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

        return (
            title +
            " " +
            summary
        ).lower()


impact_scorer = ImpactScorer()