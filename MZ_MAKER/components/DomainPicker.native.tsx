import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../constants/Colors';

const PICKER_DOMAINS = ['선택', 'gmail.com', 'naver.com', 'daum.net', 'hanmail.net', 'nate.com', '직접입력'];

interface DomainPickerProps {
    domain: string;
    onDomainChange: (domain: string) => void;
}

const DomainPicker: React.FC<DomainPickerProps> = ({ domain, onDomainChange }) => {
    return (
        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={domain}
                onValueChange={(itemValue) => onDomainChange(itemValue)}
                style={styles.picker}
            >
                {PICKER_DOMAINS.map((d) => (
                    <Picker.Item key={d} label={d} value={d} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 5,
        justifyContent: 'center',
    },
    picker: {},
});

export default DomainPicker;
