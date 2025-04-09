import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './components/theme-provider';

import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MealsPage from './screens/MealsPage';
import HistoryPage from './screens/HistoryPage';
import InsulinPage from './screens/InsulinPage';
import ProfilePage from './screens/ProfilePage';
import { BackButton } from './components/back-button';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerLeft: () => <BackButton />,
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Meals" component={MealsPage} />
          <Stack.Screen name="History" component={HistoryPage} />
          <Stack.Screen name="Insulin" component={InsulinPage} />
          <Stack.Screen name="Profile" component={ProfilePage} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}