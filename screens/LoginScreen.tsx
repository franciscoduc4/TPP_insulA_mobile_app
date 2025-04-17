import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../hooks/use-auth";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  ForgotPasswordPage: undefined;
  Signup: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading, error: authError, isAuthenticated } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '345938546990-0uq4oq5nht5teo9vncf3an2b6hmnu1qo.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  // Update error message if authError changes
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  // Handle navigation based on authentication state
  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    }
  }, [isAuthenticated, navigation]);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Por favor ingresa email y contraseña");
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      // Error is handled by useAuth and displayed through the error state
    }
  };

  const handleDemoLogin = () => {
    setEmail("demo@example.com");
    setPassword("demo123");
  };

  const handleGoogleSignIn = async () => {
    setError(""); // Clear any previous errors
    try {
      // Check if Google Play Services are available
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Make sure any previous sign-in session is cleared to avoid state conflicts
      await GoogleSignin.signOut();
      
      // Attempt to sign in - this will show the Google sign-in UI
      const userInfo = await GoogleSignin.signIn();
      
      // Only proceed if we have a valid userInfo object
      if (userInfo && userInfo.idToken) {
        try {
          // Get tokens only if sign-in was successful
          const { accessToken } = await GoogleSignin.getTokens();
          
          // Create credential for Firebase authentication
          const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken, accessToken);
          
          // Sign in with Firebase
          const userCredential = await auth().signInWithCredential(googleCredential);
          
          if (userCredential.user) {
            // Success - the authentication hook will handle navigation
            console.log('Google sign-in successful:', userCredential.user.email);
          }
        } catch (tokenError: any) {
          console.error('Error getting tokens:', tokenError);
          setError("Error de autenticación con Google: " + (tokenError.message || 'Error desconocido'));
          await GoogleSignin.signOut();
        }
      }
    } catch (error: any) {
      // Handle specific error types
      if (error.code === 'SIGN_IN_CANCELLED') {
        console.log('User cancelled the sign-in flow');
        // No need to show error for user cancellation
      } else if (error.code === 'SIGN_IN_REQUIRED') {
        console.log('No user signed in');
        // Reset state but don't show error to user
        await GoogleSignin.signOut();
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        setError("Servicios de Google Play no disponibles");
      } else if (error.message && error.message.includes('DEVELOPER_ERROR')) {
        console.error('DEVELOPER_ERROR in Google Sign-In:', error);
        setError(`Error de configuración: SHA-1 o configuración incorrecta en Firebase. 
                 Por favor contacte al desarrollador.`);
        
        // Log additional information to help debugging
        console.log('Using webClientId:', '345938546990-0uq4oq5nht5teo9vncf3an2b6hmnu1qo.apps.googleusercontent.com');
        console.log('App package name:', 'com.anonymous.TPPInsulaApp');
      } else {
        console.error('Google Sign-In Error:', error);
        setError("Error al iniciar sesión con Google: " + (error.message || 'Error desconocido'));
        
        // Ensure any ongoing sign-in process is properly cleaned up
        try {
          await GoogleSignin.signOut();
        } catch (signOutError) {
          console.log('Error signing out after failed login:', signOutError);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/insula-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.description}>
              Ingresa tus credenciales para continuar
            </Text>
          </View>

          <View style={styles.cardContent}>
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="tu@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tu contraseña"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  editable={!isLoading}
                />
              </View>

              <TouchableOpacity
                style={styles.googleButton}
                onPress={handleGoogleSignIn}
                disabled={isLoading}
              >
                <Image 
                  source={require('../assets/google-icon-PNG.png')}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>
                  Continuar con Google
                </Text>
              </TouchableOpacity>

              <View style={styles.orDivider}>
                <View style={styles.dividerLine} />
                <Text style={styles.orText}>O</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity 
                style={styles.forgotPasswordContainer}
                onPress={() => navigation.navigate('ForgotPasswordPage')}
              >
                <Text style={styles.forgotPasswordText}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? "Ingresando..." : "Iniciar Sesión"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.demoButton]}
                onPress={handleDemoLogin}
                disabled={isLoading}
              >
                <Text style={styles.demoButtonText}>
                  Usar credenciales de demo
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              ¿No tienes una cuenta?{" "}
              <Text 
                style={styles.footerLink}
                onPress={() => navigation.navigate('Signup')}
              >
                Regístrate
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: -10,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22c55e',
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
  cardHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  cardContent: {
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
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
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '500',
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#d1d5db',
  },
  orText: {
    color: '#6b7280',
    marginHorizontal: 12,
    fontSize: 14,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#22c55e',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  demoButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  demoButtonText: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  footerLink: {
    color: '#22c55e',
    fontWeight: '500',
  },
});

