import { View, Text } from "react-native";
import tw from '../styles/theme';

interface FoodEntryProps {
  entry: {
    name: string
    carbs: number
    protein: number
    fat: number
    calories: number
    timestamp: string
  }
  handleDelete: () => void
}

export function FoodEntry({ entry, handleDelete }: FoodEntryProps) {
  return (
    <View style={tw`bg-white rounded-lg shadow-sm p-4 mb-2`}>
      <View style={tw`flex-row justify-between items-center`}>
        <View>
          <Text style={tw`font-semibold text-text-primary`}>{entry.name}</Text>
          <Text style={tw`text-sm text-text-secondary`}>{entry.timestamp}</Text>
        </View>
        <View style={tw`items-end`}>
          <Text style={tw`text-sm`}>
            <Text style={tw`font-medium`}>{entry.calories}</Text>
            <Text> kcal</Text>
          </Text>
          <Text style={tw`text-xs text-text-secondary`}>
            C: {entry.carbs}g | P: {entry.protein}g | G: {entry.fat}g
          </Text>
        </View>
      </View>
    </View>
  );
}

