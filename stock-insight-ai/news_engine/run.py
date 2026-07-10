"""
run.py

Test runner for the Stock Insight News Engine
"""

import json

from services.news_service import news_service


def main():

    # ============================================
    # Hardcode values here for testing
    # ============================================

    MARKET = "USA"
    SYMBOL = "AAPL"

    # Examples
    # MARKET = "USA"
    # SYMBOL = "NVDA"

    # MARKET = "INDIA"
    # SYMBOL = "RELIANCE"

    # MARKET = "INDIA"
    # SYMBOL = "TCS"

    # MARKET = "AUSTRALIA"
    # SYMBOL = "BHP"

    print("=" * 80)
    print("Stock Insight News Engine")
    print("=" * 80)

    print(f"Market : {MARKET}")
    print(f"Symbol : {SYMBOL}")

    print()

    result = news_service.get_news(

        market=MARKET,

        symbol=SYMBOL,

    )

    print()

    print("=" * 80)
    print("FINAL JSON")
    print("=" * 80)

    print(

        json.dumps(

            result,

            indent=4,

            default=str

        )

    )


if __name__ == "__main__":

    main()