"""
yahoo_finance.py

Yahoo Finance RSS Provider
"""

from data.rss_sources import YAHOO_FINANCE


class YahooFinanceProvider:

    def build(
        self,
        symbol: str,
    ) -> str:

        return YAHOO_FINANCE["rss_template"].format(
            symbol=symbol.upper()
        )


yahoo_finance_provider = YahooFinanceProvider()