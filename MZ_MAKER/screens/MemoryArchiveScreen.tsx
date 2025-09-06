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
    View
} from 'react-native';
import { RootStackParamList } from '../navigation/types';

type MemoryArchiveScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MemoryArchive'
>;

// Define the type for a single memory item from the API response
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
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      // Using a hardcoded userId as placeholder
      const userId = 1;
      const response = await fetch('http://34.219.249.84:3000/ItDa/api/v1/memories/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setMemories(data.Memories || []);
      } else {
        Alert.alert('오류', '추억을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Memory }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Result', { memoryId: item.memoryId })}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{`추억 ID: ${item.memoryId}`}</Text>
          <Text style={styles.itemDate}>{`생성일: ${new Date(item.created).toLocaleDateString()}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>엄마랑 꽁냥꽁냥 추억들</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList
        data={memories}
        renderItem={renderItem}
        keyExtractor={(item) => item.memoryId.toString()}
        ListEmptyComponent={() => (
          <View style={styles.centeredContainer}>
            <Text>저장된 추억이 없습니다.</Text>
          </View>
        )}
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  itemTextContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});

export default MemoryArchiveScreen;