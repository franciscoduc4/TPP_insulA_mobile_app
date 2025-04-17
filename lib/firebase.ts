// Firebase configuration and initialization
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

// Firebase configuration - updated to match google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyApJ0Yy69I23eN52Wek_DXTGQFfSSe-e3c",
  authDomain: "insula-4b1ba.firebaseapp.com",
  databaseURL: "https://insula-4b1ba-default-rtdb.firebaseio.com",
  projectId: "insula-4b1ba",
  storageBucket: "insula-4b1ba.firebasestorage.app",
  messagingSenderId: "345938546990",
  appId: "1:345938546990:android:763af6c9aa6817ea51eabf"
};

// Flag to track Firebase initialization
let firebaseInitialized = false;

/**
 * Initializes Firebase and Google Sign-In configuration
 * Should be called early in the app lifecycle (e.g., in App.tsx)
 */
export const initializeFirebase = () => {
  if (firebaseInitialized) {
    return;
  }
  
  try {
    // Check if Firebase is already initialized
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log('Firebase app initialized successfully');
    } else {
      console.log('Firebase app already initialized');
    }
    
    // Configure Google Sign-In
    const webClientId = '345938546990-0uq4oq5nht5teo9vncf3an2b6hmnu1qo.apps.googleusercontent.com';
    
    GoogleSignin.configure({
      webClientId, // Web client ID from google-services.json
      offlineAccess: true,
      forceCodeForRefreshToken: true, // Forces refreshing the token
      scopes: ['profile', 'email'], // Request specific scopes
      ...(Platform.OS === 'ios' && { 
        // iOS-specific configuration would go here
        // iosClientId: 'YOUR_IOS_CLIENT_ID' 
      })
    });
    console.log('Google Sign-In configured with webClientId:', webClientId);
    
    firebaseInitialized = true;
    console.log('Firebase initialization complete');
  } catch (error) {
    console.error('Firebase initialization error:', error);
    // Rethrow critical errors that should prevent the app from continuing
    if (error instanceof Error && 
        (error.message.includes('API key') || 
         error.message.includes('configuration'))) {
      throw error;
    }
  }
};

/**
 * Checks if Firebase has been properly initialized
 * @returns boolean indicating if Firebase is ready to use
 */
export const isFirebaseInitialized = () => {
  return firebaseInitialized && firebase.apps.length > 0;
};

export { firebase, auth };