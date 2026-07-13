"""
news_service.py

Main orchestration service for the
Stock Insight News Engine.

Pipeline

Backend
    ↓
RSS Builder
    ↓
RSS Fetch
    ↓
Market Filter
    ↓
Stock Matcher
    ↓
Date Filter
    ↓
Duplicate Filter
    ↓
Quality Filter
    ↓
Impact Score
    ↓
Freshness Score
    ↓
Source Score
    ↓
Ranking
    ↓
JSON Builder
"""









#this will proid eyou ig everything news each and evry articel ig 


from collectors.rss_fetcher import rss_fetcher

from filters.market_filter import market_filter
from filters.stock_matcher import stock_matcher
from filters.date_filter import date_filter
from filters.duplicate_filter import duplicate_filter
from filters.quality_filter import quality_filter

from ranking.impact_score import impact_scorer
from ranking.freshness_score import freshness_scorer
from ranking.source_score import source_scorer
from ranking.ranking_engine import ranking_engine

#from config.rss_sources import build_company_sources
from providers.provider_manager import provider_manager

from services.json_builder import json_builder


class NewsService:

    def __init__(self):
        pass

    # ---------------------------------------------------------

    def get_news(
        self,
        market: str,
        symbol: str,
    ):

        print("=" * 70)
        print("Stock Insight News Engine")
        print("=" * 70)

        print(f"Market : {market}")
        print(f"Symbol : {symbol}")

        # --------------------------------------------
        # Build RSS URLs
        # --------------------------------------------

        # rss_urls = build_company_sources(
        #     market=market,
        #     symbol=symbol,
        # )

        rss_urls = provider_manager.get_feeds(
            market=market,
            symbol=symbol,
        )
        print(f"RSS Feeds : {len(rss_urls)}")

        # --------------------------------------------
        # Fetch RSS
        # --------------------------------------------

        articles = rss_fetcher.fetch_multiple(
            rss_urls
        )

        print(f"Fetched : {len(articles)}")

        # --------------------------------------------
        # Market Filter
        # --------------------------------------------

        articles = market_filter.filter(
            articles,
            market,
        )

        print(f"After Market Filter : {len(articles)}")

        # --------------------------------------------
        # Stock Filter
        # --------------------------------------------

        articles = stock_matcher.filter(
            articles,
            symbol,
        )

        print(f"After Stock Filter : {len(articles)}")

        # --------------------------------------------
        # Date Filter
        # --------------------------------------------

        articles = date_filter.filter(
            articles
        )

        print(f"After Date Filter : {len(articles)}")

        # --------------------------------------------
        # Duplicate Filter
        # --------------------------------------------

        articles = duplicate_filter.filter(
            articles
        )

        print(f"After Duplicate Filter : {len(articles)}")

        # --------------------------------------------
        # Quality Filter
        # --------------------------------------------

        articles = quality_filter.filter(
            articles
        )

        print(f"After Quality Filter : {len(articles)}")

        # --------------------------------------------
        # Scoring
        # --------------------------------------------

        scored_articles = []

        for article in articles:

            article = impact_scorer.score(
                article
            )

            article = freshness_scorer.score(
                article
            )

            article = source_scorer.score(
                article
            )

            scored_articles.append(
                article
            )

        print(f"Scored : {len(scored_articles)}")

        # --------------------------------------------
        # Ranking
        # --------------------------------------------

        ranked_articles = ranking_engine.rank(
            scored_articles
        )

        print(f"Final Articles : {len(ranked_articles)}")

        # --------------------------------------------
        # JSON Response
        # --------------------------------------------

        response = json_builder.build(

            market=market,

            symbol=symbol,

            articles=ranked_articles,

        )

        return response


news_service = NewsService()