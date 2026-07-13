# """
# rss_sources.py

# Central RSS configuration for the Stock Insight News Engine.

# This file ONLY stores RSS sources.

# No fetching logic should be written here.
# """

# from urllib.parse import quote_plus

# # ==========================================================
# # Google News RSS Templates
# # ==========================================================

# GOOGLE_NEWS = {
#     "GLOBAL":
#         "https://news.google.com/rss/search?q={query}",

#     "USA":
#         "https://news.google.com/rss/search?q={query}+when:2d&hl=en-US&gl=US&ceid=US:en",

#     "INDIA":
#         "https://news.google.com/rss/search?q={query}+when:2d&hl=en-IN&gl=IN&ceid=IN:en",

#     "AUSTRALIA":
#         "https://news.google.com/rss/search?q={query}+when:2d&hl=en-AU&gl=AU&ceid=AU:en",
# }

# # ==========================================================
# # Yahoo Finance RSS
# # ==========================================================

# YAHOO_FINANCE = {
#     "COMPANY":
#         "https://feeds.finance.yahoo.com/rss/2.0/headline?s={symbol}&region=US&lang=en-US"
# }

# # ==========================================================
# # Reuters
# # ==========================================================

# REUTERS = [
#     "https://www.reutersagency.com/feed/?best-topics=business-finance",
# ]

# # ==========================================================
# # CNBC
# # ==========================================================

# CNBC = [
#     "https://www.cnbc.com/id/100003114/device/rss/rss.html",
# ]

# # ==========================================================
# # MarketWatch
# # ==========================================================

# MARKETWATCH = [
#     "https://feeds.content.dowjones.io/public/rss/mw_topstories",
# ]

# # ==========================================================
# # Investing.com
# # ==========================================================

# INVESTING = [
#     "https://www.investing.com/rss/news.rss",
# ]

# # ==========================================================
# # Seeking Alpha
# # ==========================================================

# SEEKING_ALPHA = [
#     "https://seekingalpha.com/feed.xml",
# ]

# # ==========================================================
# # Benzinga
# # ==========================================================

# BENZINGA = [
#     "https://www.benzinga.com/feed",
# ]

# # ==========================================================
# # Official Exchange News
# # ==========================================================

# EXCHANGES = {

#     "USA": [
#         "https://www.sec.gov/rss/litigation/litreleases.xml",
#         "https://www.sec.gov/rss/news/press.xml",
#     ],

#     "INDIA": [
#         "https://www.nseindia.com/rss/latest.xml",
#     ],

#     "AUSTRALIA": [
#         "https://www.asx.com.au/rss/asx-announcements.xml",
#     ],
# }

# # ==========================================================
# # India Financial Sources
# # ==========================================================

# INDIA_SOURCES = [

#     "https://www.moneycontrol.com/rss/business.xml",

#     "https://www.moneycontrol.com/rss/MCtopnews.xml",

#     "https://www.business-standard.com/rss/home_page_top_stories.rss",

#     "https://www.financialexpress.com/feed/",

#     "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",

# ]

# # ==========================================================
# # Australia Sources
# # ==========================================================

# AUSTRALIA_SOURCES = [

#     "https://www.afr.com/rss",

#     "https://www.abc.net.au/news/feed/51120/rss.xml",

# ]

# # ==========================================================
# # USA Sources
# # ==========================================================

# USA_SOURCES = [

#     *REUTERS,

#     *CNBC,

#     *MARKETWATCH,

#     *INVESTING,

#     *BENZINGA,

#     *SEEKING_ALPHA,

# ]

# # ==========================================================
# # Global Macro News
# # ==========================================================

# GLOBAL_MACRO = [

#     "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",

#     "https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml",

# ]

# # ==========================================================
# # Master Mapping
# # ==========================================================

# RSS_SOURCES = {

#     "USA": USA_SOURCES,

#     "INDIA": INDIA_SOURCES,

#     "AUSTRALIA": AUSTRALIA_SOURCES,

#     "GLOBAL": GLOBAL_MACRO,

# }

# # ==========================================================
# # Dynamic Feed Builder
# # ==========================================================

# def build_google_news_url(
#     market: str,
#     symbol: str
# ) -> str:
#     """
#     Example:
#     Apple OR AAPL
#     Reliance Industries OR RELIANCE
#     BHP OR BHP.AX
#     """

#     template = GOOGLE_NEWS.get(
#         market.upper(),
#         GOOGLE_NEWS["GLOBAL"]
#     )

#     query = quote_plus(f'"{company}" OR {symbol}')

#     return template.format(query=query)


# def build_yahoo_url(symbol: str):

#     return YAHOO_FINANCE["COMPANY"].format(
#         symbol=symbol
#     )


# def get_market_sources(market: str):

#     return RSS_SOURCES.get(
#         market.upper(),
#         []
#     )


# def get_exchange_sources(market: str):

#     return EXCHANGES.get(
#         market.upper(),
#         []
#     )


# def build_company_sources(
#     market,
#     symbol
# ):
#     """
#     Returns all RSS feeds that should be fetched
#     for a specific company.
#     """

#     feeds = []

#     feeds.extend(
#         get_market_sources(market)
#     )

#     feeds.extend(
#         get_exchange_sources(market)
#     )

#     feeds.append(
#         build_google_news_url(
#             market,
#             symbol
#         )
#     )

#     feeds.append(
#         build_yahoo_url(symbol)
#     )

#     return list(dict.fromkeys(feeds))














"""
rss_sources.py

Central configuration file.

Stores ONLY RSS feed configuration.

No URL generation.
No fetching.
No business logic.
"""

# ==========================================================
# Google News Configuration
# ==========================================================

GOOGLE_NEWS = {

    "GLOBAL": {
        "hl": "en",
        "gl": "US",
        "ceid": "US:en",
    },

    "USA": {
        "hl": "en-US",
        "gl": "US",
        "ceid": "US:en",
    },

    "INDIA": {
        "hl": "en-IN",
        "gl": "IN",
        "ceid": "IN:en",
    },

    "AUSTRALIA": {
        "hl": "en-AU",
        "gl": "AU",
        "ceid": "AU:en",
    },

}

# ==========================================================
# Yahoo Finance
# ==========================================================

YAHOO_FINANCE = {

    "rss_template":

    "https://finance.yahoo.com/rss/headline?s={symbol}"

}

# ==========================================================
# USA Market Sources
# ==========================================================

USA_SOURCES = [

    "https://www.cnbc.com/id/100003114/device/rss/rss.html",

    "https://feeds.feedburner.com/marketwatch/topstories",

]

# ==========================================================
# India Sources
# ==========================================================

INDIA_SOURCES = [

    "https://www.moneycontrol.com/rss/business.xml",

    "https://www.moneycontrol.com/rss/MCtopnews.xml",

    "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",

]

# ==========================================================
# Australia Sources
# ==========================================================

AUSTRALIA_SOURCES = [

    "https://www.abc.net.au/news/feed/51120/rss.xml",

]

# ==========================================================
# Exchange Feeds
# ==========================================================

EXCHANGES = {

    "USA": [

    ],

    "INDIA": [

    ],

    "AUSTRALIA": [

    ],

}

# ==========================================================
# Global Market News
# ==========================================================

GLOBAL_MACRO = [

]

# ==========================================================
# RSS Mapping
# ==========================================================

RSS_SOURCES = {

    "USA": {

        "market": USA_SOURCES,

        "macro": GLOBAL_MACRO,

    },

    "INDIA": {

        "market": INDIA_SOURCES,

        "macro": GLOBAL_MACRO,

    },

    "AUSTRALIA": {

        "market": AUSTRALIA_SOURCES,

        "macro": GLOBAL_MACRO,

    },

}