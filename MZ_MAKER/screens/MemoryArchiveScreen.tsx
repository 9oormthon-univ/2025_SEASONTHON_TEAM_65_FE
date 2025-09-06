import { Feather } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    RefreshControl
} from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';

type MemoryArchiveScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MemoryArchive'
>;

interface ApiResponse {
    result: boolean;
    error: string[];
    Memories: Memory[];
}

interface Memory {
    memoryId: number;
    courseId: number;
    imageUrl: string;
    created: string;
    updated: string;
}

type Props = {
    navigation: MemoryArchiveScreenNavigationProp;
};

const MemoryArchiveScreen: React.FC<Props> = ({ navigation }) => {
    const { user } = useAuth();
    const [memories, setMemories] = useState<Memory[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

    useEffect(() => {
        fetchMemories();
    }, []);

    const fetchMemories = async () => {
        try {
            // 하드코딩된 userId 사용
            const userId = 6;
            const response = await fetch(`http://34.219.249.84:3000/ItDa/api/v1/memories?userId=${userId}`);

            console.log('Fetching memories for userId:', userId);
            const data: ApiResponse = await response.json();
            console.log('Memories response:', data);

            if (response.ok) {
                if (data.result) {
                    setMemories(data.Memories || []);
                } else {
                    const errorMessage = data.error && data.error.length > 0
                        ? data.error.join('\n')
                        : '추억을 불러오는데 실패했습니다.';
                    Alert.alert('오류', errorMessage);
                }
            } else {
                Alert.alert('오류', `서버 오류: ${response.status}`);
            }
        } catch (error) {
            console.error('Fetch memories error:', error);
            Alert.alert('오류', '네트워크 오류가 발생했습니다.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchMemories();
    };

    const handleMemoryPress = (memory: Memory) => {
        navigation.navigate('Result', {
            memoryId: memory.memoryId,
            courseId: memory.courseId
        });
    };

    const handleImageError = (memoryId: number) => {
        setImageErrors(prev => ({
            ...prev,
            [memoryId]: true
        }));
    };

    // 이미지 URL 처리 함수
    const getImageUrl = (imageUrl: string) => {
        // 상대 경로인 경우 서버 URL 추가
        if (imageUrl.startsWith('/')) {
            return `http://34.219.249.84:3000${imageUrl}`;
        }
        return imageUrl;
    };

    const renderThumbnail = (item: Memory) => {
        if (imageErrors[item.memoryId] || !item.imageUrl) {
            return (
                <View style={[styles.thumbnail, styles.placeholderContainer]}>
                    <Feather name="image" size={32} color="#999" />
                </View>
            );
        }

        const imageUrl = getImageUrl(item.imageUrl);
        console.log('Loading image:', imageUrl);

        return (
            <Image
                source={{ uri: imageUrl }}
                style={styles.thumbnail}
                onError={() => {
                    console.log('Image load error for:', imageUrl);
                    handleImageError(item.memoryId);
                }}
            />
        );
    };

    const renderItem = ({ item }: { item: Memory }) => {
        // 날짜 형식 처리 (YYYY.MM.DD 형식)
        const formatDate = (dateString: string) => {
            if (dateString.includes('.')) {
                // 이미 YYYY.MM.DD 형식인 경우
                const [year, month, day] = dateString.split('.');
                return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
            } else {
                // ISO 형식인 경우
                return new Date(dateString).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
        };

        return (
            <TouchableOpacity
                onPress={() => handleMemoryPress(item)}
                style={styles.itemContainer}
            >
                {renderThumbnail(item)}
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}>추억 #{item.memoryId}</Text>
                    <Text style={styles.courseText}>코스 ID: {item.courseId}</Text>
                    <Text style={styles.itemDate}>
                        {formatDate(item.created)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Feather name="image" size={64} color="#CCC" />
            <Text style={styles.emptyText}>저장된 추억이 없습니다.</Text>
            <Text style={styles.emptySubText}>새로운 추억을 만들어보세요!</Text>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="chevron-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>추억 앨범</Text>
                    <View style={{ width: 24 }} />
                </View>
                <View style={styles.centeredContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>추억을 불러오는 중...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>추억 앨범</Text>
                <TouchableOpacity onPress={onRefresh}>
                    <Feather name="refresh-cw" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={memories}
                renderItem={renderItem}
                keyExtractor={(item) => `memory-${item.memoryId}`}
                ListEmptyComponent={renderEmptyComponent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#007AFF']}
                    />
                }
                contentContainerStyle={memories.length === 0 ? styles.emptyListContainer : undefined}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        backgroundColor: '#FFFFFF',
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
    },
    placeholderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
    },
    itemTextContainer: {
        marginLeft: 15,
        justifyContent: 'center',
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    courseText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    itemDate: {
        fontSize: 12,
        color: '#999',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingTop: 100,
    },
    emptyListContainer: {
        flex: 1,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginTop: 20,
        fontWeight: '600',
    },
    emptySubText: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
    },
});

export default MemoryArchiveScreen;