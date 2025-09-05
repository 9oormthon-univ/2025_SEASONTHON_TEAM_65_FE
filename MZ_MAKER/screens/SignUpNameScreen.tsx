import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { Colors } from '../constants/Colors';
import { SignUpNameScreenProps } from '../navigation/types';

const SignUpNameScreen: React.FC<SignUpNameScreenProps> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isSignUpSuccessful, setSignUpSuccessful] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', '사진을 선택하려면 앨범 접근 권한이 필요합니다.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSignUp = () => {
        // TODO: Implement actual sign-up logic (API call)
        console.log('Signing up with:', { name, imageUri });
        setSignUpSuccessful(true);
    };

    const goToLogin = () => {
        navigation.popToTop(); // Clear sign-up stack
        navigation.navigate('Login');
    };

    if (isSignUpSuccessful) {
        return (
            <SafeAreaView style={styles.container_success}>
                <Feather name="check-circle" size={80} color="green" />
                <Text style={styles.successText}>{`${name}님의 회원가입이\n성공적으로 완료되었습니다.`}</Text>
                <View style={styles.bottom}>
                    <PrimaryButton title="로그인하러 가기" onPress={goToLogin} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.content}>
                    <Text style={styles.label}>이름</Text>
                    <CustomTextInput
                        placeholder="이름 입력"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>프로필 사진</Text>
                    <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.profileImage} />
                        ) : (
                            <Feather name="camera" size={40} color={Colors.gray} />
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
                    <PrimaryButton
                        title="회원가입"
                        onPress={handleSignUp}
                        disabled={!name}
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
    bottom: { padding: 20, width: '100%' },
    imagePicker: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    // Success styles
    container_success: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    successText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 30,
    },
});

export default SignUpNameScreen;
