import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the user data and auth context
interface User {
    userId: string; // or number
    userEmail: string;
    userName: string;
    profileImgUrl: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
        // Here you would also typically handle storing the user session (e.g., in AsyncStorage)
    };

    const logout = () => {
        setUser(null);
        // Here you would also handle clearing the stored session
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook for easy access to the context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
