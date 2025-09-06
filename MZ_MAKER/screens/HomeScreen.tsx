import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    Image,
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

// --- 3. 하위 컴포넌트 ---

// 콘텐츠 카드 컴포넌트
const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    return (
        // CourseDetail 스크린으로 이동하며 item 전체를 파라미터로 전달
        <TouchableOpacity onPress={() => navigation.navigate('CourseDetail', { course: item })}>
            <View style={styles.cardContainer}>
                <Image source={{ uri: item.course_image_url }} style={styles.imagePlaceholder} />
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
    const [dateCourses, setDateCourses] = useState<DateCourse[]>([]);

    const getDateCourses = async () => {
        try {
            const response = await fetch('http://34.219.249.84:3000/ItDa/api/v1/courses');
            const data = await response.json();
            if (data.result) {
                setDateCourses(data.courses);
            } else {
                Alert.alert('Error', data.error.join('\n'));
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to fetch date courses from API');
        }
    };

    useEffect(() => {
        getDateCourses();
    }, []);

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
