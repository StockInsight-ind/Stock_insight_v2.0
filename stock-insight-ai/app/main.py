# # # from fastapi import FastAPI

# # # app = FastAPI()

# # # @app.get("/health")
# # # def health():
# # #     return {"status": "healthy"}

# # from fastapi import FastAPI
# # from app.GlobalMarketIndices import get_global_indices

# # app = FastAPI()


# # @app.get("/")
# # def home():
# #     return {
# #         "message": "Stock Insights API Running"
# #     }


# # @app.get("/health")
# # def health():
# #     return {
# #         "status": "healthy"
# #     }


# # @app.get("/global-indices")
# # def global_indices():
# #     return get_global_indices()

# from fastapi import FastAPI
# from app.GlobalMarketIndices import get_global_indices

# app = FastAPI()


# @app.get("/")
# def home():
#     return {
#         "message": "Stock Insights API Running"
#     }


# @app.get("/health")
# def health():
#     return {
#         "status": "healthy"
#     }


# @app.get("/global-indices")
# def global_indices():
#     return get_global_indices()from fastapi import FastAPI
# from app.GlobalMarketIndices import get_global_indices

# app = FastAPI()


# @app.get("/")
# def home():
#     return {
#         "message": "Stock Insights API Running"
#     }


# @app.get("/health")
# def health():
#     return {
#         "status": "healthy"
#     }


# @app.get("/global-indices")
# def global_indices():
#     return get_global_indices()from fastapi import FastAPI
# from app.GlobalMarketIndices import get_global_indices

# app = FastAPI()


# @app.get("/")
# def home():
#     return {
#         "message": "Stock Insights API Running"
#     }


# @app.get("/health")
# def health():
#     return {
#         "status": "healthy"
#     }


# @app.get("/global-indices")
# def global_indices():
#     return get_global_indices()


from fastapi import FastAPI
from app.GlobalMarketIndices import get_global_indices
from app.GlobalCommodities import get_global_commodities
from app.GlobalForexMarket import get_global_forex
from app.MarketSentiment import get_market_sentiment

app = FastAPI()


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


@app.get("/global-indices")
def global_indices():

    return get_global_indices()



@app.get("/global-commodities")
def global_commodities():

    return get_global_commodities()

@app.get("/global-forex")
def global_forex():

    return get_global_forex()

@app.get("/market-sentiment")
def market_sentiment():

    return get_market_sentiment()