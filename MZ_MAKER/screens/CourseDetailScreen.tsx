import { Feather } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { RootStackParamList } from '../navigation/types';

// --- 1. 타입 정의 ---
// API 응답 데이터 타입
interface CourseDetails {
    courseTitle: string;
    courseDescription: string;
    courseTag: number; // Assuming tag is a number as per spec
    courseImageUrl: string;
    courseSchedule: string;
}

type ScheduleItemProps = {
    text: string;
};

type CourseDetailRouteProp = RouteProp<RootStackParamList, 'CourseDetail'>;

// --- 2. 하위 컴포넌트 ---
const ScheduleItem: React.FC<ScheduleItemProps> = ({ text }) => (
    <View style={styles.scheduleItemContainer}>
        <Text style={styles.mapPinEmoji}>📍</Text>
        <Text style={styles.scheduleItemText}>{text}</Text>
    </View>
);

// --- 3. 메인 화면 컴포넌트 ---
const CourseDetailScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<CourseDetailRouteProp>();
    const { course } = route.params;

    const [details, setDetails] = useState<CourseDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourseDetails(course.id);
    }, [course.id]);

    const fetchCourseDetails = async (courseId: number) => {
        try {
            const response = await fetch(`http://34.219.249.84:3000/ItDa/api/v1/course/${courseId}`);

            if (response.ok) {
                const data = await response.json();
                setDetails(data);
            } else {
                Alert.alert('오류', '코스 정보를 불러오는데 실패했습니다.');
            }
        } catch (error) {
            Alert.alert('오류', '네트워크 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!details) {
        return (
            <View style={styles.centeredContainer}>
                <Text>코스 정보를 찾을 수 없습니다.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Feather name="arrow-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} numberOfLines={1}>{details.courseTitle}</Text>
                    <View style={styles.backButton} />
                </View>

                <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
                    <Image source={{ uri: details.courseImageUrl }} style={styles.mainBanner} />

                    <View style={styles.courseInfoContainer}>
                        <Text style={styles.courseTitle}>{details.courseTitle}</Text>
                        <Text style={styles.courseSubtitle}>{details.courseDescription}</Text>
                    </View>

                    <View style={styles.hashtagContainer}>
                        <View style={styles.tag}><Text style={styles.tagText}>{`#${details.courseTag}`}</Text></View>
                    </View>

                    <View style={styles.scheduleBox}>
                        <Text style={styles.scheduleBoxTitle}>코스 상세 일정</Text>
                        {details.courseSchedule.split('\n').map((line, index) => (
                            <ScheduleItem key={index} text={line} />
                        ))}
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.fixedButton} onPress={() => navigation.navigate('Permission')}> 
                    <Text style={styles.fixedButtonText}>추억 담아내기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// --- 4. 스타일시트 ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    container: { flex: 1, paddingHorizontal: 20 },
    centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    backButton: { width: 24 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000000', flex: 1, textAlign: 'center', marginHorizontal: 8 },
    scrollArea: { flex: 1 },
    mainBanner: {
        backgroundColor: '#E0E0E0',
        borderRadius: 12,
        height: 180,
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    courseInfoContainer: { marginTop: 24 },
    courseTitle: { fontSize: 22, fontWeight: 'bold', color: '#000000' },
    courseSubtitle: { fontSize: 16, color: '#888888', marginTop: 8 },
    hashtagContainer: { flexDirection: 'row', marginTop: 16, gap: 8 },
    tag: { backgroundColor: '#F0F0F0', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 12 },
    tagText: { fontSize: 14, color: '#555555' },
    scheduleBox: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 16, marginTop: 24, marginBottom: 24 },
    scheduleBoxTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
    scheduleItemContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    scheduleItemText: { fontSize: 15, color: '#333333', marginLeft: 12 },
    mapPinEmoji: { fontSize: 16 },
    fixedButton: { backgroundColor: '#1A2233', borderRadius: 12, paddingVertical: 18, alignItems: 'center', justifyContent: 'center', marginVertical: 12 },
    fixedButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default CourseDetailScreen;