import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, testUsers } from '../data/UserData';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    signup: (userData: Omit<User, 'id' | 'workSummary'>) => Promise<boolean>;
    updateUser: (userData: Partial<User>) => void;
    updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
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
        }
    }, [user]);

    const login = async (email: string, password: string) => {
        // Simulate API call
        const foundUser = testUsers.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (foundUser) {
            setUser(foundUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const signup = async (userData: Omit<User, 'id' | 'workSummary'>) => {
        // Simulate API call
        const existingUser = testUsers.find(
            u => u.email.toLowerCase() === userData.email.toLowerCase()
        );

        if (existingUser) {
            return false;
        }

        const newUser: User = {
            ...userData,
            id: String(testUsers.length + 1),
            workSummary: {
                baggageHandledToday: 0,
                baggageLostCases: 0,
                baggageTransferUpdates: 0,
                averageResolutionTime: 0
            }
        };

        testUsers.push(newUser);
        setUser(newUser);
        return true;
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            
            // Update in testUsers array
            const userIndex = testUsers.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
                testUsers[userIndex] = updatedUser;
            }
        }
    };

    const updatePassword = async (oldPassword: string, newPassword: string) => {
        if (user && user.password === oldPassword) {
            updateUser({ password: newPassword });
            return true;
        }
        return false;
    };

    const updateSettings = (settings: Partial<User['settings']>) => {
        if (user) {
            updateUser({
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