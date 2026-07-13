from services.news_service import news_service

def get_user_news(
    market: str,
    symbol: str,
):
    return news_service.get_news(
        market=market,
        symbol=symbol,
    )