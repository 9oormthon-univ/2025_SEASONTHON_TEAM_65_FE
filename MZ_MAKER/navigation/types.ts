import { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

// 공용 타입
export type DateCourse = {
  id: string;
  course_image_url: string;
  title: string;
  subtitle: string;
};

// Bottom Tab Navigator
export type MainTabParamList = {
  Home: undefined;
  Archive: undefined;
  MyPage: undefined;
};

// Main Stack Navigator
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUpId: undefined;
  SignUpPassword: undefined;
  SignUpName: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  CourseDetail: { course: DateCourse };
  // 추억 기록하기 플로우
  Permission: undefined;
  Camera: undefined;
  PhotoPreview: { imageUri: string };
  MemoryForm: { imageUri: string };
  MyPage: undefined;
  
  ImageCrop: { imageUri: string };
  Result: { croppedImageUri: string };
  Settings: undefined;
};

// 각 화면에서 props 타입을 쉽게 사용하기 위해 미리 정의
export type SplashScreenProps = StackScreenProps<RootStackParamList, 'Splash'>;
export type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;
export type SignUpIdScreenProps = StackScreenProps<RootStackParamList, 'SignUpId'>;
export type SignUpPasswordScreenProps = StackScreenProps<RootStackParamList, 'SignUpPassword'>;
export type SignUpNameScreenProps = StackScreenProps<RootStackParamList, 'SignUpName'>;
export type CourseDetailScreenProps = StackScreenProps<RootStackParamList, 'CourseDetail'>;
