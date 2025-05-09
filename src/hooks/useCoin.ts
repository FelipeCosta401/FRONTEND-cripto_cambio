import CoinService from "@/services/CoinService"

import { toast } from "sonner"

const coinService = new CoinService()

const useCoin = () => {

    async function getAllCoins() {
        try {
            const { coinList } = await coinService.getAllCoins()
            return coinList
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    return { getAllCoins }

}

export default useCoin