import CoinGekkoApi from "@/config/CoinGekkoApi"
import Api from "@/config/Api"

import type { CoinGekkoInterface, newFavoriteCoinInterface } from "@/types/CoinInterface"

export default class CoinService {

    async getAllCoins() {
        return await CoinGekkoApi.get("/coins/markets?vs_currency=usd")
            .then((res: { data: CoinGekkoInterface[] }) => {
                const coinList = res.data

                return { coinList }
            }).catch((error) => {
                console.log(error)
                throw new Error("Erro ao buscar moedas!")
            })
    }

    async handleFavorite({ image, name, symbol }: newFavoriteCoinInterface) {
        return await Api.post("/favorites", {
            coinSymbol: symbol,
            coinName: name,
            image
        })
            .then((res: { data: { updatedFavoritesCoinsList: { coinSymbol: string }[] } }) => {
                const { updatedFavoritesCoinsList: favoriteList } = res.data

                const updatedFavoritesCoinsList: string[] = []

                favoriteList.forEach((coin) => {
                    updatedFavoritesCoinsList.push(coin.coinSymbol)
                })

                return updatedFavoritesCoinsList
            }).catch((error) => {
                console.log(error)
                throw new Error(error.response.data.error)
            })
    }

}