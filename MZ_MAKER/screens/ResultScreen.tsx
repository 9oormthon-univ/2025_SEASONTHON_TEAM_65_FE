import { Feather } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { RootStackParamList } from '../navigation/types';

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

type Props = {
  navigation: ResultScreenNavigationProp;
  route: ResultScreenRouteProp;
};

const ResultScreen: React.FC<Props> = ({ route, navigation }) => {
  const { croppedImageUri, memoryId } = route.params;

  const [mothersQuote, setMothersQuote] = useState('');
  const [myFeeling, setMyFeeling] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(croppedImageUri || null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (memoryId) {
      setIsViewMode(true);
      fetchMemoryDetails(memoryId);
    }
  }, [memoryId]);

  const fetchMemoryDetails = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch('http://34.219.249.84:3000/ItDa/api/v1/memories/detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, memoryId: id }), // Hardcoded userId
      });
      if (response.ok) {
        const data = await response.json();
        setMothersQuote(data.mothersQuote);
        setMyFeeling(data.myFeeling);
        setImageUri(data.imageUrl);
      } else {
        Alert.alert('오류', '추억 상세 정보를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const requestBody = {
        courseId: 1, // Placeholder
        userId: 'temp_user_id', // Placeholder
        imageUrl: imageUri, // Placeholder, needs real upload
        mothersQuote: mothersQuote,
        activityDate: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        myFeeling: myFeeling,
    };

    try {
        const response = await fetch('http://34.219.249.84:3000/ItDa/api/v1/memories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        if (response.ok) {
            Alert.alert('성공', '추억이 성공적으로 저장되었습니다.', [
                { text: 'OK', onPress: () => navigation.popToTop() },
            ]);
        } else {
            const errorData = await response.json();
            Alert.alert('저장 실패', errorData.message || '서버에 저장 중 오류 발생');
        }
    } catch (error) {
        Alert.alert('오류', '네트워크 오류가 발생했습니다.');
    }
  };

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>엄마랑 꽁냥꽁냥 추억들</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content}>
        {imageUri && (
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUri }} style={styles.image} />
            </View>
        )}
        <View style={styles.messageContainer}>
          <Text style={styles.messageLabel}>이날 엄마가 한 말: 💬</Text>
          <TextInput
            style={styles.textInput}
            value={mothersQuote}
            onChangeText={setMothersQuote}
            placeholder="엄마가 하신 말씀을 기록해보세요"
            multiline
            editable={!isViewMode}
          />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageLabel}>내가 느낀 점: 💬</Text>
          <TextInput
            style={styles.textInput}
            value={myFeeling}
            onChangeText={setMyFeeling}
            placeholder="그날의 감정을 기록해보세요"
            multiline
            editable={!isViewMode}
          />
        </View>
      </ScrollView>
      {!isViewMode && (
        <View style={styles.footer}>
            <PrimaryButton title="저장하기" onPress={handleSave} disabled={!mothersQuote || !myFeeling} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, padding: 20 },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  image: { width: 200, height: 200, borderRadius: 10, backgroundColor: '#E0E0E0' },
  messageContainer: { marginBottom: 20 },
  messageLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  footer: { padding: 20, alignItems: 'center' },
});

export default ResultScreen;
