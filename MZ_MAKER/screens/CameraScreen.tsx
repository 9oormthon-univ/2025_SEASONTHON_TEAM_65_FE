import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { RootStackParamList } from '../navigation/types';

// 네비게이션 prop 타입 정의
type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

const CameraScreen = () => {
    const navigation = useNavigation<CameraScreenNavigationProp>();
    const [type, setType] = useState(CameraType.back);
    const cameraRef = useRef<Camera>(null);

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            navigation.navigate('PhotoPreview', { imageUri: photo.uri });
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            navigation.navigate('PhotoPreview', { imageUri: result.assets[0].uri });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>엄마와의 순간을 담아주세요</Text>
                <View style={{ width: 24 }} />{/* 제목 중앙 정렬용 더미 뷰*/}
            </View>

            {/* 카메라 프리뷰 */}
            <Camera style={styles.camera} type={type} ref={cameraRef} />

            {/* 하단 컨트롤 바 */}
            <View style={styles.controlsContainer}>
                <TouchableOpacity style={styles.controlButton} onPress={pickImage}>
                    <Feather name="image" size={28} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
                    <View style={styles.shutterButtonInner} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
                    <Feather name="refresh-cw" size={28} color="#000" />
                </TouchableOpacity>
            </View>
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
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    camera: {
        flex: 1,
    },
    controlsContainer: {
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    controlButton: {
        padding: 10,
    },
    shutterButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#1A2233',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#FFFFFF',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    shutterButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1A2233',
    },
});

export default CameraScreen;
