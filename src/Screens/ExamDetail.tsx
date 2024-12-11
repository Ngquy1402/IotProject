import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { ExamDetailData } from '../types/ExamTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'ExamDetail'>;

const ExamDetail = ({ route, navigation }: Props) => {
    const { examid, name } = route.params;
    const [examDetail, setExamDetail] = useState<ExamDetailData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchExamDetail = async () => {
        try {
            const response = await axios.get<ExamDetailData>(
                `http://52.43.134.34:8080/api/iot?id=${examid}`
            );
            setExamDetail(response.data);
        } catch (error: any) {
            console.error('Error fetching exam details:', error);
            Alert.alert(
                'Lỗi',
                error.response?.data?.message || 'Đã xảy ra lỗi khi tải thông tin bài thi.'
            );
        } finally {
            setLoading(false);
        }
    };

    const refreshExamDetail = () => {
        setLoading(true);
        fetchExamDetail(); 
    };

    useEffect(() => {
        fetchExamDetail();
    }, [examid]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', refreshExamDetail);
        return unsubscribe; 
    }, [navigation]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2196f3" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
                    <Ionicons name="chevron-back" size={30} color="gray" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Chi tiết bài thi</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddStudentToExam', { examid: examid })}
                    style={styles.headerIcon}
                >
                    <Icon name="addusergroup" size={30} color="#2196f3" />
                </TouchableOpacity>
            </View>

            {examDetail && (
                <>
                    <Text style={styles.examName}>{examDetail.name}</Text>
                    {/* {examDetail.description && (
                            <Text style={styles.description}>{examDetail.description}</Text>
                        )} */}
                    {examDetail.dapan.length > 0 ? (
                        <View style={styles.answerSection}>
                            <Text style={styles.subtitle}>Danh sách đáp án:</Text>
                            <FlatList
                                data={examDetail.dapan}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <Text style={styles.answerItem}>
                                        Câu {index + 1}: {item.dap_an}
                                    </Text>
                                )}
                            />
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.addAnswerButton}
                            onPress={() =>
                                navigation.navigate('AddAnswer', { examid: examDetail.id })
                            }
                            activeOpacity={0.8}
                        >
                            <Text style={styles.addAnswerText}>Thêm đáp án</Text>
                        </TouchableOpacity>
                    )}

                    {examDetail.sinhvien.length > 0 ? (
                        <>
                            <Text style={styles.subtitle}>Danh sách học sinh:</Text>
                            <FlatList
                                data={examDetail.sinhvien}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('StudentDetail', { student: item })}
                                    >
                                        <View style={styles.studentCard}>
                                            <Text style={styles.studentName}>{item.name}</Text>
                                            <Text style={styles.studentClass}>{item.lop}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </>
                    ) : (
                        <Text style={styles.noStudentsText}>
                            Chưa có học sinh nào được thêm.
                        </Text>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        marginBottom: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerIcon: {
        width: 40, 
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        flex: 1,
    },

    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 15,
        lineHeight: 22,
    },
    examName: {
        fontSize: 24, 
        fontWeight: 'bold',
        color: '#4682b4',
        textAlign: 'center',
        backgroundColor: '#e6f7ff',
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 15,
        overflow: 'hidden', 
    },
    addAnswerButton: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2196f3', 
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, 
        marginVertical: 20,
    },
    addAnswerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10, 
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
        marginBottom: 10,
    },
    studentCard: {
        backgroundColor: '#e6f7ff',
        padding: 15,
        borderRadius: 10, 
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#87cefa', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    studentName: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    studentClass: {
        fontSize: 15,
        color: '#777',
        marginBottom: 5,
    },
    studentPoint: {
        fontSize: 15,
        color: '#000',
        fontWeight: '500',
    },
    noStudentsText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginVertical: 20,
    },
    answerSection: {
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    answerItem: {
        fontSize: 16,
        color: '#333',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ExamDetail;
