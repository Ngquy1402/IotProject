import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'AddExam'>;

function AddExam({ navigation }: Props) {
    const [examName, setExamName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [numQuestions, setNumQuestions] = useState<string>('');  // Giữ numQuestions là string ban đầu

    const handleSave = async () => {
        // Kiểm tra dữ liệu trước khi gửi
        if (!examName || !description || !numQuestions) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Chuyển numQuestions thành số để lưu vào cơ sở dữ liệu
        const questionNumber = Number(numQuestions);

        if (isNaN(questionNumber) || questionNumber <= 0) {
            Alert.alert('Lỗi', 'Số câu hỏi phải là số lớn hơn 0!');
            return;
        }

        // Tạo đối tượng formData với questionNumber là số
        const formData = {
            examName: examName,
            description: description,
            questionNumber: questionNumber,  // Lưu kiểu number
        };

        try {
            // Gửi yêu cầu API
            const response = await axios.post('https://6754347636bcd1eec8508401.mockapi.io/Examlist', formData);
            console.log('Bài thi mới:', response.data);
            
            // Thông báo thành công và quay lại trang trước
            Alert.alert('Thành công', 'Bài thi đã được thêm thành công!');
            navigation.goBack();
        } catch (error) {
            console.log(error);
            Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                    <Ionicons name="chevron-back" size={29} color="gray" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Thêm bài thi</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Tên bài thi"
                value={examName}
                onChangeText={setExamName}
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Mô tả bài thi"
                value={description}
                onChangeText={setDescription}
                placeholderTextColor="#aaa"
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Số câu hỏi"
                value={numQuestions}  // Sử dụng numQuestions là chuỗi ở đây
                onChangeText={setNumQuestions}  // Lưu dưới dạng chuỗi
                placeholderTextColor="#aaa"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
                <Text style={styles.saveButtonText}>Lưu bài thi</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        position: 'relative',
    },
    goBackButton: {
        position: 'absolute',
        left: 0,
        paddingLeft: 10,
        zIndex: 1
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
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

export default AddExam;
