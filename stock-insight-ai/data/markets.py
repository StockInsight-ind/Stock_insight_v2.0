"""
markets.py

Central market configuration used across the
Stock Insight News Engine.

This file should NEVER contain business logic.

It only stores market metadata.
"""

from dataclasses import dataclass
from typing import Dict


# ==========================================================
# Market Configuration
# ==========================================================

@dataclass(frozen=True)
class Market:

    code: str

    name: str

    country: str

    currency: str

    timezone: str

    language: str

    exchange: str

    exchange_suffix: str

    google_region: str

    google_language: str

    enabled: bool = True


# ==========================================================
# Supported Markets
# ==========================================================

MARKETS: Dict[str, Market] = {

    "USA": Market(

        code="USA",

        name="United States",

        country="US",

        currency="USD",

        timezone="America/New_York",

        language="en",

        exchange="NASDAQ / NYSE",

        exchange_suffix="",

        google_region="US",

        google_language="en-US",

    ),

    "INDIA": Market(

        code="INDIA",

        name="India",

        country="IN",

        currency="INR",

        timezone="Asia/Kolkata",

        language="en",

        exchange="NSE / BSE",

        exchange_suffix=".NS",

        google_region="IN",

        google_language="en-IN",

    ),

    "AUSTRALIA": Market(

        code="AUSTRALIA",

        name="Australia",

        country="AU",

        currency="AUD",

        timezone="Australia/Sydney",

        language="en",

        exchange="ASX",

        exchange_suffix=".AX",

        google_region="AU",

        google_language="en-AU",

    ),

}


# ==========================================================
# Future Markets
# ==========================================================

FUTURE_MARKETS = [

    "CANADA",

    "UNITED_KINGDOM",

    "GERMANY",

    "FRANCE",

    "JAPAN",

    "SINGAPORE",

    "HONG_KONG",

    "SOUTH_KOREA",

    "CHINA",

    "TAIWAN",

]


# ==========================================================
# Supported Market List
# ==========================================================

SUPPORTED_MARKETS = list(MARKETS.keys())


# ==========================================================
# Default Market
# ==========================================================

DEFAULT_MARKET = "USA"


# ==========================================================
# Utility Functions
# ==========================================================

def is_supported_market(market: str) -> bool:
    """
    Check whether the market is supported.
    """

    return market.upper() in MARKETS


def get_market(market: str) -> Market:
    """
    Return Market object.

    Raises:
        ValueError
    """

    market = market.upper()

    if market not in MARKETS:
        raise ValueError(
            f"Unsupported market: {market}"
        )

    return MARKETS[market]


def get_exchange_suffix(market: str) -> str:

    return get_market(market).exchange_suffix


def get_currency(market: str) -> str:

    return get_market(market).currency


def get_timezone(market: str) -> str:

    return get_market(market).timezone


def get_exchange(market: str) -> str:

    return get_market(market).exchange


def get_country(market: str) -> str:

    return get_market(market).country


def get_google_region(market: str) -> str:

    return get_market(market).google_region


def get_google_language(market: str) -> str:

    return get_market(market).google_language


def get_market_name(market: str) -> str:

    return get_market(market).name


def get_language(market: str) -> str:

    return get_market(market).language


def get_enabled_markets():

    return [
        market.code
        for market in MARKETS.values()
        if market.enabled
    ]


# ==========================================================
# Exchange Mapping
# ==========================================================

EXCHANGE_TO_MARKET = {

    "NASDAQ": "USA",

    "NYSE": "USA",

    "AMEX": "USA",

    "NSE": "INDIA",

    "BSE": "INDIA",

    "ASX": "AUSTRALIA",

}


# ==========================================================
# Currency Mapping
# ==========================================================

CURRENCY_TO_MARKET = {

    "USD": "USA",

    "INR": "INDIA",

    "AUD": "AUSTRALIA",

}


# ==========================================================
# Symbol Helpers
# ==========================================================

def normalize_symbol(symbol: str, market: str) -> str:
    """
    Ensures symbol has the correct exchange suffix.

    Examples

    AAPL -> AAPL

    RELIANCE -> RELIANCE.NS

    BHP -> BHP.AX
    """

    symbol = symbol.upper().strip()

    suffix = get_exchange_suffix(market)

    if suffix and not symbol.endswith(suffix):
        symbol += suffix

    return symbol


def remove_exchange_suffix(symbol: str) -> str:

    symbol = symbol.upper()

    for market in MARKETS.values():

        suffix = market.exchange_suffix

        if suffix and symbol.endswith(suffix):
            return symbol.replace(suffix, "")

    return symbol