"use client"

import React from 'react';
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format, isValid } from "date-fns"
import { es } from "date-fns/locale"
import { BarChart } from 'react-native-chart-kit';

interface DailyPatternChartProps {
  data: Array<{
    id: string
    value: number
    timestamp: string
  }>
}

export default function DailyPatternChart({ data }: DailyPatternChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patrón Diario</CardTitle>
        </CardHeader>
        <CardContent>
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 300 }}>
            <Text style={{ color: '#666' }}>No hay datos disponibles</Text>
          </View>
        </CardContent>
      </Card>
    )
  }

  // Group data by timestamp
  const timeOfDayMap = {
    'morning': 'Mañana',
    'afternoon': 'Tarde',
    'evening': 'Noche',
    'night': 'Madrugada'
  };

  // Process data for the chart
  const timestamps = [...new Set(data.map(item => item.timestamp))];
  const dataByTime = timestamps.map(time => {
    const values = data.filter(item => item.timestamp === time);
    const average = values.reduce((sum, item) => sum + item.value, 0) / values.length;
    return { time, average };
  });

  const chartData = {
    labels: dataByTime.map(item => timeOfDayMap[item.time as keyof typeof timeOfDayMap] || item.time),
    datasets: [
      {
        data: dataByTime.map(item => item.average),
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`, // Green color
        strokeWidth: 2
      }
    ]
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    barPercentage: 0.7
  };

  const screenWidth = Dimensions.get("window").width - 40;

  return (
    <View>
      <CardHeader>
        <CardTitle>Patrón Diario</CardTitle>
      </CardHeader>
      <CardContent>
        <View style={styles.chartContainer}>
          <BarChart
            data={chartData}
            width={screenWidth}
            height={300}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            fromZero={false}
            showValuesOnTopOfBars={true}
            style={{
              marginVertical: 8,
              borderRadius: 8
            }}
            yAxisSuffix=" mg/dL"
          />
        </View>
      </CardContent>
    </View>
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }
});