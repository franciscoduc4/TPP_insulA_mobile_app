import { create } from "zustand"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persist, createJSONStorage } from "zustand/middleware"
import { loginUser, registerUser, getUserProfile, UserResponse } from '../lib/api/auth'
import { GlucoseProfile, User } from '../types'
import { StateCreator } from 'zustand'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    birthDay: number
    birthMonth: number
    birthYear: number
    weight: number
    height: number
    glucoseProfile: GlucoseProfile
  }) => Promise<void>
  logout: () => Promise<void>
  loadUser: () => Promise<void>
  clearError: () => void
}

type AuthStateCreator = StateCreator<
  AuthState,
  [],
  [["zustand/persist", unknown]],
  AuthState
>;

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  weight: number;
  height: number;
  glucoseProfile: GlucoseProfile;
}

// Modified to accommodate UserResponse structure
interface AuthResponse extends Omit<User, 'birthDay' | 'birthMonth' | 'birthYear' | 'weight' | 'height' | 'glucoseProfile'> {
  token: string;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
  weight?: number;
  height?: number;
  glucoseProfile?: GlucoseProfile;
}

export const useAuth = create<AuthState>()(
  persist(
    ((set, get): AuthState => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
          const response = await loginUser({ email, password } as LoginCredentials);
          // Only set as user if all required fields are present
          if (response && 
              response.id && 
              response.firstName && 
              response.lastName && 
              response.birthDay !== undefined && 
              response.birthMonth !== undefined && 
              response.birthYear !== undefined && 
              response.weight !== undefined && 
              response.height !== undefined && 
              response.glucoseProfile) {
            set({ 
              token: response.token, 
              user: response as unknown as User, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            set({ 
              token: response.token,
              isAuthenticated: true,
              isLoading: false 
            });
          }
        } catch (error: unknown) {
          const errorMessage: string = error instanceof Error ? error.message : 'Error al iniciar sesión';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },
      
      register: async (userData: RegisterUserData): Promise<void> => {
        set({ isLoading: true, error: null });
        try {
          const response = await registerUser(userData);
          // All fields should be present after registration
          set({ 
            token: response.token, 
            user: response as unknown as User, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: unknown) {
          const errorMessage: string = error instanceof Error ? error.message : 'Error al registrar usuario';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },
      
      logout: async (): Promise<void> => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      
      loadUser: async (): Promise<void> => {
        const { token } = get();
        if (!token) return;
        
        set({ isLoading: true });
        try {
          const userData = await getUserProfile(token);
          // Only set as user if all required fields are present
          if (userData && 
              userData.id && 
              userData.firstName && 
              userData.lastName && 
              userData.birthDay !== undefined && 
              userData.birthMonth !== undefined && 
              userData.birthYear !== undefined && 
              userData.weight !== undefined && 
              userData.height !== undefined && 
              userData.glucoseProfile) {
            set({ 
              user: userData as unknown as User, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            set({ isAuthenticated: true, isLoading: false });
          }
        } catch (error) {
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
      },
      
      clearError: (): void => set({ error: null })
    })) as AuthStateCreator,
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)