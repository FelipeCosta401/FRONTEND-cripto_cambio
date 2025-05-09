import CoinGekkoApi from "@/config/CoinGekkoApi"
import Api from "@/config/Api"

import type { CoinInterface, CoinGekkoInterface } from "@/types/CoinInterface"

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

    async handleFavorite({ image, coinName, coinSymbol }: CoinInterface) {
        return await Api.post("/favorites", {
            coinSymbol,
            coinName,
            image
        })
            .then((res: { data: { updatedFavoritesCoinsList: CoinInterface[] } }) => {

                return res.data.updatedFavoritesCoinsList
            }).catch((error) => {
                console.log(error)
                throw new Error(error.response.data.error)
            })
    }

    async getFavoriteCoinList() {
        return await Api.get("/favorites")
            .then((res: { data: { favoritesCoinsList: CoinInterface[] } }) => {
                const { favoritesCoinsList } = res.data

                return favoritesCoinsList

            }).catch((error) => {
                console.log(error)
                throw new Error(error.response.data.error)
            })
    }

}