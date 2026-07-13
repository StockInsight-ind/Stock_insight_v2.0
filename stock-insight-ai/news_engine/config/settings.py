"""
settings.py

Global configuration for the
Stock Insight News Engine.

This file should ONLY contain configurable values.

No business logic.
"""

from pathlib import Path

# ==========================================================
# Project Information
# ==========================================================

PROJECT_NAME = "Stock Insight News Engine"

VERSION = "1.0.0"

ENVIRONMENT = "development"

DEBUG = True

# ==========================================================
# Paths
# ==========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

CACHE_DIR = BASE_DIR / "cache"

LOG_DIR = BASE_DIR / "logs"

TEMP_DIR = BASE_DIR / "temp"

# ==========================================================
# News Collection
# ==========================================================

MAX_ARTICLES = 10

MIN_ARTICLES = 5

MAX_NEWS_AGE_HOURS = 48

FETCH_INTERVAL_MINUTES = 15

RSS_REQUEST_TIMEOUT = 20

RSS_MAX_RETRIES = 3

RSS_RETRY_DELAY_SECONDS = 5

MAX_PARALLEL_REQUESTS = 10

USER_AGENT = (
    "StockInsightNewsEngine/1.0 "
    "(https://stockinsight.ai)"
)

# ==========================================================
# HTTP Settings
# ==========================================================

HTTP_TIMEOUT = 20

HTTP_CONNECT_TIMEOUT = 10

VERIFY_SSL = True

FOLLOW_REDIRECTS = True

# ==========================================================
# Cache
# ==========================================================

ENABLE_CACHE = True

CACHE_TTL_SECONDS = 900      # 15 minutes

CACHE_MAX_ITEMS = 5000

# ==========================================================
# Duplicate Detection
# ==========================================================

REMOVE_DUPLICATES = True

TITLE_SIMILARITY_THRESHOLD = 0.90

SUMMARY_SIMILARITY_THRESHOLD = 0.85

# ==========================================================
# Language
# ==========================================================

DEFAULT_LANGUAGE = "en"

SUPPORTED_LANGUAGES = [

    "en",

]

# ==========================================================
# Ranking
# ==========================================================

ENABLE_RANKING = True

MIN_SOURCE_SCORE = 85

MIN_RELEVANCE_SCORE = 70

MIN_FINAL_SCORE = 75

# ==========================================================
# Filtering
# ==========================================================

FILTER_SPAM = True

FILTER_CLICKBAIT = True

FILTER_OLD_NEWS = True

FILTER_NON_ENGLISH = True

FILTER_DUPLICATES = True

FILTER_LOW_QUALITY = True

# ==========================================================
# Scheduler
# ==========================================================

ENABLE_SCHEDULER = True

SCHEDULER_INTERVAL_MINUTES = 15

RUN_ON_STARTUP = True

# ==========================================================
# Logging
# ==========================================================

LOG_LEVEL = "INFO"

LOG_FILE = LOG_DIR / "news_engine.log"

LOG_ROTATION = "10 MB"

LOG_RETENTION_DAYS = 30

# ==========================================================
# API Response
# ==========================================================

RETURN_SUMMARY = True

RETURN_IMAGE = True

RETURN_SOURCE = True

RETURN_PUBLISHED_TIME = True

RETURN_SCORE = True

RETURN_DESCRIPTION = True

RETURN_CATEGORY = True

# ==========================================================
# Performance
# ==========================================================

ENABLE_MULTITHREADING = True

MAX_WORKERS = 8

BATCH_SIZE = 100

# ==========================================================
# Future AI Features
# ==========================================================

ENABLE_AI_SUMMARY = False

ENABLE_SENTIMENT_ANALYSIS = False

ENABLE_EVENT_CLASSIFICATION = False

ENABLE_TOPIC_CLASSIFICATION = False

ENABLE_ENTITY_EXTRACTION = False

# ==========================================================
# RSS Feed Limits
# ==========================================================

MAX_FEEDS_PER_MARKET = 20

MAX_ARTICLES_PER_FEED = 30

MAX_TOTAL_FETCH = 500

# ==========================================================
# Company Matching
# ==========================================================

MATCH_SYMBOL = True

MATCH_COMPANY_NAME = True

MATCH_COMPANY_ALIAS = True

MATCH_CASE_INSENSITIVE = True

# ==========================================================
# Freshness
# ==========================================================

PREFER_BREAKING_NEWS = True

BREAKING_NEWS_HOURS = 6

# ==========================================================
# Development
# ==========================================================

SAVE_RAW_FEEDS = False

SAVE_FILTERED_FEEDS = False

SAVE_FINAL_RESULTS = False

PRINT_DEBUG_LOGS = True

# ==========================================================
# Health Checks
# ==========================================================

MIN_ACTIVE_SOURCES = 5

ALLOW_EMPTY_RESPONSE = True

# ==========================================================
# Helper Functions
# ==========================================================

def is_debug():

    return DEBUG


def cache_enabled():

    return ENABLE_CACHE


def scheduler_enabled():

    return ENABLE_SCHEDULER


def ranking_enabled():

    return ENABLE_RANKING


def get_cache_ttl():

    return CACHE_TTL_SECONDS


def get_fetch_interval():

    return FETCH_INTERVAL_MINUTES


def get_max_news_age():

    return MAX_NEWS_AGE_HOURS


def get_max_articles():

    return MAX_ARTICLES


def get_min_articles():

    return MIN_ARTICLES


def get_log_file():

    return LOG_FILE


def get_user_agent():

    return USER_AGENT