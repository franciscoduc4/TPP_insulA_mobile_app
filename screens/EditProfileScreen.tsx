import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/use-auth';
import { updateUserProfile, UpdateProfileInput } from '../lib/api/auth';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditProfileScreen() {
    const navigation = useNavigation();
    const { token, user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        weight: user?.weight?.toString() || '',
        height: user?.height?.toString() || '',
        diagnosisDate: user?.medicalInfo?.diagnosisDate || '',
        treatingDoctor: user?.medicalInfo?.treatingDoctor || '',
    });

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!token) return;

        try {
            setIsLoading(true);
            const updateData: UpdateProfileInput = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                weight: formData.weight ? parseFloat(formData.weight) : undefined,
                height: formData.height ? parseFloat(formData.height) : undefined,
                medicalInfo: {
                    diagnosisDate: formData.diagnosisDate,
                    treatingDoctor: formData.treatingDoctor,
                },
            };

            await updateUserProfile(updateData, token);
            Alert.alert(
                "Éxito",
                "Perfil actualizado correctamente",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'No se pudo actualizar el perfil');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Información Personal</Text>
                    <View style={styles.card}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nombre</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.firstName}
                                onChangeText={(value) => handleChange('firstName', value)}
                                placeholder="Tu nombre"
                                editable={!isLoading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Apellido</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.lastName}
                                onChangeText={(value) => handleChange('lastName', value)}
                                placeholder="Tu apellido"
                                editable={!isLoading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Peso (kg)</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.weight}
                                onChangeText={(value) => handleChange('weight', value)}
                                placeholder="70"
                                keyboardType="numeric"
                                editable={!isLoading}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Altura (cm)</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.height}
                                onChangeText={(value) => handleChange('height', value)}
                                placeholder="170"
                                keyboardType="numeric"
                                editable={!isLoading}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Información Médica</Text>
                    <View style={styles.card}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Fecha de Diagnóstico</Text>
                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text>{formData.diagnosisDate || 'Seleccionar fecha'}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Médico Tratante</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.treatingDoctor}
                                onChangeText={(value) => handleChange('treatingDoctor', value)}
                                placeholder="Nombre del médico"
                                editable={!isLoading}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity 
                    style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    <Text style={styles.saveButtonText}>
                        {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {showDatePicker && (
                <DateTimePicker
                    value={new Date(formData.diagnosisDate || Date.now())}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                            handleChange('diagnosisDate', selectedDate.toISOString().split('T')[0]);
                        }
                    }}
                />
            )}
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
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 16,
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
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#22c55e',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 24,
    },
    saveButtonDisabled: {
        opacity: 0.7,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});