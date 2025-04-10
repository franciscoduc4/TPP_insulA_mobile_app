import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image as RNImage } from "react-native";
import * as Form from "react-hook-form";
import * as ImagePicker from 'expo-image-picker';
import { Camera, Image as GalleryIcon } from 'lucide-react-native';
import tw from '../styles/theme';

interface FoodEntryFormProps {
  onSubmit: (entry: {
    name: string;
    carbs: number;
    protein: number;
    fat: number;
    calories: number;
    timestamp: string;
    photo?: string;
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

type ControlledInputProps = {
  control: any;
  name: keyof FormData;
  label: string;
  error?: any;
  placeholder?: string;
  keyboardType?: "default" | "numeric";
}

const ControlledInput = ({ 
  control, 
  name, 
  label, 
  error, 
  placeholder = "", 
  keyboardType = "default" 
}: ControlledInputProps) => (
  <View style={tw`mb-4`}>
    <Text style={tw`text-sm font-medium mb-2 text-text-primary`}>{label}</Text>
    <Form.Controller
      control={control}
      name={name}
      rules={{ required: "Este campo es requerido" }}
      render={({ field }: Form.ControllerRenderProps<FormData>) => (
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-2.5 text-base`}
          onChangeText={(text: string) => field.onChange(text)}
          onBlur={field.onBlur}
          value={field.value}
          keyboardType={keyboardType}
          placeholder={placeholder}
        />
      )}
    />
    {error && <Text style={tw`text-red-500 text-xs mt-1`}>{error.message}</Text>}
  </View>
);

export function FoodEntryForm({ onSubmit, onCancel }: FoodEntryFormProps) {
  const [photo, setPhoto] = useState<string>();
  const { control, handleSubmit, formState: { errors } } = Form.useForm<FormData>({
    defaultValues: {
      name: "",
      carbs: "",
      protein: "",
      fat: "",
      calories: "",
    },
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Se necesitan permisos para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Se necesitan permisos para usar la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const onFormSubmit = (data: FormData) => {
    onSubmit({
      name: data.name,
      carbs: Number(data.carbs),
      protein: Number(data.protein),
      fat: Number(data.fat),
      calories: Number(data.calories),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      photo: photo,
    });
  };

  return (
    <View style={tw`bg-white rounded-t-3xl p-6`}>
      <Text style={tw`text-xl font-bold mb-6 text-center text-text-primary`}>Agregar Comida</Text>
      
      <View style={tw`mb-6`}>
        {photo ? (
          <TouchableOpacity onPress={pickImage} style={tw`items-center`}>
            <RNImage source={{ uri: photo }} style={tw`w-32 h-32 rounded-lg mb-2`} />
            <Text style={tw`text-sm text-text-secondary`}>Toca para cambiar</Text>
          </TouchableOpacity>
        ) : (
          <View style={tw`flex-row justify-center gap-4`}>
            <TouchableOpacity 
              onPress={takePhoto}
              style={tw`items-center bg-gray-100 p-4 rounded-lg flex-1`}
            >
              <Camera size={24} color="#22c55e" />
              <Text style={tw`text-sm mt-2 text-text-secondary`}>Tomar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={pickImage}
              style={tw`items-center bg-gray-100 p-4 rounded-lg flex-1`}
            >
              <GalleryIcon size={24} color="#22c55e" />
              <Text style={tw`text-sm mt-2 text-text-secondary`}>Galería</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ControlledInput
        control={control}
        name="name"
        label="Nombre del Alimento"
        error={errors.name}
        placeholder="Ingrese el nombre"
      />

      <View style={tw`flex-row flex-wrap justify-between`}>
        <View style={tw`w-[48%]`}>
          <ControlledInput
            control={control}
            name="carbs"
            label="Carbohidratos (g)"
            error={errors.carbs}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        <View style={tw`w-[48%]`}>
          <ControlledInput
            control={control}
            name="protein"
            label="Proteínas (g)"
            error={errors.protein}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        <View style={tw`w-[48%]`}>
          <ControlledInput
            control={control}
            name="fat"
            label="Grasas (g)"
            error={errors.fat}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        <View style={tw`w-[48%]`}>
          <ControlledInput
            control={control}
            name="calories"
            label="Calorías"
            error={errors.calories}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={tw`flex-row justify-end gap-2 mt-6`}>
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

