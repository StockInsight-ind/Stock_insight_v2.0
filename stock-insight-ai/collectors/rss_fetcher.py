"""
rss_fetcher.py

Generic RSS Fetcher for the Stock Insight News Engine.

Responsibilities

1. Download RSS feeds
2. Parse XML
3. Normalize articles
4. Return list of dictionaries

No filtering.
No ranking.
"""




#it will only  fetch the news from google rss and provide the it in xml fiel 

from typing import List, Dict

import feedparser
import requests

from data.settings import (
    HTTP_TIMEOUT,
    USER_AGENT,
)

HEADERS = {
    "User-Agent": USER_AGENT
}


class RSSFetcher:

    def __init__(self):

        self.timeout = HTTP_TIMEOUT

    def fetch(self, url: str) -> List[Dict]:
        """
        Fetch a single RSS feed.
        """

        try:

            response = requests.get(
                url,
                headers=HEADERS,
                timeout=self.timeout,
            )

            response.raise_for_status()

            feed = feedparser.parse(response.content)

            articles = []

            for entry in feed.entries:

                articles.append(
                    self._normalize(entry, feed)
                )

            return articles

        except Exception as e:

            print(f"RSS Error: {url}")

            print(e)

            return []

    def fetch_multiple(
        self,
        urls: List[str]
    ) -> List[Dict]:
        """
        Fetch multiple RSS feeds.
        """

        articles = []

        for url in urls:

            articles.extend(
                self.fetch(url)
            )

        return articles

    def _normalize(
        self,
        entry,
        feed,
    ) -> Dict:

        return {

            "title":
                entry.get("title", ""),

            "summary":
                entry.get(
                    "summary",
                    entry.get("description", "")
                ),

            "url":
                entry.get("link", ""),

            "published":
                entry.get(
                    "published",
                    entry.get(
                        "updated",
                        ""
                    )
                ),

            "source":
                feed.feed.get(
                    "title",
                    "Unknown"
                ),

        }


rss_fetcher = RSSFetcher()