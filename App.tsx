import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, navigationTheme } from './components/theme-provider';
import { useAuth } from './hooks/use-auth';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import ErrorBoundary from './components/error-boundary';

import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MealsPage from './screens/MealsPage';
import HistoryPage from './screens/HistoryPage';
import InsulinPage from './screens/InsulinPage';
import ProfilePage from './screens/ProfilePage';
import ForgotPasswordPage from './screens/ForgotPasswordPage';
import { BackButton } from './components/back-button';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Meals"
        component={MealsPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="History"
        component={HistoryPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Insulin"
        component={InsulinPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#22c55e" />
    </View>
  );
}

function DevModeIndicator() {
  if (!__DEV__) return null;
  
  return (
    <View style={{ 
      position: 'absolute', 
      bottom: 10, 
      right: 10, 
      backgroundColor: 'rgba(0,0,0,0.7)', 
      padding: 5,
      borderRadius: 5 
    }}>
      <Text style={{ color: '#fff', fontSize: 10 }}>DEV</Text>
    </View>
  );
}

export default function App() {
  const { isAuthenticated, isLoading, initialize } = useAuth();
  const [initError, setInitError] = useState<Error | null>(null);

  // Initialize auth state when app loads
  useEffect(() => {
    try {
      initialize();
    } catch (error) {
      console.error('Error initializing auth:', error);
      setInitError(error instanceof Error ? error : new Error(String(error)));
    }
  }, [initialize]);

  // Add special development mode handling
  useEffect(() => {
    if (__DEV__) {
      const handleReload = () => {
        console.log('Handling development reload...');
      };
      
      return () => {
        // Clean up any resources when component unmounts
        // This is important for development mode hot reloading
      };
    }
  }, []);

  if (initError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', fontSize: 16, marginBottom: 20 }}>
          Error initializing application
        </Text>
        <TouchableOpacity 
          style={{ backgroundColor: '#22c55e', padding: 10, borderRadius: 5 }}
          onPress={() => {
            setInitError(null);
            initialize();
          }}
        >
          <Text style={{ color: 'white' }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          <ThemeProvider>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              isAuthenticated ? <AppStack /> : <AuthStack />
            )}
            <DevModeIndicator />
          </ThemeProvider>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}