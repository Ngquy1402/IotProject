import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { Student } from '../types/ExamTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'AddStudentToExam'>;

function AddStudentToExam({ navigation }: Props) {
    const [students, setStudents] = useState<Student[]>([]);
    const [studentId, setStudentId] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [className, setClassName] = useState<string>('');

    const handleAddStudent = () => {
        if (!studentId || !fullName || !className) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin học sinh!');
            return;
        }

        if (students.some((student) => student.mahs === studentId)) {
            Alert.alert('Lỗi', 'Mã học sinh đã tồn tại!');
            return;
        }

        const newStudent: Student = {
            mahs: studentId.trim(),
            fullName: fullName.trim(),
            class: className.trim(),
        };

        setStudents((prevStudents) => [...prevStudents, newStudent]);
        setStudentId('');
        setFullName('');
        setClassName('');
    };

    const handleSave = async () => {
        if (students.length === 0) {
            Alert.alert('Lỗi', 'Danh sách học sinh không được để trống!');
            return;
        }

        try {
            const response = await axios.post('https://6754416136bcd1eec850a420.mockapi.io/Student', {
                students,
            });
            console.log('Danh sách học sinh:', response.data);

            Alert.alert('Thành công', 'Danh sách học sinh đã được thêm vào bài thi!');
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu danh sách học sinh, vui lòng thử lại!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                    <Ionicons name="chevron-back" size={29} color="gray" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Thêm học sinh vào bài thi</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Mã học sinh"
                value={studentId}
                onChangeText={setStudentId}
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Họ và tên học sinh"
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Lớp"
                value={className}
                onChangeText={setClassName}
                placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddStudent} activeOpacity={0.8}>
                <Text style={styles.addButtonText}>Thêm học sinh</Text>
            </TouchableOpacity>
            <FlatList
                data={students}
                keyExtractor={(item) => item.mahs}
                renderItem={({ item }) => (
                    <View style={styles.studentItem}>
                        <Text style={styles.studentText}>
                            {item.mahs} - {item.fullName} - {item.class}
                        </Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyListText}>Danh sách trống</Text>}
            />
            <View style={styles.saveButtonWrapper}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
                    <Text style={styles.saveButtonText}>Lưu danh sách</Text>
                </TouchableOpacity>
            </View>
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
        zIndex: 1,
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
    addButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    studentItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    studentText: { fontSize: 16, color: '#333' },
    emptyListText: { textAlign: 'center', color: '#aaa', marginTop: 20 },
    saveButtonWrapper: {
        marginTop: 20,
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

export default AddStudentToExam;
