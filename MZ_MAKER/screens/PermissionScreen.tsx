import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { RootStackParamList } from '../navigation/types'; // 네비게이션 타입 임포트

// 네비게이션 prop 타입 정의
type PermissionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Permission'>;

const PermissionScreen = () => {
    const navigation = useNavigation<PermissionScreenNavigationProp>();
    console.log('Navigation object in PermissionScreen:', navigation);

    const requestPermissions = async () => {
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

        if (cameraStatus === 'granted' && mediaStatus === 'granted') {
            // 권한이 모두 허용되면 CameraScreen으로 이동 (네비게이터 설정 후 이름 변경 필요)
            navigation.replace('Camera'); 
        } else {
            Alert.alert(
                '권한 필요',
                '추억을 기록하기 위해 카메라 및 갤러리 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
                [{ text: '확인', onPress: () => navigation.goBack() }]
            );
        }
    };

    // "허용" 버튼을 눌렀을 때의 핸들러
    const handleAllow = () => {
        requestPermissions();
    };

    // "허용 안 함" 버튼을 눌렀을 때의 핸들러
    const handleDeny = () => {
        Alert.alert('권한 거부됨', '기능을 사용하기 위해 권한이 필요합니다.');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                animationType="fade"
                visible={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>이 기기가 카메라 및 갤러리에 접근하도록 허용하시겠습니까?</Text>
                        <Text style={styles.modalDescription}>여기에 사용자의 iPhone에 저장되어 있는 사진과 함께 촬영할 수 있습니다.</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleDeny}>
                                <Text style={styles.buttonText}>허용 안 함</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonSeparator} />
                            <TouchableOpacity style={styles.button} onPress={handleAllow}>
                                <Text style={[styles.buttonText, styles.allowButtonText]}>허용</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', // 반투명 배경
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingTop: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    modalDescription: {
        fontSize: 14,
        color: '#555555',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonSeparator: {
        width: 1,
        backgroundColor: '#E0E0E0',
    },
    buttonText: {
        fontSize: 16,
        color: '#007AFF', // iOS 기본 파란색
    },
    allowButtonText: {
        fontWeight: 'bold',
    },
});

export default PermissionScreen;
