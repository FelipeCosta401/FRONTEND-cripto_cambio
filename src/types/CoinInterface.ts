
export interface newFavoriteCoinInterface{
    symbol: string,
    image: string
    name: string
}

export interface CoinGekkoInterface extends newFavoriteCoinInterface{
    id: string,
}