// src/useAuthStore.ts
import create from 'zustand'
import { persist } from 'zustand/middleware';

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthStateLogin {
    token: string | null;
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    fetchUserData: () => Promise<void>;
}

export const useAuthStore = create(persist<AuthStateLogin>(
    (set, get) => ({
        token: null,
        isAuthenticated: false,
        user: null,
        login: async (email, password) => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) {
                    throw new Error('Login failed');
                }

                const data = await response.json();
                set({ token: data.token });
                set({ isAuthenticated: true });
                await get().fetchUserData();
                console.log("Login exitoso. Token:", data.token);
            } catch (error) {
                console.error('Error during login:', error);
                set({ isAuthenticated: false });
                throw error;
            }
        },
        logout: () => set({ token: null, isAuthenticated: false, user: null }),

        fetchUserData: async () => {
            const token = get().token;
            if (token) {
                try {
                    const response = await fetch('http://localhost:5000/api/user/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }

                    const userData = await response.json();
                    set({ user: userData });
                    console.log("Datos del usuario cargados:", userData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        },

    }),
    {
        name: 'auth-storage',
        getStorage: () => localStorage,
    }
));


interface AuthStateRegister {
    token: string | null;
    successMessage: string;
    errorMessage: string; // Nuevo estado para manejar mensajes de error
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    setSuccessMessage: (message: string) => void;
    setErrorMessage: (message: string) => void; // Nuevo método para actualizar el mensaje de error
}

export const AuthStoreRegister = create<AuthStateRegister>((set) => ({
    token: null,
    successMessage: '',
    errorMessage: '', // Inicialización del nuevo estado
    register: async (email, password, name) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const { token } = await response.json();
            set({ token, successMessage: "Usuario creado con éxito!", errorMessage: '' });
        } catch (error: unknown) {
            let errorMessage = 'Registration failed';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            set({ errorMessage });
        }

    },
    logout: () => set({ token: null, successMessage: '', errorMessage: '' }),
    setSuccessMessage: (message) => set({ successMessage: message }),
    setErrorMessage: (message) => set({ errorMessage: message }),
}));
