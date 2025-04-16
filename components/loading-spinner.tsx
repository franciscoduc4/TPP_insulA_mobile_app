import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

type LoadingSpinnerProps = {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'large', 
  color = '#0066cc', 
  text = 'Loading...'
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});