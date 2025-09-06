import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CameraView, useCameraPermissions } from 'expo-camera'; // 변경된 부분
import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Alert
} from 'react-native';
import { RootStackParamList } from '../navigation/types';

type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

const CameraScreen = () => {
    const navigation = useNavigation<CameraScreenNavigationProp>();
    const [facing, setFacing] = useState<'back' | 'front'>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<any>(null);

    if (!permission) {
        // 카메라 권한이 아직 로드되지 않음
        return <View />;
    }

    if (!permission.granted) {
        // 카메라 권한이 아직 부여되지 않음
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>카메라 권한이 필요합니다</Text>
                <Button onPress={requestPermission} title="권한 허용" />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                navigation.navigate('PhotoPreview', { imageUri: photo.uri });
            } catch (error) {
                Alert.alert('오류', '사진 촬영 중 문제가 발생했습니다.');
            }
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
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>엄마와의 순간을 담아주세요</Text>
                <View style={{ width: 24 }} />
            </View>

            <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

            <View style={styles.controlsContainer}>
                <TouchableOpacity style={styles.controlButton} onPress={pickImage}>
                    <Feather name="image" size={28} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
                    <View style={styles.shutterButtonInner} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
                    <Feather name="refresh-cw" size={28} color="#000" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
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