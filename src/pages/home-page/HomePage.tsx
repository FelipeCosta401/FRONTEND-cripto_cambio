import { useQuery } from "react-query"

import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import useCovnersion from "@/hooks/useCovnersion"
import useCoin from "@/hooks/useCoin"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Loader from "@/components/loader/Loader"
import InfoCard from "@/components/info-card/InfoCard"

import ConversionsHistoricTableSection from "./conversion-historic-table/ConversionsHistoricTableSection"

import { FaBrazilianRealSign } from "react-icons/fa6";
import { TbCurrencyDollar } from "react-icons/tb";
import { RiExchangeDollarLine } from "react-icons/ri";
import { GoStar, GoStarFill } from "react-icons/go";

const conversionFormSchema = z.object({
  coinId: z.string().min(1, { message: "Selecione uma moeda!" }),
  coinAmount: z.coerce.number().min(1, { message: "Informe uma quantia válida!" })
})

export type conversionFormType = z.infer<typeof conversionFormSchema>

const HomePage = () => {
  const { getAllCoins, handleFavoriteCoin, favoriteCoinList } = useCoin()
  const { calculateNewConversion, conversion } = useCovnersion()
  const { data: coinList } = useQuery({
    queryKey: ["fetch-coin-list"],
    queryFn: async () => {
      return await getAllCoins()
    }
  })
  const form = useForm<conversionFormType>({
    defaultValues: {
      coinAmount: 0,
      coinId: ""
    },
    resolver: zodResolver(conversionFormSchema)
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Nova conversão</CardTitle>
          <CardDescription>Escolha uma cripto moeda, informe a quantidade a ser conertida e calcule!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(calculateNewConversion)}>
              <section className="flex flex-col gap-4 lg:flex-row items-start">
                <FormField
                  control={form.control}
                  name="coinAmount"
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/4">
                      <FormLabel>Quantidade a ser convertida</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min={0} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coinId"
                  render={() => (
                    <FormItem className="w-full lg:w-3/4">
                      <FormLabel>Quantidade a ser convertida</FormLabel>
                      <Select onValueChange={(value) => form.setValue("coinId", value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Escolha a moeda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Moedas disponívies</SelectLabel>
                            {
                              !coinList ? <section className="p-4 flex justify-center">
                                <Loader className="w-10 h-10" />
                              </section> : coinList.map((coin, i) => (
                                <section key={i} className="flex justify-between gap-2">
                                  <SelectItem value={coin.id!}>
                                    <img src={coin.image} className="size-4" />
                                    {coin.name}
                                  </SelectItem>
                                  <Button type="button" variant={"ghost"} size={"icon"} onClick={() => handleFavoriteCoin(coin)}>
                                    {favoriteCoinList.some(fav =>
                                      fav.coinName === coin.name &&
                                      fav.coinSymbol === coin.symbol &&
                                      fav.image === coin.image
                                    ) ? <GoStarFill /> : <GoStar />}
                                  </Button>
                                </section>
                              ))
                            }
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
              {
                form.formState.isSubmitting ? <Button disabled>
                  Calculando
                  <Loader />
                </Button> : <Button>
                  Calcular agora
                  <RiExchangeDollarLine className="!size-6" />
                </Button>
              }
            </form>
          </Form>
          <section className="flex flex-col sm:flex-row gap-4">
            <InfoCard
              icon={FaBrazilianRealSign}
              description={
                conversion ?
                  conversion.convertedValueBRL
                    .toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "brl"
                    })
                  : "..."}
            />
            <InfoCard
              icon={TbCurrencyDollar}
              description={
                conversion ?
                  conversion.convertedValueUsd
                    .toLocaleString("usd", {
                      style: "currency",
                      currency: "usd"
                    })
                  : "..."}
            />
          </section>
        </CardContent>
      </Card>
      <ConversionsHistoricTableSection />
    </div>
  )
}

export default HomePage