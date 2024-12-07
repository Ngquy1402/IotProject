import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Student } from '../types/ExamTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'ExamDetail'>;

const students: Student[] = [
    { mahs: '1', fullName: 'Nguyễn Văn A', class: '5A' },
    { mahs: '2', fullName: 'Trần Thị B',  class: '5A' },
    { mahs: '3', fullName: 'Lê Văn C' , class: '5A' },
];

function ExamDetail({ route, navigation }: Props) {
    const { exam } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                    <Ionicons name='chevron-back' size={29} color="gray" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Chi tiết bài thi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddStudentToExam')}>
                <Icon name="addusergroup" size={29} color="#4DA6FF" />
                </TouchableOpacity>   
            </View>
            <Text style={styles.examName}>{exam.examName}</Text>
            <TouchableOpacity
                style={styles.addAnswerButton}
                onPress={() => navigation.navigate('AddAnswer', { examId: exam.id, examName: exam.examName, questionNumber: exam.questionNumber})}
                activeOpacity={0.8}
            >
                <Text style={styles.addAnswerText}>Thêm đáp án</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>Danh sách học sinh:</Text>
            <FlatList
                data={students}
                keyExtractor={(item) => item.mahs}
                renderItem={({ item }) => (
                    <View style={styles.studentCard}>
                        <TouchableOpacity onPress={() => navigation.navigate('StudentDetail')}
            activeOpacity={0.8}>
                        <Text style={styles.studentName}>{item.fullName}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    goBackButton: {
        position: 'absolute',
        left: 0,
        paddingLeft: 10,
        zIndex: 1
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    examName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    addAnswerButton: {
        backgroundColor: '#2196f3',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    addAnswerText: { 
      color: '#fff', 
      fontSize: 16, 
      fontWeight: '600' },
    subtitle: { 
      fontSize: 20, 
      fontWeight: '600', 
      color: '#444', 
      marginBottom: 10 },
    studentCard: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    studentName: { fontSize: 16, color: '#555' },
});

export default ExamDetail;
