import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'AddAnswer'>;

export default function AddAnswer({ route, navigation }: Props) {
    const { examId, questionNumber, examName } = route.params;

    const [numQuestions, setNumQuestions] = useState<number>(questionNumber);  // Lưu số câu hỏi
    const [answers, setAnswers] = useState<string[]>([]);  // Mảng lưu đáp án

    // Cập nhật lại mảng đáp án khi số câu hỏi thay đổi
    useEffect(() => {
        setNumQuestions(questionNumber);  // Cập nhật số câu hỏi
        setAnswers(Array(questionNumber).fill(''));  // Cập nhật mảng đáp án với đúng số câu hỏi
    }, [questionNumber]);  // Mỗi khi questionNumber thay đổi, useEffect sẽ được gọi lại

    // Hàm xử lý khi người dùng thay đổi đáp án
    const handleAnswerChange = (text: string, index: number) => {
        const newAnswers = [...answers];
        newAnswers[index] = text;
        setAnswers(newAnswers);
    };

    // Hàm lưu đáp án
    const saveAnswers = () => {
        console.log(`Đáp án cho bài thi ${examId}:`, answers);
        navigation.goBack();  // Quay lại trang trước
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                    <Ionicons name='chevron-back' size={29} color="gray" />
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
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    goBackButton: {
        position: 'absolute',
        left: 0,
        paddingLeft: 10,
        zIndex: 1,
    },
    headerText: {
        fontSize: 24,
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
    inputLabel: { fontSize: 16, color: '#444', marginBottom: 5 },
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

