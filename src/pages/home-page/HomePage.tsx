import { useQuery } from "react-query"

import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import useCovnersion from "@/hooks/useCovnersion"
import useFetchCoin from "@/hooks/useFetchCoin"

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
import { DataTable } from "./conversion-historic-table/Data-table"
import { columns } from "./conversion-historic-table/columns"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Loader from "@/components/loader/Loader"

import { FaBrazilianRealSign } from "react-icons/fa6";
import { TbCurrencyDollar } from "react-icons/tb";
import { RiExchangeDollarLine } from "react-icons/ri";
import InfoCard from "@/components/info-card/InfoCard"

const conversionFormSchema = z.object({
  coinId: z.string().min(1, { message: "Selecione uma moeda!" }),
  coinAmount: z.coerce.number().min(1, { message: "Informe uma quantia válida!" })
})

export type conversionFormType = z.infer<typeof conversionFormSchema>

const HomePage = () => {
  const { getAllCoins } = useFetchCoin()
  const { getConversionHistoric, calculateNewCoersion, conversion } = useCovnersion()
  const { data: conversionList, isLoading: isConversionListLoading } = useQuery({
    queryKey: ["fetch-user-conversion-historic"],
    queryFn: async () => {
      return await getConversionHistoric()
    }
  })
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
            <form className="space-y-4" onSubmit={form.handleSubmit(calculateNewCoersion)}>
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
                                <SelectItem key={i} value={coin.id}>
                                  <img src={coin.image} className="size-4" />
                                  {coin.name}
                                </SelectItem>
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
      <Card>
        <CardHeader>
          <CardTitle>Histórico de conversões</CardTitle>
          <CardDescription>Confira abaixo o seu histórico de conversões</CardDescription>
        </CardHeader>
        {
          isConversionListLoading ?
            <CardContent className="flex justify-center ">
              <Loader className="w-20 h-20" />
            </CardContent>
            :
            conversionList &&
            <CardContent >
              <DataTable columns={columns} data={conversionList} />
            </CardContent>
        }
      </Card>
    </div>
  )
}

export default HomePage