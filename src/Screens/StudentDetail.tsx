import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = NativeStackScreenProps<RootStackParamList, 'StudentDetail'>;

const StudentDetail = ({ route, navigation }: Props) => {
    const { student } = route.params;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleSelectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response: any) => {
            if (response.didCancel) {
                console.log('Người dùng hủy chọn ảnh');
            } else if (response.errorMessage) {
                console.error('Lỗi khi mở thư viện ảnh:', response.errorMessage);
                Alert.alert('Lỗi', 'Không thể mở thư viện ảnh');
            } else if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                setSelectedImage(uri || null);
            }
        });
    };

    const handleUploadImage = async () => {
        if (!selectedImage) {
            Alert.alert('Thông báo', 'Vui lòng chọn ảnh trước khi tải lên.');
            return;
        }

        const formData = new FormData();
        formData.append('studentId', student.mssv);
        formData.append('image', {
            uri: selectedImage,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });

        try {
            const response = await axios.post('https://your-api-endpoint.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                Alert.alert('Thành công', 'Ảnh đã được tải lên.');
            } else {
                Alert.alert('Thất bại', 'Không thể tải ảnh lên.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải ảnh.');
        }
    };
    const renderAnswers = (answers: { [key: string]: boolean }) => {
        const questions: { [key: string]: string } = {
            cau1: 'Câu 1',
            cau2: 'Câu 2',
            cau3: 'Câu 3',
        };
        return Object.entries(answers).map(([key, value]) => (
            <View key={key} style={styles.answerRow}>
                <Text style={styles.answerKey}>{questions[key] || key}</Text>
                <Text style={[styles.answerValue, value ? styles.correct : styles.incorrect]}>
                    {value ? 'Đúng' : 'Sai'}
                </Text>
            </View>
        ));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                    <Ionicons name="chevron-back" size={30} color="gray" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Thông tin sinh viên</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>MSSV:</Text>
                    <Text style={styles.infoValue}>{student.mssv}</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>Tên:</Text>
                    <Text style={styles.infoValue}>{student.name}</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>Lớp:</Text>
                    <Text style={styles.infoValue}>{student.lop}</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoLabel}>Điểm:</Text>
                    <Text style={styles.infoValue}>{student.point ?? 'Chưa có điểm'}</Text>
                </View>

                {student.answer && (
                    <View style={styles.answerCard}>
                        <Text style={styles.resultTitle}>Câu trả lời:</Text>
                        {renderAnswers(student.answer)}
                    </View>
                )}

                {student.image && (
                    <View style={styles.imageCard}>
                        <Text style={styles.resultTitle}>Ảnh bài làm:</Text>
                        <Image source={{ uri: student.image }} style={styles.answerSheetImage} />
                    </View>
                )}

                {student.point == null && (
                    <>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                        )}
                        <TouchableOpacity style={styles.selectButton} onPress={handleSelectImage}>
                            <FontAwesome name="photo" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Chọn ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadImage}>
                            <FontAwesome name="upload" size={20} color="#fff" />
                            <Text style={styles.buttonText}>Upload ảnh</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        position: 'relative',
    },
    goBackButton: {
        position: 'absolute',
        left: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        marginTop: 20,
    },
    infoCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#e6f7ff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#87cefa',
    },
    infoLabel: {
        fontSize: 18,
        color: '#555',
        fontWeight: '600',
    },
    infoValue: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    answerCard: {
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    answerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    answerKey: {
        fontSize: 16,
        fontWeight: '600',
    },
    answerValue: {
        fontSize: 16,
    },
    correct: {
        color: 'green',
    },
    incorrect: {
        color: 'red',
    },
    imageCard: {
        marginTop: 20,
    },
    answerSheetImage: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginTop: 10,
    },
    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        marginLeft: 10,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginTop: 15,
    },
});

export default StudentDetail;
