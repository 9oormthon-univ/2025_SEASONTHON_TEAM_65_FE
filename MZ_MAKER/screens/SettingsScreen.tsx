import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;

type Props = {
  navigation: SettingsScreenNavigationProp;
};

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleLogout = () => {
    Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '확인', onPress: () => console.log('Logged out') },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert('계정 탈퇴', '정말로 계정을 탈퇴하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '확인', onPress: () => console.log('Account deleted'), style: 'destructive' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>프로필 관리</Text>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>프로필 수정</Text>
            <Feather name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림 설정</Text>
          <View style={styles.item}>
            <Text style={styles.itemText}>푸시 알림</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 정보</Text>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>서비스 이용약관</Text>
            <Feather name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>개인정보 처리방침</Text>
            <Feather name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <TouchableOpacity style={styles.item} onPress={handleLogout}>
            <Text style={styles.itemText}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={handleDeleteAccount}>
            <Text style={[styles.itemText, styles.deleteText]}>계정 탈퇴</Text>
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
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: 'white',
  },
  itemText: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
  },
});

export default SettingsScreen;