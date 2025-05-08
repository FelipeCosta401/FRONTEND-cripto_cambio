import { useState } from "react"

import ConversionService from "@/services/ConversionService"

import type { conversionFormType } from "@/pages/home-page/HomePage"
import { type ConversionInterface } from "@/types/ConversionInterface"

import { toast } from "sonner"

const conversionService = new ConversionService()

const useCovnersion = () => {
    const [conversion, setConversion] = useState<ConversionInterface>()

    async function getConversionHistoric() {
        try {
            return await conversionService.getConversionHistoric()
        } catch (e: any) {
            console.log(e)
            toast.error(e.response.data.error)
        }
    }

    async function calculateNewCoersion({ coinAmount, coinId }: conversionFormType) {
        try {
            const { message, results } = await conversionService.converte({ coinAmount, coinId })
            toast.success(message)
            setConversion(results)
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    return { getConversionHistoric, calculateNewCoersion, conversion }
}

export default useCovnersion