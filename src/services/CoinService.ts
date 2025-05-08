import CoinGekkoApi from "@/config/CoinGekkoApi"
import type { CoinGekkoInterface } from "@/types/CoinInterface"



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

}