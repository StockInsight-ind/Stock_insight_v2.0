import asyncio
import aiohttp
import feedparser
import json
from urllib.parse import quote
from data.global_events_or_news import RSS_FEEDS, TOPICS


# -----------------------------
# Generate Google RSS URLs
# -----------------------------

for topic in TOPICS:
    RSS_FEEDS.append(
        {
            "name": topic,
            "url": f"https://news.google.com/rss/search?q={quote(topic)}"
        }
    )

# -----------------------------
# Fetch RSS
# -----------------------------

async def fetch_feed(session, feed):

    try:

        async with session.get(feed["url"], timeout=20) as response:

            text = await response.text()

            parsed = feedparser.parse(text)

            articles = []

            for item in parsed.entries:

                articles.append(
                    {
                        "source": feed["name"],
                        "title": item.get("title", ""),
                        "link": item.get("link", ""),
                        "published": item.get("published", ""),
                        "summary": item.get("summary", "")
                    }
                )

            return articles

    except Exception as e:

        print(f"Failed : {feed['name']} -> {e}")

        return []




async def get_global_news_feed():
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_feed(session, feed) for feed in RSS_FEEDS]
        results = await asyncio.gather(*tasks)

    articles = []
    for result in results:
        articles.extend(result)

    return articles 
