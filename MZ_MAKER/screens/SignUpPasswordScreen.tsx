import React, { useState, useMemo } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { Colors } from '../constants/Colors';
import { SignUpPasswordScreenProps } from '../navigation/types';

const ValidationText: React.FC<{ isValid: boolean; text: string }> = ({ isValid, text }) => (
    <Text style={{ color: isValid ? 'green' : 'red' }}>{text}</Text>
);

const SignUpPasswordScreen: React.FC<SignUpPasswordScreenProps> = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const validation = useMemo(() => {
        const isLengthValid = password.length >= 8;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const doPasswordsMatch = password === passwordConfirm && password.length > 0;
        return { isLengthValid, hasLetter, hasNumber, doPasswordsMatch };
    }, [password, passwordConfirm]);

    const isButtonDisabled = !Object.values(validation).every(Boolean);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.content}>
                    <Text style={styles.label}>비밀번호</Text>
                    <CustomTextInput
                        placeholder="비밀번호 입력"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <View style={styles.validationContainer}>
                        <ValidationText isValid={validation.isLengthValid} text="8자리 이상" />
                        <ValidationText isValid={validation.hasLetter} text="영문 포함" />
                        <ValidationText isValid={validation.hasNumber} text="숫자 포함" />
                    </View>

                    <Text style={styles.label}>비밀번호 확인</Text>
                    <CustomTextInput
                        placeholder="비밀번호 다시 입력"
                        value={passwordConfirm}
                        onChangeText={setPasswordConfirm}
                        secureTextEntry={true}
                    />
                     <View style={styles.validationContainer}>
                        <ValidationText isValid={validation.doPasswordsMatch} text="비밀번호 일치" />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <PrimaryButton
                        title="다음"
                        onPress={() => navigation.navigate('SignUpName')}
                        disabled={isButtonDisabled}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    content: { flex: 1, justifyContent: 'flex-start', padding: 20, paddingTop: 40 },
    label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 20 },
    bottom: { padding: 20 },
    validationContainer: { marginTop: 10, rowGap: 5 },
});

export default SignUpPasswordScreen;
