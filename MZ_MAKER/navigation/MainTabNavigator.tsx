import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Feather } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MemoryArchiveScreen from '../screens/MemoryArchiveScreen';
import MyPageScreen from '../screens/MyPageScreen';
import { Colors } from '../constants/Colors';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: false, // 각 화면에서 헤더를 관리하므로 네비게이터 헤더는 숨김
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={Number(size)} />,
        }}
      />
      <Tab.Screen
        name="Archive"
        component={MemoryArchiveScreen}
        options={{
          title: '아카이브',
          tabBarIcon: ({ color, size }) => <Feather name="archive" color={color} size={Number(size)} />,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={Number(size)} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;