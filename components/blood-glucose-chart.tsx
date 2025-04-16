"use client"

import React from "react"
import { View, Text } from "react-native"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

interface BloodGlucoseChartProps {
  data: Array<{ date: string; glucose: number }>
  timeRange: string
}

// Define tooltip payload type
interface TooltipPayload {
  payload: {
    date: string;
    glucose: number;
  };
}

export function BloodGlucoseChart({ data, timeRange }: BloodGlucoseChartProps) {
  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem)
    switch (timeRange) {
      case "day":
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      case "week":
        return date.toLocaleDateString([], { weekday: "short" })
      case "month":
        return date.toLocaleDateString([], { day: "numeric", month: "short" })
      default:
        return tickItem
    }
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={formatXAxis} />
        <YAxis domain={[60, 200]} />
        <Tooltip
          content={({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <Card style={{ padding: 8 }}>
                  <Text style={{ fontWeight: 'bold' }}>{formatXAxis(data.date)}</Text>
                  <Text>{`Glucosa: ${data.glucose} mg/dL`}</Text>
                </Card>
              )
            }
            return null
          }}
        />
        <Line type="monotone" dataKey="glucose" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

