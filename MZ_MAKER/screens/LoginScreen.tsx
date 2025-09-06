import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { Colors } from '../constants/Colors';
import { LoginScreenProps } from '../navigation/types';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://34.219.249.84:3000/ItDa/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: email,
          userPassword: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        // TODO: Store user data securely (e.g., in AsyncStorage or a state management library)
        navigation.replace('Main');
      } else {
        const errorData = await response.json();
        Alert.alert('Login Failed', errorData.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleDebugButtonPress = async () => {
    try {
      const response = await fetch('http://34.219.249.84:3000/ItDa/api/v1/ping');
      const data = await response.json();
      console.log(data);
      Alert.alert('API Response', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch data from API');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}><Text style={styles.logo}>MZ- MAKER</Text></View>
      </View>
      <View style={styles.formContainer}>
        <CustomTextInput placeholder="아이디(이메일)" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <CustomTextInput placeholder="비밀번호" secureTextEntry={true} value={password} onChangeText={setPassword} />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton style={styles.login} textStyle={styles.loginText} title="로그인" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.navigate('SignUpId')}>
          <Text style={styles.signUpText}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.debugButton} onPress={handleDebugButtonPress}>
        <Text style={styles.debugButtonText}>Debug</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20, justifyContent: 'space-between' },
  logoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoBox: { width: 150, height: 150, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  formContainer: { paddingLeft:10,paddingRight:10, flex: 1, justifyContent: 'flex-start' },
  buttonContainer: { flex: 1, justifyContent: 'flex-start', alignItems: 'center' },
  socialButton: { width: '100%', backgroundColor: '#FEE500', padding: 20, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  socialButtonText: { color: '#000000', fontSize: 16, fontWeight: 'bold' },
  signUpText: { marginTop: 20, color: Colors.darkGray, textDecorationLine: 'underline' },
  logo: {fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
    login:{backgroundColor:'#1A1D29',paddingHorizontal:20,paddingTop:10},
    loginText: {color: 'white', fontWeight: 'bold'},
  debugButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
  },
  debugButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;