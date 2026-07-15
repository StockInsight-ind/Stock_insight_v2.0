#Is this article good enough to show to the user? that sis main motto of this code 



# """
# quality_filter.py

# Filters low-quality news articles before ranking.

# Responsibilities
# ----------------
# ✓ Remove invalid articles
# ✓ Remove spam
# ✓ Remove clickbait
# ✓ Remove weak sources
# ✓ Keep only high-quality articles

# No ranking.
# """

# from typing import Dict, List

# from config.news_weights import (
#     get_source_score,
#     QUALITY,
# )

# from config.keywords import (
#     SPAM_KEYWORDS,
# )


# class QualityFilter:

#     def __init__(self):

#         self.minimum_source = QUALITY[
#             "minimum_source_score"
#         ]

#     # ---------------------------------------------

#     def filter(
#         self,
#         articles: List[Dict]
#     ) -> List[Dict]:

#         quality_articles = []

#         for article in articles:

#             if self.is_quality_article(article):

#                 article["source_score"] = (
#                     get_source_score(
#                         article.get(
#                             "source",
#                             "Unknown"
#                         )
#                     )
#                 )

#                 quality_articles.append(article)

#         return quality_articles

#     # ---------------------------------------------

#     def is_quality_article(
#         self,
#         article: Dict
#     ) -> bool:

#         title = article.get("title", "").strip()
#         summary = article.get("summary", "").strip()
#         url = article.get("url", "").strip()
#         source = article.get("source", "Unknown").strip()

#         if not title:
#             print("Rejected -> Missing title")
#             return False

#         if not summary:
#             print(f"Rejected -> Missing summary | {title}")
#             article["summary"] = "No summary available."

#         if not url:
#             print(f"Rejected -> Missing URL | {title}")
#             return False

#         if not source:
#             print(f"Rejected -> Missing source | {title}")
#             return False

#         if self.is_spam(article):
#             print(f"Rejected -> Spam | {title}")
#             return False

#         source_score = get_source_score(source)

#         print(
#             f"Source: {source} | Score: {source_score}"
#         )

#         article["source_score"] = source_score

#         if source_score < self.minimum_source:
#             print(
#                 f"Rejected -> Low source score ({source_score}) | {title}"
#             )
#             return False

#         return True
#         # ---------------------------------------------

#     def is_spam(
#         self,
#         article: Dict
#     ) -> bool:

#         text = (

#             article.get("title", "")

#             + " "

#             + article.get("summary", "")

#         ).lower()

#         for keyword in SPAM_KEYWORDS:

#             if keyword in text:

#                 return True

#         return False


# quality_filter = QualityFilter()













"""
quality_filter.py

Lightweight quality filter for development.

Only removes obviously broken or spam articles.
"""

from typing import Dict, List

from data.news_weights import get_source_score
from data.keywords import SPAM_KEYWORDS


class QualityFilter:

    def __init__(self):
        pass

    # -----------------------------------------------------

    def filter(
        self,
        articles: List[Dict]
    ) -> List[Dict]:

        quality_articles = []

        for article in articles:

            if self.is_quality_article(article):

                article["source_score"] = get_source_score(
                    article.get("source", "Unknown")
                )

                quality_articles.append(article)

        return quality_articles

    # -----------------------------------------------------

    def is_quality_article(
        self,
        article: Dict
    ) -> bool:

        # Must have title
        title = article.get("title", "").strip()

        if not title:
            return False

        # URL is optional but if present must look valid
        url = article.get("url", "").strip()

        if url and not url.startswith(("http://", "https://")):
            return False

        # Add default values if missing
        if not article.get("summary"):
            article["summary"] = ""

        if not article.get("source"):
            article["source"] = "Unknown"

        # Only reject obvious spam
        if self.is_spam(article):
            return False

        return True

    # -----------------------------------------------------

    def is_spam(
        self,
        article: Dict
    ) -> bool:

        text = (
            article.get("title", "")
            + " "
            + article.get("summary", "")
        ).lower()

        for keyword in SPAM_KEYWORDS:

            if keyword in text:
                return True

        return False


quality_filter = QualityFilter()