import Api from "@/config/Api";

import type { conversionFormType } from "@/pages/home-page/HomePage";
import type { ConversionInterface } from "@/types/ConversionInterface";


export default class ConversionService {

    async getConversionHistoric() {
        return await Api.get("/conversions")
            .then((res: { data: { conversions: ConversionInterface[] } }) => {
                const { conversions } = res.data

                return conversions

            }).catch((error) => {
                throw new Error(error.response.data.error)
            })
    }

    async converte({ coinAmount, coinId }: conversionFormType) {
        return await Api.post("/convert", {
            coinAmount,
            coinId
        }).then((res: { data: { message: string, results: ConversionInterface } }) => {
            const { message, results } = res.data

            return { message, results }
        }).catch((error) => {
            console.log(error)
            throw new Error(error.response.data.error)
        })
    }
}