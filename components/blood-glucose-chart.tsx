"use client"

import * as React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
// Import a React Native compatible charting library
// Note: You'll need to install this package with:
// npm install react-native-chart-kit

interface BloodGlucoseChartProps {
  data: Array<{ date: string; glucose: number }>
  timeRange: string
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

  // Transform data for React Native Chart Kit
  const chartData = React.useMemo(() => {
    return {
      labels: data.map(item => formatXAxis(item.date)),
      datasets: [
        {
          data: data.map(item => item.glucose),
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Glucose"]
    }
  }, [data, timeRange]);

  // For now, render a placeholder component
  // In production, you would use the actual LineChart from react-native-chart-kit
  return (
    <View style={styles.container}>
      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartTitle}>Blood Glucose Chart</Text>
        <Text style={styles.chartSubtitle}>
          {data.length} readings for {timeRange} period
        </Text>
        <Text style={styles.chartDescription}>
          Min: {Math.min(...data.map(d => d.glucose))} mg/dL, 
          Max: {Math.max(...data.map(d => d.glucose))} mg/dL
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    padding: 16
  },
  chartPlaceholder: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16
  },
  chartDescription: {
    fontSize: 12,
    color: '#888'
  }
});

