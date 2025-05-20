import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../data/UserData';

const BASE_URL = 'https://backend-system-v2.onrender.com';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string, userType: 'airport' | 'airline') => Promise<boolean>;
    logout: () => void;
    signup: (userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        userType: 'airport' | 'airline';
        gender: 'M' | 'F';
    }) => Promise<boolean>;
    updateUser: (userData: Partial<User>) => void;
    updatePassword: () => Promise<boolean>;
    updateSettings: (settings: Partial<User['settings']>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    }, [user]);

    const login = async (email: string, password: string, userType: 'airport' | 'airline') => {
        try {
            const response = await fetch(`${BASE_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, userType }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                return false;
            }

            const backendData = await response.json();
            
            localStorage.setItem('accessToken', backendData.accessToken);
            localStorage.setItem('refreshToken', backendData.refreshToken);

            const userFromBackend = backendData.user;
            const mappedUser: User = {
                id: userFromBackend._id || '',
                email: userFromBackend.email || '',
                firstName: userFromBackend.firstName || '',
                lastName: userFromBackend.lastName || '',
                phoneNumber: userFromBackend.phoneNumber || '',
                userType: userFromBackend.userType || '',
                gender: userFromBackend.gender || '',
                profileImage: userFromBackend.profileImage || 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg',
                workSummary: {
                    baggageHandledToday: 0,
                    baggageLostCases: 0,
                    baggageTransferUpdates: 0,
                    averageResolutionTime: 0
                },
                settings: {
                    emailNotifications: true,
                    pushNotifications: true,
                    smsNotifications: false,
                    dailyReportEmail: true
                }
            };

            setUser(mappedUser);
            return true;

        } catch (error) {
            console.error('Login request failed:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    const signup = async (userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        userType: 'airport' | 'airline';
        gender: 'M' | 'F';
    }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Signup failed:', errorData);
                return false;
            }

            const backendData = await response.json();
            
            localStorage.setItem('accessToken', backendData.accessToken);
            localStorage.setItem('refreshToken', backendData.refreshToken);

            const userFromBackend = backendData.user;
            const mappedUser: User = {
                id: userFromBackend._id || '',
                email: userFromBackend.email || '',
                firstName: userFromBackend.firstName || '',
                lastName: userFromBackend.lastName || '',
                phoneNumber: userFromBackend.phoneNumber || '',
                userType: userFromBackend.userType || '',
                gender: userFromBackend.gender || '',
                profileImage: userFromBackend.profileImage || 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg',
                workSummary: {
                    baggageHandledToday: 0,
                    baggageLostCases: 0,
                    baggageTransferUpdates: 0,
                    averageResolutionTime: 0
                },
                settings: {
                    emailNotifications: true,
                    pushNotifications: true,
                    smsNotifications: false,
                    dailyReportEmail: true
                }
            };

            setUser(mappedUser);
            return true;

        } catch (error) {
            console.error('Signup request failed:', error);
            return false;
        }
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
        }
    };

    const updatePassword = async () => {
        console.warn('updatePassword not implemented for backend');
        return false;
    };

    const updateSettings = (settings: Partial<User['settings']>) => {
        console.warn('updateSettings not implemented for backend');
        if (user) {
            setUser({
                ...user,
                settings: { ...user.settings, ...settings }
            });
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            signup,
            updateUser,
            updatePassword,
            updateSettings
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 