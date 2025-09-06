// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    userId?: number;
    userEmail: string;
    userName: string;
    userPassword?: string;
    profileImgUrl?: string;
    created?: string;
    updated?: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (userData: User) => {
        try {
            setIsLoading(true);
            // 사용자 정보 저장 (비밀번호는 저장하지 않음)
            const userToStore = {
                ...userData,
                userPassword: undefined, // 비밀번호 제거
                userId: userData.userEmail // userId가 없으면 email을 ID로 사용
            };

            setUser(userToStore);

            // AsyncStorage에 저장 (선택사항)
            await AsyncStorage.setItem('user', JSON.stringify(userToStore));
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            await AsyncStorage.removeItem('user');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // 앱 시작 시 저장된 사용자 정보 불러오기
    React.useEffect(() => {
        const loadUser = async () => {
            try {
                const savedUser = await AsyncStorage.getItem('user');
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error('Load user error:', error);
            }
        };
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};