from fastapi import APIRouter, Query
from controller.news_controller import get_user_news

router = APIRouter(
    prefix="/news",
    tags=["News"]
)




@router.get("/user_news")
def get_news(
    market: str = Query("USA"),
    symbol: str = Query("AAPL")
):
    return get_user_news(
        market=market,
        symbol=symbol,
    )

#command for running in curl format 
# curl http://localhost:8000/health
# curl "http://localhost:8000/news/user_news?market=USA&symbol=AAPL"

#add your prefered share in symbol and market 