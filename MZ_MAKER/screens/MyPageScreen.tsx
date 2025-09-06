
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type MyPageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyPage'
>;

type Props = {
  navigation: MyPageScreenNavigationProp;
};

const MyPageScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MZ 메이커</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Feather name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder for profile image
            style={styles.profileImage}
          />
          <Text style={styles.username}>리얼젠지</Text>
          <Text style={styles.joinDate}>2025.09.04 가입</Text>
        </View>
        <View style={styles.menuSection}>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>로그아웃/계정 탈퇴</Text>
            <Feather name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>개인정보 처리방침</Text>
            <Feather name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>버전정보 v1.0.0</Text>
          </View>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>고객센터</Text>
            <Feather name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  joinDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  menuSection: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuText: {
    fontSize: 16,
  },
});

export default MyPageScreen;
