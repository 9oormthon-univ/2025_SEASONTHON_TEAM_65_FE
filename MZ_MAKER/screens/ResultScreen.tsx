
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

type Props = {
  navigation: ResultScreenNavigationProp;
  route: ResultScreenRouteProp;
};

const ResultScreen: React.FC<Props> = ({ route, navigation }) => {
  const { croppedImageUri } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>엄마랑 꽁냥꽁냥 추억들</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={{ uri: croppedImageUri }} style={styles.image} />
          <View style={styles.addButton}>
            <Feather name="plus" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <View style={styles.messageContainer}>
          <Text style={styles.messageLabel}>이날 엄마가 한 말: 💬</Text>
          <Text style={styles.messageText}>오랜만에 딸과 같으니 너무 좋으네~</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageLabel}>내가 느낀 점: 💬</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>말처리해 맞았다!</Text>
      </View>
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
  content: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 5,
  },
  messageContainer: {
    marginBottom: 20,
  },
  messageLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 16,
    marginTop: 5,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultScreen;
