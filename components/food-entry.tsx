import { View, Text, Image } from "react-native";
import tw from '../styles/theme';

interface FoodEntryProps {
  entry: {
    name: string;
    carbs: number;
    protein: number;
    fat: number;
    calories: number;
    timestamp: string;
    photo?: string;
  }
  handleDelete: () => void;
}

export function FoodEntry({ entry, handleDelete }: FoodEntryProps) {
  return (
    <View style={tw`bg-white rounded-lg shadow-sm p-4 mb-4`}>
      <View style={tw`flex-row gap-4`}>
        {entry.photo && (
          <Image 
            source={{ uri: entry.photo }} 
            style={tw`w-20 h-20 rounded-lg`}
          />
        )}
        <View style={tw`flex-1 justify-between`}>
          <View style={tw`flex-row justify-between items-start`}>
            <View>
              <Text style={tw`font-semibold text-text-primary text-base`}>{entry.name}</Text>
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
      </View>
    </View>
  );
}

