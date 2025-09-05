import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';

// 네비게이션 및 라우트 prop 타입 정의
type MemoryFormNavigationProp = StackNavigationProp<RootStackParamList, 'MemoryForm'>;
type MemoryFormRouteProp = RouteProp<RootStackParamList, 'MemoryForm'>;

const MemoryFormScreen = () => {
    const navigation = useNavigation<MemoryFormNavigationProp>();
    const route = useRoute<MemoryFormRouteProp>();
    const { imageUri } = route.params;

    const [momSaid, setMomSaid] = useState('');
    const [iFelt, setIFelt] = useState('');

    const isButtonDisabled = !momSaid || !iFelt;

    const handleSave = () => {
        Alert.alert(
            '추억 저장 완료!',
            `이미지: ${imageUri}\n엄마가 한 말: ${momSaid}\n내가 느낀 점: ${iFelt}`,
            [{ text: '확인', onPress: () => navigation.popToTop() }] // 확인 후 홈으로 이동
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {/* 헤더 */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>느낌점 기록</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {/* 이미지 표시 */}
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />

                    {/* 텍스트 입력 필드 1 */}
                    <Text style={styles.label}>이날 엄마가 한 말 💭</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="엄마가 했던 말 중 기억나는 것을 기록해보세요..."
                        value={momSaid}
                        onChangeText={setMomSaid}
                        multiline
                    />

                    {/* 텍스트 입력 필드 2 */}
                    <Text style={styles.label}>내가 느낀 점 💭</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="하루를 돌아보며 감상을 간단히 작성해보세요..."
                        value={iFelt}
                        onChangeText={setIFelt}
                        multiline
                    />
                </ScrollView>

                {/* 하단 고정 버튼 */}
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity 
                        style={[styles.saveButton, isButtonDisabled && styles.disabledButton]}
                        onPress={handleSave}
                        disabled={isButtonDisabled}
                    >
                        <Text style={styles.saveButtonText}>추억 저장하기</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    scrollContainer: { flex: 1, paddingHorizontal: 20 },
    imagePreview: {
        width: '100%',
        height: 250,
        borderRadius: 12,
        marginVertical: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    textInput: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 15,
        fontSize: 15,
        minHeight: 100,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    bottomButtonContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    saveButton: {
        backgroundColor: '#1A2233',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#A9A9A9',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MemoryFormScreen;
