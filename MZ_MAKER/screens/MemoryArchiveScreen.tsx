
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type MemoryArchiveScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MemoryArchive'
>;

type Props = {
  navigation: MemoryArchiveScreenNavigationProp;
};

const MemoryArchiveScreen: React.FC<Props> = ({ navigation }) => {
  const memories = [
    {
      id: '1',
      image: 'https://via.placeholder.com/100',
      text: '엄네일 사진',
      date: '2025년 9월 4일',
    },
    // Add more memory items here
  ];

  const renderItem = ({ item }: { item: typeof memories[0] }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>{item.text}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>엄마랑 꽁냥꽁냥 추억들</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList
        data={memories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text>추억이 없습니다.</Text>
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
  },
  itemDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default MemoryArchiveScreen;
