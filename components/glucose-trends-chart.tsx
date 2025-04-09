import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card } from "@/components/ui/card";

interface GlucoseTrendsChartProps {
  data: Array<{ time: string; glucose: number }>;
  timeRange: string;
}

export function GlucoseTrendsChart({ data, timeRange }: GlucoseTrendsChartProps) {
  // Format x-axis labels based on the time range
  const formatXAxis = (tickItem: string) => {
    const date = new Date(`2023-01-01 ${tickItem}`);
    switch (timeRange) {
      case "day":
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      case "week":
        return ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"][date.getDay()];
      case "month":
        return date.getDate().toString();
      default:
        return tickItem;
    }
  };

  // Prepare data for Chart Kit
  const labels = data.map(item => {
    const timeParts = item.time.split(':');
    return timeParts[0]; // Just show the hour for simplicity
  });

  const chartData = {
    labels,
    datasets: [
      {
        data: data.map(item => item.glucose),
        color: (opacity = 1) => `rgba(136, 132, 216, ${opacity})`, // purple color from original chart
        strokeWidth: 2
      }
    ],
    legend: ["Glucosa mg/dL"]
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#8884d8"
    }
  };

  const screenWidth = Dimensions.get("window").width - 40;

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={300}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8
        }}
        yAxisSuffix=" mg/dL"
        yAxisInterval={1}
        fromZero={false}
        verticalLabelRotation={30}
        segments={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

