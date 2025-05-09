import CoinService from "@/services/CoinService"
import type { CoinGekkoInterface, CoinInterface } from "@/types/CoinInterface"
import { useEffect, useState } from "react"

import { toast } from "sonner"

const coinService = new CoinService()

const useCoin = () => {
    const [favoriteCoinList, setFavoriteCoinList] = useState<CoinInterface[]>(() => {
        const stored = localStorage.getItem("favoriteCoins")
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        favoriteCoinList && localStorage.setItem("favoriteCoins", JSON.stringify(favoriteCoinList))
    }, [favoriteCoinList])

    async function getAllCoins() {
        try {
            const { coinList } = await coinService.getAllCoins()


            const sortedList = coinList.sort((a, b) => {
                const aIsFav = favoriteCoinList.some(fav =>
                    fav.coinName === a.name &&
                    fav.coinSymbol === a.symbol &&
                    fav.image === a.image
                )
                const bIsFav = favoriteCoinList.some(fav =>
                    fav.coinName === b.name &&
                    fav.coinSymbol === b.symbol &&
                    fav.image === b.image
                )

                if (aIsFav === bIsFav) return 0
                return aIsFav ? -1 : 1
            })

            return sortedList
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    async function handleFavoriteCoin({ image, name: coinName, symbol: coinSymbol }: CoinGekkoInterface) {
        try {
            const coinList = await coinService.handleFavorite({ image, coinName, coinSymbol })
            setFavoriteCoinList(coinList)
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    return { getAllCoins, handleFavoriteCoin, favoriteCoinList }

}

export default useCoin