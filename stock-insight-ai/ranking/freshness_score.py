#How recent is this article? this will be determined by the file 

"""
freshness_score.py

Calculates freshness score for an article.

Responsibilities
----------------
✓ Convert article age to freshness score
✓ Store freshness score

No filtering.
No ranking.
"""







#expected age scoring criteria 

# Age	Score
# 0–1 Hour	    100
# 1–3 Hours	    98
# 3–6 Hours	    95
# 6–12 Hours	92
# 12–24 Hours	85
# 24–36 Hours	70
# 36–48 Hours	55
# >48 Hours	    0







from typing import Dict



#as freshnes score is their in config/news_weights.py file code
from config.news_weights import (
    FRESHNESS_SCORES,
)


class FreshnessScorer:

    def score(
        self,
        article: Dict
    ) -> Dict:

        age = article.get("age_hours")

        article["freshness_score"] = self.calculate(age)

        return article

    # ------------------------------------------------

    def calculate(
        self,
        age_hours: float
    ) -> int:

        if age_hours is None:
            return 0

        if age_hours <= 1:
            return 100

        if age_hours <= 3:
            return 98

        if age_hours <= 6:
            return 95

        if age_hours <= 12:
            return 92

        if age_hours <= 24:
            return 85

        if age_hours <= 36:
            return 70

        if age_hours <= 48:
            return 55

        return 0


freshness_scorer = FreshnessScorer()


