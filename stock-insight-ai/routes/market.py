from controller.market_controller import (
    
    get_commodities,
    get_forex,
    get_indices,
    get_sentiment
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