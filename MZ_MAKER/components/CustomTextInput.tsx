import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Colors } from '../constants/Colors';

// 컴포넌트가 받을 props 타입을 정의합니다.
interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  style?: ViewStyle; // 외부에서 컨테이너 스타일을 받을 수 있도록 추가
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ placeholder, style, ...props }) => {
  return (
    // 외부에서 받은 style을 container 스타일에 병합합니다.
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.darkGray}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.gray, marginBottom: 20 },
  input: { paddingVertical: 15, fontSize: 16, color: Colors.text },
});

export default CustomTextInput;
