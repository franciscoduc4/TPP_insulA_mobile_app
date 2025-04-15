import React, { ErrorInfo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FallbackScreen from './FallbackScreen';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Actualizar el estado para mostrar la UI de fallback
    return { 
      hasError: true, 
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // También puedes registrar el error en un servicio
    console.error('App Error:', error);
    console.error('Error Info:', errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleRestart = () => {
    // Intenta reiniciar la aplicación restableciendo el estado
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Usar el nuevo FallbackScreen para una mejor experiencia de usuario
      return (
        <FallbackScreen 
          error={this.state.error || undefined} 
          resetError={this.handleRestart}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;