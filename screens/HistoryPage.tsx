import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { GlucoseTrendsChart } from '../components/glucose-trends-chart';
import DailyPatternChart from '../components/daily-pattern-chart';
import { EventList } from '../components/event-list';
import { Footer } from "../components/footer";
import { BackButton } from '../components/back-button';
import { useNavigation } from '@react-navigation/native';
import { Activity, TrendingUp, Calendar, ListChecks } from 'lucide-react-native';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion-native';

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
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <BackButton />
            </TouchableOpacity>
            <Activity width={32} height={32} color="#22c55e" />
            <Text style={styles.title}>Historial</Text>
          </View>
          <Text style={styles.subtitle}>Registros y tendencias de glucosa</Text>
        </View>
        
        <View style={styles.content}>
          <Accordion>
            <AccordionItem value="trends">
              <AccordionTrigger>
                <View style={styles.accordionHeader}>
                  <TrendingUp size={20} color="#6b7280" />
                  <Text style={styles.sectionTitle}>Tendencias de Glucosa</Text>
                </View>
              </AccordionTrigger>
              <AccordionContent>
                <View style={styles.card}>
                  <GlucoseTrendsChart 
                    data={mockGlucoseData}
                    timeRange="day"
                  />
                </View>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="patterns">
              <AccordionTrigger>
                <View style={styles.accordionHeader}>
                  <Calendar size={20} color="#6b7280" />
                  <Text style={styles.sectionTitle}>Patrón Diario</Text>
                </View>
              </AccordionTrigger>
              <AccordionContent>
                <View style={styles.card}>
                  <DailyPatternChart data={mockDailyPatternData} />
                </View>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="events">
              <AccordionTrigger>
                <View style={styles.accordionHeader}>
                  <ListChecks size={20} color="#6b7280" />
                  <Text style={styles.sectionTitle}>Eventos Recientes</Text>
                </View>
              </AccordionTrigger>
              <AccordionContent>
                <View style={styles.card}>
                  <EventList events={mockEvents} />
                </View>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: 30,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 16,
  },
  content: {
    padding: 16,
    paddingBottom: 80, // Add space for footer
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
});

