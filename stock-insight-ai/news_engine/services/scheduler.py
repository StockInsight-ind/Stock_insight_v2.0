"""
scheduler.py

Periodically refreshes stock news.

Responsibilities
----------------
✓ Run every N minutes
✓ Refresh latest news
✓ Pre-warm cache (future)
"""


#this is the logic for refreshing news its still needs to be developed 




import time

from config.settings import (
    FETCH_INTERVAL_MINUTES,
)

from services.news_service import (
    news_service,
)


class NewsScheduler:

    def __init__(self):

        self.interval = (
            FETCH_INTERVAL_MINUTES * 60
        )

    # -------------------------------------------------

    def start(
        self,
        jobs,
    ):
        """
        jobs

        [

            ("USA","AAPL"),

            ("USA","MSFT"),

            ("INDIA","RELIANCE"),

            ("AUSTRALIA","BHP")

        ]
        """

        print("=" * 70)

        print("News Scheduler Started")

        print("=" * 70)

        while True:

            for market, symbol in jobs:

                try:

                    print(
                        f"Refreshing {market} {symbol}"
                    )

                    news_service.get_news(

                        market=market,

                        symbol=symbol,

                    )

                except Exception as e:

                    print(e)

            print(

                f"Sleeping {FETCH_INTERVAL_MINUTES} minutes..."

            )

            time.sleep(self.interval)


news_scheduler = NewsScheduler()