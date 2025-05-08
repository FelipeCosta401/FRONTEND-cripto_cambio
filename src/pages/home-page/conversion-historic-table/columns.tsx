import type { ConversionInterface } from "@/types/ConversionInterface"
import { type ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<ConversionInterface>[] = [
  {
    accessorKey: "id",
    header: "Código",
  },
  {
    accessorKey: "coinName",
    header: "Moeda",
  },
  {
    accessorKey: "coinAmount",
    header: "Quantidade",
  },
  {
    accessorKey: "convertedValueBRL",
    header: "Conversão em reais",
  },
  {
    accessorKey: "convertedValueUsd",
    header: "Conversão em dólares",
  },
  {
    accessorKey: "createdAt",
    header: "Cadastrada em",
  },
]
