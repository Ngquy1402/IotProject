import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'ExamList'>;

const ExamList = ({ navigation }: Props) => {
  const examid = 'dynamic-exam-id'
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const API_URL = 'http://52.43.134.34:8080/api/iot/list';

  const fetchExams = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setExams(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách bài thi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExams();
    const unsubscribe = navigation.addListener('focus', fetchExams);
    return unsubscribe;
  }, [fetchExams, navigation]);

  const handleAddExam = () => {
    navigation.navigate('AddExam');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4DA6FF" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (exams.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>Không có bài thi nào để hiển thị.</Text>
        <TouchableOpacity style={styles.addExamButton} onPress={handleAddExam}>
          <Text style={styles.addExamButtonText}>Thêm bài thi mới</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Danh sách bài thi</Text>
        <TouchableOpacity style={styles.headericon} onPress={handleAddExam}>
          <Icon name="edit" size={30} color="#2196f3" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={exams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.examCard}
            onPress={() => navigation.navigate('ExamDetail', { examid: item.id, name: item.name })}
            activeOpacity={0.8}
          >
            <Text style={styles.examName}>{item.name}</Text>
            <Text style={styles.examDescription}>{item.description || 'Không có mô tả.'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  header:
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  headerText:
  {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },

  headericon:
  {
    position: 'absolute',
    right: 10,
  },

  loadingContainer:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText:
  {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  },
  noDataText:
  {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 20
  },
  addExamButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#2196f3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addExamButtonText:
  {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  examCard:
  {
    backgroundColor: '#e6f7ff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: '#87cefa', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  examName:
  {
    fontSize: 20,
        fontWeight: 'bold',
        color: '#4682b4',
        marginBottom: 5,
  },
  examDescription:
  {
    fontSize: 15,
        color: '#777',
        marginBottom: 5,
  },
});

export default ExamList;
