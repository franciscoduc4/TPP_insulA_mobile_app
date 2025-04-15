import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';

interface FallbackScreenProps {
  error?: Error;
  resetError?: () => void;
}

const FallbackScreen: React.FC<FallbackScreenProps> = ({ error, resetError }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../assets/insula-logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Ups, algo salió mal</Text>
        <Text style={styles.message}>
          La aplicación ha encontrado un problema y no puede continuar.
        </Text>
        
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>Detalles del error:</Text>
            <Text style={styles.errorText}>{error.message || 'Error desconocido'}</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.button}
          onPress={resetError}
        >
          <Text style={styles.buttonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  errorBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 13,
    color: '#e74c3c',
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FallbackScreen;