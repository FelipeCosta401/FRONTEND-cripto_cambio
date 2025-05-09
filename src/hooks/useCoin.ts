import CoinService from "@/services/CoinService"
import { useEffect, useState } from "react"

import { toast } from "sonner"

const coinService = new CoinService()

const useCoin = () => {
    const STORED_FAVORITE_COINS = localStorage.getItem("favoriteCoins")
    const DEFAULT_FAVORITE_COIN_LIST: string[] = STORED_FAVORITE_COINS ? JSON.parse(STORED_FAVORITE_COINS) : []
    const [favoriteCoinList, setFavoriteCoinList] = useState<string[]>(DEFAULT_FAVORITE_COIN_LIST)

    useEffect(() => {
        favoriteCoinList && localStorage.setItem("favoriteCoins", JSON.stringify(favoriteCoinList))
    }, [favoriteCoinList])

    async function getAllCoins() {
        try {
            const { coinList } = await coinService.getAllCoins()


            const sortedList = coinList.sort((a, b) => {
                const aIsFav = favoriteCoinList.includes(a.id)
                const bIsFav = favoriteCoinList.includes(b.id)
            
                if (aIsFav === bIsFav) return 0
                return aIsFav ? -1 : 1
            })

            return sortedList
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    async function handleFavoriteCoin(coinSymbol: string) {
        try {
            const coinList = await coinService.handleFavorite(coinSymbol)
            setFavoriteCoinList(coinList)
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    return { getAllCoins, handleFavoriteCoin, favoriteCoinList }

}

export default useCoin