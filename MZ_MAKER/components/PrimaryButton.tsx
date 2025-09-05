import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean; // ?는 optional prop을 의미
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { width: '100%', backgroundColor: Colors.lightGray, padding: 20, borderRadius: 8, alignItems: 'center' },
  disabledButton: { backgroundColor: Colors.gray },
  text: { color: Colors.text, fontSize: 16, fontWeight: 'bold' },
  disabledText: { color: Colors.darkGray },
});

export default PrimaryButton;