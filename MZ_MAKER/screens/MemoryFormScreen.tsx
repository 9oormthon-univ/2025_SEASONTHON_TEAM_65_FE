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
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';

type MemoryFormNavigationProp = StackNavigationProp<RootStackParamList, 'MemoryForm'>;
type MemoryFormRouteProp = RouteProp<RootStackParamList, 'MemoryForm'>;

const MemoryFormScreen = () => {
    const navigation = useNavigation<MemoryFormNavigationProp>();
    const route = useRoute<MemoryFormRouteProp>();
    const { imageUri } = route.params;
    const { user } = useAuth();

    const [momSaid, setMomSaid] = useState('');
    const [iFelt, setIFelt] = useState('');
    const [loading, setLoading] = useState(false);

    const isButtonDisabled = !momSaid || !iFelt || loading;

    const handleSave = async () => {
        // 하드코딩된 userId 사용
        const userId = 6;

        console.log('Using hardcoded userId:', userId);

        setLoading(true);

        try {
            const formData = new FormData();

            let processedUri = imageUri;
            if (Platform.OS === 'android' && !imageUri.startsWith('file://')) {
                processedUri = 'file://' + imageUri;
            }

            formData.append('image', {
                uri: processedUri,
                name: 'photo.jpg',
                type: 'image/jpeg'
            } as any);

            formData.append('courseId', '1');
            formData.append('mothersQuote', momSaid);
            formData.append('myFeeling', iFelt);

            const now = new Date();
            const activityDate = now.toISOString().slice(0, 19).replace('T', ' ');
            formData.append('activityDate', activityDate);

            const url = `http://34.219.249.84:3000/ItDa/api/v1/memory/${userId}`;
            console.log('Sending request to:', url);

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            const responseText = await response.text();
            console.log('Response:', responseText);

            if (response.ok) {
                Alert.alert(
                    '성공',
                    '추억이 성공적으로 저장되었습니다!',
                    [
                        {
                            text: '확인',
                            onPress: () => navigation.navigate('Main')
                        }
                    ]
                );
            } else {
                throw new Error(`서버 오류: ${response.status}`);
            }
        } catch (error) {
            console.error('Save error:', error);

            if (error instanceof TypeError && error.message === 'Network request failed') {
                Alert.alert(
                    '네트워크 오류',
                    '서버에 연결할 수 없습니다.\n\n' +
                    '다음을 확인해주세요:\n' +
                    '1. 인터넷 연결 상태\n' +
                    '2. 서버가 실행 중인지\n' +
                    '3. 방화벽 설정'
                );
            } else {
                Alert.alert('오류', error instanceof Error ? error.message : '추억 저장 중 오류가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.flex1}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>느낌점 기록</Text>
                    <View style={styles.headerSpace} />
                </View>

                <ScrollView
                    style={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />

                    <Text style={styles.label}>이날 엄마가 한 말 💭</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="엄마가 했던 말 중 기억나는 것을 기록해보세요..."
                        value={momSaid}
                        onChangeText={setMomSaid}
                        multiline
                        editable={!loading}
                        maxLength={500}
                    />

                    <Text style={styles.label}>내가 느낀 점 💭</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="하루를 돌아보며 감상을 간단히 작성해보세요..."
                        value={iFelt}
                        onChangeText={setIFelt}
                        multiline
                        editable={!loading}
                        maxLength={500}
                    />
                </ScrollView>

                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            isButtonDisabled && styles.disabledButton
                        ]}
                        onPress={handleSave}
                        disabled={isButtonDisabled}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.saveButtonText}>추억 저장하기</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// styles 객체가 컴포넌트 밖에 정의되어 있는지 확인
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    flex1: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    headerSpace: {
        width: 24
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 20
    },
    imagePreview: {
        width: '100%',
        height: 250,
        borderRadius: 12,
        marginVertical: 20,
        backgroundColor: '#F5F5F5',
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
        color: '#333',
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

// export default가 맨 마지막에 있는지 확인
export default MemoryFormScreen;