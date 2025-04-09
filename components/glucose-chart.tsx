"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface GlucoseChartProps {
  data: Array<{
    id: string
    value: number
    timestamp: string
  }>
  title: string
  targetRange: {
    min: number
    max: number
  }
  height?: number
}

export default function GlucoseChart({
  data,
  title,
  targetRange,
  height = 300,
}: GlucoseChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No hay datos disponibles
          </div>
        </CardContent>
      </Card>
    )
  }

  // En un caso real, aquí usarías una biblioteca de gráficos como Chart.js o Recharts
  // Por ahora, mostraremos una representación simple
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {format(new Date(data[0].timestamp), "PPp", { locale: es })}
            </span>
            <span className="text-muted-foreground">
              {format(new Date(data[data.length - 1].timestamp), "PPp", { locale: es })}
            </span>
          </div>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            Gráfico de glucosa en desarrollo
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 