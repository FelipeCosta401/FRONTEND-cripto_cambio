import { useQuery } from "react-query"

import useCovnersion from "@/hooks/useCovnersion"

import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card"
import { Loader } from "lucide-react"

import { columns } from "./columns"
import { TableSection } from "./TableSection"

const ConversionsHistoricTableSection = () => {
    const { getConversionHistoric } = useCovnersion()
    const { data: conversionList, isLoading } = useQuery({
        queryKey: ["fetch-conversions-historic"],
        queryFn: async () => {
            return await getConversionHistoric()
        }
    })

    
  return (
    <Card>
        <CardHeader>
          <CardTitle>Histórico de conversões</CardTitle>
          <CardDescription>Confira abaixo o seu histórico de conversões</CardDescription>
        </CardHeader>
        {
          isLoading ?
            <CardContent className="flex justify-center ">
              <Loader className="w-20 h-20" />
            </CardContent>
            :
            conversionList &&
            <CardContent >
              <TableSection columns={columns} data={conversionList} />
            </CardContent>
        }
      </Card>
  )
}

export default ConversionsHistoricTableSection