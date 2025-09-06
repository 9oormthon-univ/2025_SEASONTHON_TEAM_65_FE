import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// --- 모든 스크린 및 네비게이터 import ---
import LoginScreen from '../screens/LoginScreen';
import SignUpIdScreen from '../screens/SignUpIdScreen';
import SignUpNameScreen from '../screens/SignUpNameScreen';
import SignUpPasswordScreen from '../screens/SignUpPasswordScreen';
import SplashScreen from '../screens/SplashScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import MainTabNavigator from './MainTabNavigator';
import PermissionScreen from '../screens/PermissionScreen';
import CameraScreen from '../screens/CameraScreen';
import PhotoPreviewScreen from '../screens/PhotoPreviewScreen';
import MemoryFormScreen from '../screens/MemoryFormScreen';
import MyPageScreen from '../screens/MyPageScreen';

import ImageCropScreen from '../screens/ImageCropScreen';
import ResultScreen from '../screens/ResultScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackParamList } from './types';

// --- 스택 네비게이터 생성 ---
const Stack = createStackNavigator<RootStackParamList>();

// --- 메인 앱 네비게이터 --- 
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      {/* 인증 및 메인 플로우 그룹 */}
      <Stack.Group>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpId" component={SignUpIdScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="SignUpPassword" component={SignUpPasswordScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="SignUpName" component={SignUpNameScreen} options={{ title: '회원가입' }} />
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyPage" component={MyPageScreen} options={{ headerShown: false }} />
        
        <Stack.Screen name="ImageCrop" component={ImageCropScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      </Stack.Group>

      {/* 추억 기록하기 플로우 그룹 (모달) */}
      <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen name="Permission" component={PermissionScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="PhotoPreview" component={PhotoPreviewScreen} />
        <Stack.Screen name="MemoryForm" component={MemoryFormScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigator;