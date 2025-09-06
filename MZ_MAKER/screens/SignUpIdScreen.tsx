import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { Colors } from '../constants/Colors';
import { SignUpIdScreenProps } from '../navigation/types';
import DomainPicker from '../components/DomainPicker';

const SignUpIdScreen: React.FC<SignUpIdScreenProps> = ({ navigation }) => {
    const [localPart, setLocalPart] = useState('');
    const [domain, setDomain] = useState('선택');
    const [customDomain, setCustomDomain] = useState('');

    const finalDomain = domain === '직접입력' ? customDomain : domain;
    const isButtonDisabled = !localPart || (finalDomain === '선택') || (domain === '직접입력' && !customDomain);

    const handleDomainChange = (selectedDomain: string) => {
        setDomain(selectedDomain);
        if (selectedDomain !== '직접입력') {
            setCustomDomain('');
        }
    };

    const handleNextPress = () => {
        const userEmail = `${localPart}@${finalDomain}`;
        navigation.navigate('SignUpPassword', { userEmail });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.content}>
                    <Text style={styles.label}>아이디</Text>
                    <View style={styles.emailContainer}>
                        <CustomTextInput
                            style={styles.localInput}
                            placeholder="이메일"
                            value={localPart}
                            onChangeText={setLocalPart}
                            keyboardType="email-address"
                        />
                        <Text style={styles.at}>@</Text>
                        <DomainPicker domain={finalDomain} onDomainChange={handleDomainChange} />
                    </View>
                    {domain === '직접입력' && (
                        <CustomTextInput
                            style={styles.customDomainInput}
                            placeholder="도메인 입력"
                            value={customDomain}
                            onChangeText={setCustomDomain}
                            autoCapitalize="none"
                        />
                    )}
                </View>
                <View style={styles.bottom}>
                    <PrimaryButton
                        title="다음"
                        onPress={handleNextPress}
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
    label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    bottom: { padding: 20 },
    emailContainer: { flexDirection: 'row', alignItems: 'center' },
    localInput: { flex: 1, marginRight: 5 },
    at: { fontSize: 18, marginHorizontal: 5 },
    customDomainInput: { marginTop: 10 },
});

export default SignUpIdScreen;