import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { PlusCircle } from 'lucide-react-native';
import { PredictedDose } from '../components/predicted-dose';
import { EventList } from '../components/event-list';
import { Footer } from "../components/footer";

interface Event {
  id: number;
  timestamp: string;
  description: string;
  type: string;
  units?: number;
}

const mockEvents: Event[] = [
  {
    id: 1,
    timestamp: '08:30',
    description: 'Pre-desayuno',
    type: 'bolus',
    units: 4
  },
  {
    id: 2,
    timestamp: '13:00',
    description: 'Pre-almuerzo',
    type: 'bolus',
    units: 6
  },
  {
    id: 3,
    timestamp: '22:00',
    description: 'Dosis nocturna',
    type: 'basal',
    units: 12
  }
];

export default function InsulinPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    type: 'bolus',
    units: 0,
  });

  const handleAddEvent = () => {
    if (newEvent.units && newEvent.type) {
      const event: Event = {
        id: events.length + 1,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description: newEvent.description || '',
        type: newEvent.type,
        units: Number(newEvent.units)
      };
      setEvents([...events, event]);
      setShowForm(false);
      setNewEvent({ type: 'bolus', units: 0 });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Registro del Día</Text>
            <EventList events={events} />
          </View>

          {showForm ? (
            <View style={styles.form}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>Nueva Dosis</Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setShowForm(false)}
                >
                  <Text style={styles.closeButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Tipo</Text>
                <View style={styles.typeButtons}>
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      newEvent.type === 'bolus' && styles.typeButtonActive
                    ]}
                    onPress={() => setNewEvent({ ...newEvent, type: 'bolus' })}
                  >
                    <Text style={[
                      styles.typeButtonText,
                      newEvent.type === 'bolus' && styles.typeButtonTextActive
                    ]}>Bolus</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      newEvent.type === 'basal' && styles.typeButtonActive
                    ]}
                    onPress={() => setNewEvent({ ...newEvent, type: 'basal' })}
                  >
                    <Text style={[
                      styles.typeButtonText,
                      newEvent.type === 'basal' && styles.typeButtonTextActive
                    ]}>Basal</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Unidades</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={newEvent.units?.toString()}
                  onChangeText={(value) => setNewEvent({ ...newEvent, units: Number(value) })}
                  placeholder="0"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Notas (opcional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={newEvent.description}
                  onChangeText={(value) => setNewEvent({ ...newEvent, description: value })}
                  placeholder="Agregar notas..."
                  multiline
                  numberOfLines={4}
                />
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleAddEvent}
              >
                <Text style={styles.submitButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowForm(true)}
            >
              <PlusCircle size={24} color="#22c55e" />
              <Text style={styles.addButtonText}>Registrar Dosis</Text>
            </TouchableOpacity>
          )}
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#22c55e',
    borderRadius: 8,
    borderStyle: 'dashed',
    gap: 8,
  },
  addButtonText: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: '500',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    gap: 20,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#6b7280',
    fontSize: 14,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  typeButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});