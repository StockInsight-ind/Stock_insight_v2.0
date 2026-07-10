# from fastapi import FastAPI
# from routes.market import router as market_router


# app = FastAPI()
# app.include_router(market_router)


# @app.get("/")
# def root():

#     return {
#         "message": "Stock Insights AI API Running"
#     }


# @app.get("/health")
# def health():

#     return {
#         "status": "healthy"
#     }



from fastapi import FastAPI, Query
from news_engine.services.news_service import news_service

app = FastAPI(title="Stock Insight AI API")


@app.get("/")
def root():
    return {
        "message": "Stock Insights AI API Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/news")
def get_news(
    market: str = Query("USA"),
    symbol: str = Query("AAPL")
):
    return news_service.get_news(
        market=market,
        symbol=symbol,
    )

#command for running in curl format 
# curl http://localhost:8000/health
# curl "http://localhost:8000/news?market=USA&symbol=AAPL"

#add your prefered share in symbol and market 