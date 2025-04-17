import { registerRootComponent } from 'expo';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';

// Ignore specific warnings that might be noisy during development
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Require cycle:',
]);

// Enable hot reloading during development
if (__DEV__) {
  // Use fast refresh in dev mode - safely check if DevSettings exists and has the method
  const DevSettings = require('react-native').DevSettings;
  if (DevSettings && typeof DevSettings.setHotLoadingEnabled === 'function') {
    DevSettings.setHotLoadingEnabled(true);
  } else {
    console.log('DevSettings.setHotLoadingEnabled is not available in Bridgeless mode');
  }
  
  // Add better error reporting for development
  console.log('Running in development mode - Hot reloading enabled');
}

// Función para manejar errores globales que puedan ocurrir durante la inicialización
const handleInitializationError = (error) => {
  console.error('Error durante la inicialización:', error);
  
  // Mostrar un mensaje nativo en vez de crashear
  if (global.ErrorUtils) {
    global.ErrorUtils.reportFatalError = (error) => {
      console.log('Error fatal interceptado:', error);
    };
  }
};

// Set up global error handler
if (!global.__DEV__) {
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.log('Global error caught:', error);
    if (isFatal) {
      handleInitializationError(error);
    }
  });
}

// Intentar inicializar la aplicación con un manejador de errores
try {
  // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
  // It also ensures that whether you load the app in Expo Go or in a native build,
  // the environment is set up appropriately
  registerRootComponent(App);
} catch (error) {
  handleInitializationError(error);
}
