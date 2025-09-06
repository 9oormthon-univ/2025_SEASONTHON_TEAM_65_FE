import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView, // <-- ScrollView 추가
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { Colors } from '../constants/Colors';
import { SignUpIdScreenProps } from '../navigation/types';

const DOMAINS = ['gmail.com', 'naver.com', 'daum.net', 'hanmail.net', 'nate.com', '직접입력'];

const SignUpIdScreen: React.FC<SignUpIdScreenProps> = ({ navigation }) => {
    const [localPart, setLocalPart] = useState('');
    const [domain, setDomain] = useState('선택');
    const [customDomain, setCustomDomain] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const finalDomain = domain === '직접입력' ? customDomain : domain;
    const isButtonDisabled = !localPart || (finalDomain === '선택') || (domain === '직접입력' && !customDomain);

    const handleDomainSelect = (selectedDomain: string) => {
        setDomain(selectedDomain);
        if (selectedDomain !== '직접입력') {
            setCustomDomain('');
        }
        setModalVisible(false);
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
                        <TouchableOpacity style={styles.domainSelector} onPress={() => setModalVisible(true)}>
                            <Text style={styles.domainText}>{finalDomain}</Text>
                        </TouchableOpacity>
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

            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            {DOMAINS.map((d) => (
                                <TouchableOpacity key={d} style={styles.domainOption} onPress={() => handleDomainSelect(d)}>
                                    <Text style={styles.domainOptionText}>{d}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    content: { flex: 1, justifyContent: 'flex-start', padding: 20, paddingTop: 40 },
    label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    bottom: { padding: 20 },
    emailContainer: { flexDirection: 'row', alignItems: 'center' },
    localInput: { flex: 2, marginRight: 5 }, // 비율 조정
    at: { fontSize: 18, marginHorizontal: 5 },
    domainSelector: { flex: 1, borderWidth: 1, borderColor: Colors.gray, padding: 15, borderRadius: 5, justifyContent: 'center' }, // 비율 조정
    domainText: { fontSize: 16 },
    customDomainInput: { marginTop: 10 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { 
        backgroundColor: Colors.white, 
        borderRadius: 10, 
        padding: 20, 
        width: '80%', 
        maxHeight: '60%' // <-- 최대 높이 제한 추가
    },
    domainOption: { paddingVertical: 15 },
    domainOptionText: { fontSize: 18, textAlign: 'center' },
});

export default SignUpIdScreen;
