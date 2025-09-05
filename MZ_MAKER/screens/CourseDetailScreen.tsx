import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';

// --- 1. 타입 정의 ---
type ScheduleItemProps = {
    text: string;
};

// CourseDetail 라우트의 파라미터 타입 정의
type CourseDetailRouteProp = RouteProp<RootStackParamList, 'CourseDetail'>;

// --- 2. 하위 컴포넌트 ---

// 코스 상세 일정의 각 항목을 렌더링하는 컴포넌트
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
    const { course } = route.params; // 네비게이션 파라미터에서 course 객체 추출

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                {/* 1. 상단 헤더 */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Feather name="arrow-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>엄마와 함께하는 젠지한 하루</Text>
                    <View style={styles.backButton} />{/* 제목 중앙 정렬을 위한 더미 뷰*/}
                </View>

                {/* 2. 스크롤 가능한 콘텐츠 영역 */}
                <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
                    {/* 2.1. 메인 이미지 배너 */}
                    <View style={styles.mainBanner}>
                        <Feather name="image" size={48} color="#FFFFFF" />
                        <Text style={styles.bannerTextLarge}>성수동의 감성</Text>
                        <Text style={styles.bannerTextSmall}>엄마와 함께 만들 추억</Text>
                    </View>

                    {/* 2.2. 코스 제목 및 설명 */}
                    <View style={styles.courseInfoContainer}>
                        <Text style={styles.courseTitle}>{course.title}</Text>
                        <Text style={styles.courseSubtitle}>{course.subtitle}</Text>
                    </View>

                    {/* 2.3. 해시태그 */}
                    <View style={styles.hashtagContainer}>
                        <View style={styles.tag}><Text style={styles.tagText}>#성수데이트</Text></View>
                        <View style={styles.tag}><Text style={styles.tagText}>#3만원대</Text></View>
                        <View style={styles.tag}><Text style={styles.tagText}>#3시간</Text></View>
                    </View>

                    {/* 2.4. 코스 상세 일정 박스 */}
                    <View style={styles.scheduleBox}>
                        <Text style={styles.scheduleBoxTitle}>코스 상세 일정</Text>
                        <ScheduleItem text="어니언 카페 - 유명한 양파빵과 커피" />
                        <ScheduleItem text="테라로사 - 로스팅 체험과 원두 구매" />
                        <ScheduleItem text="플랜트 카페 - 식물과 함께하는 힐링 타임" />
                        <ScheduleItem text="성수동 베이커리 - 달콤한 디저트로 마무리" />
                    </View>
                </ScrollView>

                {/* 3. 하단 고정 버튼 */}
                <TouchableOpacity style={styles.fixedButton} onPress={() => navigation.navigate('Permission')}>
                    <Text style={styles.fixedButtonText}>추억 담아내기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// --- 4. 스타일시트 ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    // 헤더
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    backButton: {
        width: 24, // 아이콘 크기와 동일하게 설정하여 정렬 유지
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    // 스크롤 영역
    scrollArea: {
        flex: 1,
    },
    // 메인 배너
    mainBanner: {
        backgroundColor: '#333D4B',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
        marginTop: 16,
    },
    bannerTextLarge: {
        fontSize: 18,
        color: '#FFFFFF',
        marginTop: 12,
    },
    bannerTextSmall: {
        fontSize: 14,
        color: '#D0D0D0',
        marginTop: 4,
    },
    // 코스 정보
    courseInfoContainer: {
        marginTop: 24,
    },
    courseTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
    },
    courseSubtitle: {
        fontSize: 16,
        color: '#888888',
        marginTop: 8,
    },
    // 해시태그
    hashtagContainer: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 8,
    },
    tag: {
        backgroundColor: '#F0F0F0',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    tagText: {
        fontSize: 14,
        color: '#555555',
    },
    // 상세 일정
    scheduleBox: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 16,
        marginTop: 24,
        marginBottom: 24, // 스크롤 끝과 버튼 사이 여백
    },
    scheduleBoxTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    scheduleItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    scheduleItemText: {
        fontSize: 15,
        color: '#333333',
        marginLeft: 12,
    },
    mapPinEmoji: {
        fontSize: 16,
    },
    // 하단 고정 버튼
    fixedButton: {
        backgroundColor: '#1A2233',
        borderRadius: 12,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
    },
    fixedButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CourseDetailScreen;
