"""
news_weights.py

Central scoring configuration for the
Stock Insight News Engine.

This file contains NO business logic.

Only scoring constants used by the ranking engine.
"""




#in short this will recive the news and acording to the news it will give the score to it like it will compare the news with the sources 
#for example tsla sare news came it will go thorugh each bewlo the compnenents and comapre if it is releavnt or came from good sources it will gve that exact weight to it like 95 or something 

# ==========================================================
# Final Ranking Weights
# Must sum to 1.0
# ==========================================================

RANKING_WEIGHTS = {

    "source": 0.35,

    "impact": 0.30,

    "freshness": 0.20,

    "relevance": 0.15,

}

# ==========================================================
# Source Credibility Scores
# 0-100
# ==========================================================

SOURCE_SCORES = {

    # Government / Official

    "SEC": 100,

    "ASX": 100,

    "NSE": 100,

    "BSE": 100,

    # Global News

    "Reuters": 99,

    "Bloomberg": 98,

    "Associated Press": 97,

    "Dow Jones": 97,

    # Financial

    "Wall Street Journal": 96,

    "Financial Times": 96,

    "CNBC": 95,

    "MarketWatch": 94,

    "Yahoo Finance": 93,

    "Morningstar": 92,

    "Benzinga": 90,

    "Seeking Alpha": 88,

    "Investing.com": 87,

    # India

    "Moneycontrol": 95,

    "Economic Times": 94,

    "Business Standard": 92,

    "Financial Express": 90,

    "LiveMint": 91,

    # Australia

    "AFR": 94,

    "ABC News": 91,

    # Generic

    "Google News": 85,

    "Unknown": 60,

}

# ==========================================================
# News Impact Scores
# Higher = More Market Moving
# ==========================================================

IMPACT_SCORES = {

    "bankruptcy": 100,

    "delisting": 100,

    "fraud": 100,

    "criminal investigation": 99,

    "earnings": 99,

    "quarterly results": 98,

    "guidance": 98,

    "profit warning": 98,

    "acquisition": 97,

    "merger": 97,

    "takeover": 97,

    "stock split": 96,

    "buyback": 96,

    "dividend": 95,

    "ceo": 95,

    "executive": 94,

    "fda": 94,

    "approval": 94,

    "lawsuit": 93,

    "patent": 92,

    "contract": 92,

    "partnership": 91,

    "investment": 90,

    "analyst upgrade": 89,

    "analyst downgrade": 89,

    "target price": 88,

    "product launch": 86,

    "conference": 82,

    "general": 60,

}

# ==========================================================
# Freshness Scores
# Age in hours
# ==========================================================

FRESHNESS_SCORES = {

    1: 100,

    3: 98,

    6: 95,

    12: 92,

    24: 85,

    36: 70,

    48: 55,

}

# ==========================================================
# Relevance Thresholds
# ==========================================================

RELEVANCE = {

    "excellent": 95,

    "very_high": 90,

    "high": 80,

    "good": 70,

    "medium": 60,

    "low": 40,

}

# ==========================================================
# Duplicate Detection
# ==========================================================

DUPLICATE = {

    "title_similarity": 0.90,

    "summary_similarity": 0.85,

}

# ==========================================================
# Quality Thresholds
# ==========================================================

QUALITY = {

    "minimum_source_score": 85,

    "minimum_relevance": 70,

    "minimum_final_score": 75,

}

# ==========================================================
# Article Selection
# ==========================================================

ARTICLE_LIMITS = {

    "maximum_articles": 10,

    "minimum_articles": 5,

}

# ==========================================================
# Date Filtering
# ==========================================================

DATE_FILTER = {

    "max_age_hours": 48,

}

# ==========================================================
# Cache
# ==========================================================

CACHE = {

    "refresh_minutes": 15,

}

# ==========================================================
# Scoring Bonuses
# ==========================================================

BONUSES = {

    "official_exchange": 8,

    "official_company": 8,

    "breaking_news": 5,

    "exclusive": 4,

    "press_release": 2,

}

# ==========================================================
# Scoring Penalties
# ==========================================================

PENALTIES = {

    "duplicate": -100,

    "clickbait": -20,

    "low_quality": -25,

    "unknown_source": -15,

    "old_news": -20,

}

# ==========================================================
# Helper Functions
# ==========================================================

def get_source_score(source: str) -> int:
    """
    Return credibility score for a news source.
    """

    if not source:
        return SOURCE_SCORES["Unknown"]

    return SOURCE_SCORES.get(
        source.strip(),
        SOURCE_SCORES["Unknown"]
    )


def get_impact_score(keyword: str) -> int:
    """
    Return impact score for a detected keyword.
    """

    if not keyword:
        return IMPACT_SCORES["general"]

    keyword = keyword.lower().strip()

    return IMPACT_SCORES.get(
        keyword,
        IMPACT_SCORES["general"]
    )


def get_freshness_score(hours_old: float) -> int:
    """
    Convert article age to freshness score.
    """

    if hours_old <= 1:
        return 100

    if hours_old <= 3:
        return 98

    if hours_old <= 6:
        return 95

    if hours_old <= 12:
        return 92

    if hours_old <= 24:
        return 85

    if hours_old <= 36:
        return 70

    if hours_old <= 48:
        return 55

    return 0


def get_ranking_weights():
    """
    Return final ranking weights.
    """

    return RANKING_WEIGHTS.copy()