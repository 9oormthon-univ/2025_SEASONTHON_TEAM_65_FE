import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';

// 네비게이션 및 라우트 prop 타입 정의
type PhotoPreviewNavigationProp = StackNavigationProp<RootStackParamList, 'PhotoPreview'>;
type PhotoPreviewRouteProp = RouteProp<RootStackParamList, 'PhotoPreview'>;

const PhotoPreviewScreen = () => {
    const navigation = useNavigation<PhotoPreviewNavigationProp>();
    const route = useRoute<PhotoPreviewRouteProp>();
    const { imageUri } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>사진 선택</Text>
                <View style={{ width: 24 }} />{/* 제목 중앙 정렬용 더미 뷰*/}
            </View>

            {/* 사진 프리뷰 */}
            <Image source={{ uri: imageUri }} style={styles.previewImage} />

            {/* 하단 버튼 영역 */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>다시 촬영하기</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.confirmButton]}
                    onPress={() => navigation.navigate('MemoryForm', { imageUri })}
                >
                    <Text style={[styles.buttonText, styles.confirmButtonText]}>이 사진으로 하기</Text>
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
    previewImage: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        height: 90,
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        gap: 10,
    },
    button: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
    confirmButton: {
        backgroundColor: '#1A2233',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    confirmButtonText: {
        color: '#FFFFFF',
    },
});

export default PhotoPreviewScreen;
