import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { SplashScreenProps } from '../navigation/types';

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login'); // 2초 후 Login 화면으로 이동
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MZ 메이커</Text>
      <Text style={styles.subtitle}>우리만 알 수 있는 특급 추억 제조기</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: Colors.darkGray },
});

export default SplashScreen;