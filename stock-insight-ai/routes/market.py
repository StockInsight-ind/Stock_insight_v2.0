from controller.market_controller import (
    
    get_commodities,
    get_forex,
    get_indices,
    get_sentiment,
    get_global_news_feed
)

from fastapi import APIRouter


router = APIRouter(
    prefix="/market",
    tags=["Market"]
)



@router.get("/commodities")
def commodities():
    return get_commodities()


@router.get("/forex")
def forex():
    return get_forex()


@router.get("/indices")
def indices():
    return get_indices()

@router.get("/sentiment")
def sentiment():
    return get_sentiment()


@router.get("/global_news")
async def global_news():
    news = await get_global_news_feed()
    return {
        "status": "success",
        "global_news": news
    }