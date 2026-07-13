"""
source_score.py

Calculates credibility score for the news source.

Responsibilities
----------------
✓ Score news source credibility
✓ Normalize source names
✓ Store source score

No filtering.
No ranking.
No freshness scoring.
"""




#mala svatala ghanta mahit nahe ahee hae kay karat ahee.........zaude dae soudun 
#garaz kay ahe heche kay mahit........soruce la score daet ahe haa bakal............already source cnbc ani offical website madhun yaet ahet tare........gandit mazz ahe chatgpt chya 


from typing import Dict

from config.news_weights import (
    SOURCE_SCORES,
)


class SourceScorer:

    def __init__(self):

        # Normalize keys for faster lookup
        self.source_scores = {
            key.lower(): value
            for key, value in SOURCE_SCORES.items()
        }

    # ------------------------------------------------

    def score(
        self,
        article: Dict
    ) -> Dict:

        source = article.get("source", "")

        article["source_score"] = self.calculate(source)

        return article

    # ------------------------------------------------

    def calculate(
        self,
        source: str
    ) -> int:

        if not source:
            return self.source_scores["unknown"]

        source = source.lower().strip()

        # Exact Match
        if source in self.source_scores:
            return self.source_scores[source]

        # Partial Match
        for known_source, score in self.source_scores.items():

            if known_source in source:

                return score

        return self.source_scores["unknown"]


source_scorer = SourceScorer()