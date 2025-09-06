import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../constants/Colors';

const DOMAINS = ['gmail.com', 'naver.com', 'daum.net', 'hanmail.net', 'nate.com', '직접입력'];

interface DomainPickerProps {
    domain: string;
    onDomainChange: (domain: string) => void;
}

const DomainPicker: React.FC<DomainPickerProps> = ({ domain, onDomainChange }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const handleDomainSelect = (selectedDomain: string) => {
        onDomainChange(selectedDomain);
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity style={styles.domainSelector} onPress={() => setModalVisible(true)}>
                <Text style={styles.domainText}>{domain}</Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            {DOMAINS.map((d) => (
                                <TouchableOpacity key={d} style={styles.domainOption} onPress={() => handleDomainSelect(d)}>
                                    <Text style={styles.domainOptionText}>{d}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    domainSelector: { flex: 1, borderWidth: 1, borderColor: Colors.gray, padding: 15, borderRadius: 5, justifyContent: 'center' },
    domainText: { fontSize: 16 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { 
        backgroundColor: Colors.white, 
        borderRadius: 10, 
        padding: 20, 
        width: '80%', 
        maxHeight: '60%'
    },
    domainOption: { paddingVertical: 15 },
    domainOptionText: { fontSize: 18, textAlign: 'center' },
});

export default DomainPicker;
