import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'AddAnswer'>;

const AddAnswer = ({ route, navigation }: Props) => {
    const { examid } = route.params;
    const [numQuestions, setNumQuestions] = useState<number>(3);
    const [answers, setAnswers] = useState<string[]>(Array(3).fill(''));
    const handleAnswerChange = (text: string, index: number) => {
        const newAnswers = [...answers];
        newAnswers[index] = text;
        setAnswers(newAnswers);
    };
    const saveAnswers = async () => {
        try {
            for (let index = 0; index < answers.length; index++) {
                const payload = {
                    request: {
                        bai_thi_id: examid,
                        stt: index + 1,
                        answer: answers[index].trim(),
                    },
                };

                console.log(`Gửi câu ${index + 1}:`, JSON.stringify(payload, null, 2));

                const response = await axios.post('http://52.43.134.34:8080/api/iot/answer', payload, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.status === 200 || response.status === 201) {
                    console.log(`Câu ${index + 1} lưu thành công:`, response.data);
                } else {
                    console.error(`Lỗi khi lưu câu ${index + 1}:`, response.status);
                    Alert.alert('Lỗi', `Lỗi khi lưu câu ${index + 1}, mã lỗi: ${response.status}`);
                    return;
                }
            }

            Alert.alert('Thành công', 'Tất cả đáp án đã được lưu thành công!');
            navigation.goBack();
        } catch (error) {
            console.error('Error saving answers:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data);
            }
            Alert.alert('Lỗi', 'Không thể lưu đáp án. Vui lòng kiểm tra lại.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                    <Ionicons name='chevron-back' size={30} color="gray" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Thêm đáp án</Text>
            </View>
            <Text style={styles.subtitle}>Số câu hỏi: {numQuestions}</Text>
            <ScrollView style={styles.scrollView}>
                {answers.map((answer, index) => (
                    <View key={index} style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Câu {index + 1}:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={`Đáp án câu ${index + 1}`}
                            value={answer}
                            onChangeText={(text) => handleAnswerChange(text, index)}
                            placeholderTextColor="#aaa"
                        />
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={saveAnswers} activeOpacity={0.8}>
                <Text style={styles.saveButtonText}>Lưu đáp án</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    goBackButton: {
        position: 'absolute',
        left: 0,
        paddingLeft: 10,
        zIndex: 1,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    subtitle: { fontSize: 18, color: '#666', marginBottom: 15 },
    scrollView: { flex: 1, marginBottom: 20 },
    inputContainer: {
        marginBottom: 15,
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    inputLabel: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#2196f3',
        paddingVertical: 15,
        marginBottom: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default AddAnswer