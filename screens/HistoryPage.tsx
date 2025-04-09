import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { GlucoseTrendsChart } from '../components/glucose-trends-chart';
import DailyPatternChart from '../components/daily-pattern-chart';
import { EventList } from '../components/event-list';
import { Footer } from "../components/footer";

interface Event {
  id: number;
  timestamp: string;
  description: string;
  type: string;
  value?: number;
  units?: number;
  carbs?: number;
  items?: string[];
}

const mockEvents: Event[] = [
  {
    id: 1,
    timestamp: '08:30',
    description: 'Pre-desayuno',
    type: 'glucose',
    value: 120
  },
  {
    id: 2,
    timestamp: '12:30',
    description: 'Pre-almuerzo',
    type: 'insulin',
    units: 6
  },
  {
    id: 3,
    timestamp: '13:00',
    description: 'Almuerzo',
    type: 'meal',
    carbs: 45,
    items: ['Arroz', 'Pollo', 'Ensalada']
  }
];

// Updated mock data for charts with correct format
const mockGlucoseData = Array.from({ length: 12 }, (_, i) => ({
  time: `${i * 2}:00`,
  glucose: Math.round(Math.random() * 50 + 100) // Generate values between 100-150
}));

const mockDailyPatternData = [
  { id: 'morning-1', value: 120, timestamp: 'morning' },
  { id: 'afternoon-1', value: 140, timestamp: 'afternoon' },
  { id: 'evening-1', value: 110, timestamp: 'evening' },
  { id: 'night-1', value: 130, timestamp: 'night' },
  { id: 'morning-2', value: 125, timestamp: 'morning' },
  { id: 'afternoon-2', value: 145, timestamp: 'afternoon' },
  { id: 'evening-2', value: 115, timestamp: 'evening' },
  { id: 'night-2', value: 135, timestamp: 'night' },
];

export default function HistoryPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Historial</Text>
          <Text style={styles.subtitle}>Registros y tendencias de glucosa</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tendencias de Glucosa</Text>
            <View style={styles.card}>
              <GlucoseTrendsChart 
                data={mockGlucoseData}
                timeRange="day"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Patrón Diario</Text>
            <View style={styles.card}>
              <DailyPatternChart data={mockDailyPatternData} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Eventos Recientes</Text>
            <EventList events={mockEvents} />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    padding: 16,
    gap: 24,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

