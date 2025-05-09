import useCoin from "@/hooks/useCoin"

import type { CoinGekkoInterface } from "@/types/CoinInterface"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import { FaTrash } from "react-icons/fa"
import { useEffect } from "react"

const FavoriteCoinsPage = () => {
    const { favoriteCoinList, handleFavoriteCoin, getFavoriteCoinList } = useCoin()

    useEffect(() => {
        getFavoriteCoinList()
    }, [])

    async function removeCoin(coin: CoinGekkoInterface) {
        handleFavoriteCoin(coin)
        toast.success("Moeda removida das favoritas!")
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Moedas favoritadas</CardTitle>
                    <CardDescription>Gerencia suas cripto-moedas preferidas por aqui!</CardDescription>
                </CardHeader>
                {
                    favoriteCoinList.length ?

                        <CardContent className="space-y-4">
                            {favoriteCoinList.map((coin) => (
                                <Card key={coin.coinSymbol} className="flex-row justify-between items-center p-2">
                                    <section className="flex items-center gap-4">
                                        <img src={coin.image} className="size-10" />
                                        <CardTitle>
                                            {coin.coinName}
                                        </CardTitle>
                                    </section>
                                    <Button
                                        type="button"
                                        variant={"ghost"}
                                        size={"icon"}
                                        className="rounded-full"
                                        onClick={() => removeCoin({ symbol: coin.coinSymbol, image: coin.image, name: coin.coinName })}
                                    >
                                        <FaTrash />
                                    </Button>
                                </Card>
                            ))}
                        </CardContent>
                        :
                        <CardContent>
                            <CardDescription>Aparentemente você não possui nenhuma moeda favoritada...</CardDescription>
                        </CardContent>
                }
            </Card>
        </div >
    )
}

export default FavoriteCoinsPage