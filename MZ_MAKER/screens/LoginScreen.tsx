import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { Colors } from '../constants/Colors';
import { LoginScreenProps } from '../navigation/types';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}><Text>LOGO</Text></View>
      </View>
      <View style={styles.formContainer}>
        <CustomTextInput placeholder="아이디(이메일)" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <CustomTextInput placeholder="비밀번호" secureTextEntry={true} value={password} onChangeText={setPassword} />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="로그인" onPress={() => navigation.replace('Main')} />
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>카카오 계정으로 시작하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpId')}>
          <Text style={styles.signUpText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20, justifyContent: 'space-between' },
  logoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoBox: { width: 150, height: 150, backgroundColor: Colors.lightGray, justifyContent: 'center', alignItems: 'center' },
  formContainer: { flex: 1, justifyContent: 'flex-start' },
  buttonContainer: { flex: 1, justifyContent: 'flex-start', alignItems: 'center' },
  socialButton: { width: '100%', backgroundColor: '#FEE500', padding: 20, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  socialButtonText: { color: '#000000', fontSize: 16, fontWeight: 'bold' },
  signUpText: { marginTop: 20, color: Colors.darkGray, textDecorationLine: 'underline' },
});

export default LoginScreen;