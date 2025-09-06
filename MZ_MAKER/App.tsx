import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider } from './context/AuthContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'Pretendard-Regular': require('./assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Bold': require('./assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-SemiBold': require('./assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Medium': require('./assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-Light': require('./assets/fonts/Pretendard-Light.otf'),
    'Pretendard-ExtraLight': require('./assets/fonts/Pretendard-ExtraLight.otf'),
    'Pretendard-Thin': require('./assets/fonts/Pretendard-Thin.otf'),
    'Pretendard-Black': require('./assets/fonts/Pretendard-Black.otf'),
    'Pretendard-ExtraBold': require('./assets/fonts/Pretendard-ExtraBold.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}