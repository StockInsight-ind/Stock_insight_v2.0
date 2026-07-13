"""
duplicate_filter.py

Removes duplicate and near-duplicate news articles.

Responsibilities
----------------
✓ Remove identical news
✓ Remove near duplicate headlines
✓ Keep highest quality article

No ranking.
No company matching.
"""

from difflib import SequenceMatcher
from typing import Dict, List

from data.settings import (
    TITLE_SIMILARITY_THRESHOLD,
    SUMMARY_SIMILARITY_THRESHOLD,
)


class DuplicateFilter:

    def __init__(self):

        self.title_threshold = TITLE_SIMILARITY_THRESHOLD

        self.summary_threshold = SUMMARY_SIMILARITY_THRESHOLD

    # ----------------------------------------------------

    def filter(
        self,
        articles: List[Dict]
    ) -> List[Dict]:

        unique_articles = []

        for article in articles:

            if not self.is_duplicate(
                article,
                unique_articles,
            ):
                unique_articles.append(article)

        return unique_articles

    # ----------------------------------------------------

    def is_duplicate(
        self,
        article: Dict,
        existing_articles: List[Dict],
    ) -> bool:

        for existing in existing_articles:

            if self.compare(article, existing):

                return True

        return False

    # ----------------------------------------------------

    def compare(
        self,
        article1: Dict,
        article2: Dict,
    ) -> bool:

        title_similarity = self.similarity(

            article1.get("title", ""),

            article2.get("title", ""),

        )

        if title_similarity >= self.title_threshold:

            return True

        summary_similarity = self.similarity(

            article1.get("summary", ""),

            article2.get("summary", ""),

        )

        if summary_similarity >= self.summary_threshold:

            return True

        return False

    # ----------------------------------------------------

    @staticmethod
    def similarity(
        text1: str,
        text2: str,
    ) -> float:

        return SequenceMatcher(

            None,

            text1.lower(),

            text2.lower(),

        ).ratio()


duplicate_filter = DuplicateFilter()