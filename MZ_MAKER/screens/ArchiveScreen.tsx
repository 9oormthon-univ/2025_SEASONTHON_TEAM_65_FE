import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

const ArchiveScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archive Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ArchiveScreen;