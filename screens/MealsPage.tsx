import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { PlusCircle } from 'lucide-react-native';
import { FoodEntry } from '../components/food-entry';
import { FoodEntryForm } from '../components/food-entry-form';
import { Footer } from "../components/footer";

interface FoodItem {
  name: string;
  carbs: number;
  protein: number;
  fat: number;
  calories: number;
  timestamp: string;
}

const mockMeals: FoodItem[] = [
  {
    name: 'Desayuno',
    carbs: 45,
    protein: 15,
    fat: 12,
    calories: 350,
    timestamp: '08:30'
  },
  {
    name: 'Almuerzo',
    carbs: 60,
    protein: 30,
    fat: 15,
    calories: 500,
    timestamp: '13:00'
  }
];

export default function MealsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [meals, setMeals] = useState<FoodItem[]>(mockMeals);

  const handleAddMeal = (entry: FoodItem) => {
    setMeals([...meals, entry]);
    setIsFormOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {meals.map((meal, index) => (
            <FoodEntry
              key={index}
              entry={meal}
              handleDelete={() => {
                setMeals(meals.filter((_, i) => i !== index));
              }}
            />
          ))}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsFormOpen(true)}
          >
            <PlusCircle size={24} color="#22c55e" />
            <Text style={styles.addButtonText}>Agregar Comida</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isFormOpen && (
        <FoodEntryForm
          onSubmit={handleAddMeal}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
      
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
    gap: 16,
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
});