
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

type ImageCropScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ImageCrop'
>;
type ImageCropScreenRouteProp = RouteProp<RootStackParamList, 'ImageCrop'>;

type Props = {
  navigation: ImageCropScreenNavigationProp;
  route: ImageCropScreenRouteProp;
};

const ImageCropScreen: React.FC<Props> = ({ route, navigation }) => {
  const { imageUri } = route.params;

  const handleCrop = () => {
    // Add cropping logic here
    navigation.navigate('Result', { croppedImageUri: imageUri }); // Placeholder
  };

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
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
        <View style={styles.cropBox}>
          <View style={[styles.handle, styles.topLeft]} />
          <View style={[styles.handle, styles.topRight]} />
          <View style={[styles.handle, styles.bottomLeft]} />
          <View style={[styles.handle, styles.bottomRight]} />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleCrop}>
          <Feather name="crop" size={32} color="black" />
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cropBox: {
    position: 'absolute',
    width: 352,
    height: 233,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  handle: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#007AFF',
  },
  topLeft: {
    top: -5,
    left: -5,
  },
  topRight: {
    top: -5,
    right: -5,
  },
  bottomLeft: {
    bottom: -5,
    left: -5,
  },
  bottomRight: {
    bottom: -5,
    right: -5,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
});

export default ImageCropScreen;
