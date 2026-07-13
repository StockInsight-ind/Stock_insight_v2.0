from fastapi import FastAPI
from routes.market import router as market_router


app = FastAPI()
app.include_router(market_router)


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
