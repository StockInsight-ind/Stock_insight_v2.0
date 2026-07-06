from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
import hashlib

# Maximum article age
MAX_HOURS = 24

# High quality sources
ALLOWED_SOURCES = {
    "Reuters Business",
    "Reuters World",
    "BBC Business",
    "CNBC",
    "AP",
    "Oil",
    "Gold",
    "Federal Reserve",
    "OPEC",
    "Middle East"
}

# Financial keywords
FINANCE_KEYWORDS = [

    "oil",
    "brent",
    "wti",
    "natural gas",
    "lng",
    "gold",
    "silver",
    "copper",
    "uranium",
    "coal",

    "inflation",
    "cpi",
    "ppi",

    "interest rate",
    "rate cut",
    "rate hike",

    "federal reserve",
    "fomc",
    "ecb",
    "bank of japan",
    "rbi",
    "rba",

    "gdp",
    "pmi",
    "recession",

    "non farm payroll",
    "unemployment",

    "opec",
    "opec+",

    "treasury",
    "bond",
    "yield",

    "tariff",
    "trade war",

    "china",
    "taiwan",
    "russia",
    "ukraine",
    "iran",
    "israel",
    "middle east",

    "stock market",
    "dow",
    "nasdaq",
    "s&p",
    "sensex",
    "nifty",
    "vix",

    "apple",
    "microsoft",
    "tesla",
    "amazon",
    "nvidia",
    "tsmc",

    "earnings",
    "revenue",
    "profit"
]

# Ignore keywords
IGNORE_KEYWORDS = [

    "football",
    "soccer",
    "cricket",

    "movie",
    "actor",
    "actress",
    "celebrity",

    "music",
    "concert",

    "recipe",

    "fashion",

    "lottery",

    "horoscope",

    "wedding",

    "tv show"
]


seen_articles = set()


def parse_date(date_string):

    try:
        return parsedate_to_datetime(date_string).astimezone(timezone.utc)
    except:
        return None


def is_recent(article):

    published = parse_date(article["published"])

    if published is None:
        return False

    age = datetime.now(timezone.utc) - published

    return age.total_seconds() <= MAX_HOURS * 3600


def has_finance_keyword(article):

    text = (
        article["title"] +
        " " +
        article["summary"]
    ).lower()

    return any(word in text for word in FINANCE_KEYWORDS)


def has_ignore_keyword(article):

    text = (
        article["title"] +
        " " +
        article["summary"]
    ).lower()

    return any(word in text for word in IGNORE_KEYWORDS)


def is_duplicate(article):

    text = article["title"].strip().lower()

    article_hash = hashlib.md5(text.encode()).hexdigest()

    if article_hash in seen_articles:
        return True

    seen_articles.add(article_hash)

    return False


def filter_articles(articles):

    filtered = []

    for article in articles:

        if not is_recent(article):
            continue

        if has_ignore_keyword(article):
            continue

        if not has_finance_keyword(article):
            continue

        if is_duplicate(article):
            continue

        filtered.append(article)

    return filtered