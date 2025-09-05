import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, DateCourse } from '../navigation/types'; // DateCourse import

// --- 1. 타입 정의 ---
type ContentCardProps = {
    item: DateCourse;
};

// RootStack의 네비게이션 prop 타입 정의
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CourseDetail'>;

// --- 2. 목업 데이터 ---
const dateCourses: DateCourse[] = [
    { id: '1', title: '홍대 플리마켓 & 맛집 탐방', subtitle: '젊음이 가득한 홍대에서의 특별한 하루' },
    { id: '2', title: '성수동 감성 카페 투어', subtitle: '힙한 성수동에서 즐기는 모녀 카페 투어' },
    { id: '3', title: '이태원 글로벌 푸드 투어', subtitle: '세계 각국의 맛을 함께 즐겨요' },
    { id: '4', title: '경복궁 한복 데이트', subtitle: '고궁의 아름다움을 배경으로 인생샷 남기기' },
];

// --- 3. 하위 컴포넌트 ---

// 콘텐츠 카드 컴포넌트
const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    return (
        // CourseDetail 스크린으로 이동하며 item 전체를 파라미터로 전달
        <TouchableOpacity onPress={() => navigation.navigate('CourseDetail', { course: item })}>
            <View style={styles.cardContainer}>
                <View style={styles.imagePlaceholder}>
                    <Feather name="image" size={40} color="#999" />
                </View>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// --- 4. 메인 홈 화면 컴포넌트 ---
const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.screenContainer}>
                {/* 헤더 */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>엄마도 요즘 것들 좋아한다</Text>
                    <Text style={styles.headerSubtitle}>우리만의 특별한 데이트 코스를 찾아보세요</Text>
                </View>

                {/* 콘텐츠 카드 리스트 */}
                <FlatList
                    data={dateCourses}
                    renderItem={({ item }) => <ContentCard item={item} />}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContentContainer}
                    ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

// --- 5. 스타일시트 ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    screenContainer: {
        flex: 1,
    },
    // 헤더
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#888888',
        marginTop: 4,
    },
    // 카드 리스트
    listContentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    // 콘텐츠 카드
    cardContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        overflow: 'hidden',
        // iOS 그림자
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Android 그림자
        elevation: 3,
    },
    imagePlaceholder: {
        height: 180,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTextContainer: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#555555',
        marginTop: 4,
    },
});

export default HomeScreen;