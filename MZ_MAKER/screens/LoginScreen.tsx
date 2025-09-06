import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../navigation/types'; // Assuming your types are in this file

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.title}>MZ 메이커</Text>
          <Text style={styles.subtitle}>우리만 알 수 있는 특급 추억 제조기</Text>
        </View>

        <View style={styles.inputContainer}>
          <View
            style={[
              styles.inputWrapper,
              { borderColor: isEmailFocused ? '#1A2233' : '#E0E0E0' },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="이메일"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              placeholderTextColor="#666666"
            />
          </View>

          <View
            style={[
              styles.inputWrapper,
              { borderColor: isPasswordFocused ? '#1A2233' : '#E0E0E0' },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              placeholderTextColor="#666666"
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Feather
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#666666"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.replace('Main')}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupLink} onPress={() => navigation.navigate('SignUpId')}>
          <Text style={styles.signupText}>회원가입</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.debugButton} onPress={handleDebugButtonPress}>
        <Text style={styles.debugButtonText}>Debug</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48, // More space for logo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#000000',
  },
  icon: {
    padding: 15,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1A2233',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupLink: {
    alignItems: 'center',
  },
  signupText: {
    color: '#666666',
    textDecorationLine: 'underline',
  },
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