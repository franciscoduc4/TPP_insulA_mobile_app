import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import tw from '../styles/theme';

interface FoodEntryFormProps {
  onSubmit: (entry: {
    name: string;
    carbs: number;
    protein: number;
    fat: number;
    calories: number;
    timestamp: string;
  }) => void;
  onCancel: () => void;
}

type FormData = {
  name: string;
  carbs: string;
  protein: string;
  fat: string;
  calories: string;
};

export function FoodEntryForm({ onSubmit, onCancel }: FoodEntryFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: "",
      carbs: "",
      protein: "",
      fat: "",
      calories: "",
    },
  });

  const onFormSubmit = (data: FormData) => {
    onSubmit({
      name: data.name,
      carbs: Number(data.carbs),
      protein: Number(data.protein),
      fat: Number(data.fat),
      calories: Number(data.calories),
      timestamp: new Date().toLocaleString(),
    });
  };

  return (
    <View style={tw`p-4 bg-white`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-sm font-medium mb-2 text-text-primary`}>Nombre del Alimento</Text>
        <Controller
          control={control}
          rules={{ required: "Este campo es requerido" }}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-2.5 text-base`}
              onChangeText={onChange}
              value={value}
              placeholder="Ingrese el nombre"
            />
          )}
        />
        {errors.name && <Text style={tw`text-red-500 text-xs mt-1`}>{errors.name.message}</Text>}
      </View>

      <View style={tw`flex-row flex-wrap justify-between`}>
        <View style={tw`w-[48%] mb-4`}>
          <Text style={tw`text-sm font-medium mb-2 text-text-primary`}>Carbohidratos (g)</Text>
          <Controller
            control={control}
            rules={{ required: "Requerido" }}
            name="carbs"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-2.5 text-base`}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                placeholder="0"
              />
            )}
          />
          {errors.carbs && <Text style={tw`text-red-500 text-xs mt-1`}>{errors.carbs.message}</Text>}
        </View>

        <View style={tw`w-[48%] mb-4`}>
          <Text style={tw`text-sm font-medium mb-2 text-text-primary`}>Proteínas (g)</Text>
          <Controller
            control={control}
            rules={{ required: "Requerido" }}
            name="protein"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-2.5 text-base`}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                placeholder="0"
              />
            )}
          />
          {errors.protein && <Text style={tw`text-red-500 text-xs mt-1`}>{errors.protein.message}</Text>}
        </View>

        <View style={tw`w-[48%] mb-4`}>
          <Text style={tw`text-sm font-medium mb-2 text-text-primary`}>Grasas (g)</Text>
          <Controller
            control={control}
            rules={{ required: "Requerido" }}
            name="fat"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-2.5 text-base`}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                placeholder="0"
              />
            )}
          />
          {errors.fat && <Text style={tw`text-red-500 text-xs mt-1`}>{errors.fat.message}</Text>}
        </View>

        <View style={tw`w-[48%] mb-4`}>
          <Text style={tw`text-sm font-medium mb-2 text-text-primary`}>Calorías</Text>
          <Controller
            control={control}
            rules={{ required: "Requerido" }}
            name="calories"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-2.5 text-base`}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                placeholder="0"
              />
            )}
          />
          {errors.calories && <Text style={tw`text-red-500 text-xs mt-1`}>{errors.calories.message}</Text>}
        </View>
      </View>

      <View style={tw`flex-row justify-end gap-2 mt-4`}>
        <TouchableOpacity 
          style={tw`bg-gray-100 py-2.5 px-5 rounded-lg min-w-[100px] items-center`} 
          onPress={onCancel}
        >
          <Text style={tw`text-base font-medium text-text-primary`}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={tw`bg-apple-green py-2.5 px-5 rounded-lg min-w-[100px] items-center`}
          onPress={handleSubmit(onFormSubmit)}
        >
          <Text style={tw`text-base font-medium text-white`}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

