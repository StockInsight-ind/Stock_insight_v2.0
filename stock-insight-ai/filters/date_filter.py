"""
date_filter.py

Filters articles based on publication date.

Responsibilities
----------------
✓ Parse RSS published date
✓ Calculate article age
✓ Remove articles older than configured limit
✓ Add age_hours to article

No ranking.
No duplicate detection.
"""

from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from typing import Dict, List

from data.settings import MAX_NEWS_AGE_HOURS


class DateFilter:

    def __init__(self):

        self.max_age_hours = MAX_NEWS_AGE_HOURS

    # --------------------------------------------------

    def filter(
        self,
        articles: List[Dict]
    ) -> List[Dict]:

        filtered = []

        now = datetime.now(timezone.utc)

        for article in articles:

            published = self.parse_date(
                article.get("published", "")
            )

            if published is None:
                continue

            age = (
                now - published
            ).total_seconds() / 3600

            if age <= self.max_age_hours:

                article["published_datetime"] = published

                article["age_hours"] = round(age, 2)

                filtered.append(article)

        return filtered

    # --------------------------------------------------

    def parse_date(
        self,
        date_string: str
    ):

        if not date_string:
            return None

        try:

            dt = parsedate_to_datetime(
                date_string
            )

            if dt.tzinfo is None:

                dt = dt.replace(
                    tzinfo=timezone.utc
                )

            return dt.astimezone(
                timezone.utc
            )

        except Exception:

            return None


date_filter = DateFilter()