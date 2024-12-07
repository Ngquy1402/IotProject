import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Exam } from '../types/ExamTypes';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'ExamList'>;

function ExamList({ navigation }: Props) {
  const [exams, setExams] = useState<Exam[]>([]);

  const getApi = () => {
  const mockData = [
    { id: "1", examName: "Toán Học 12", description: "Bài kiểm tra học kỳ 1" , questionNumber: 6},
    { id: "2", examName: "Vật Lý 10", description: "Bài kiểm tra giữa kỳ 2" , questionNumber: 8},
    { id: "3", examName: "Hóa Học 11", description: "Bài kiểm tra cuối kỳ", questionNumber: 5},
    { id: "4", examName: "Ngữ Văn 12", description: "Bài kiểm tra tổng kết" , questionNumber: 10 },
  ];
  setExams(mockData);
};

  // const getApi = () => {
  //   fetch('https://6754347636bcd1eec8508401.mockapi.io/Examlist')
  //     .then((response) => response.json())
  //     .then((data) => setExams(data))
  //     .catch((error) => console.error(error));
  // };

  // Gọi getApi mỗi khi trang nhận được focus
  useFocusEffect(
    React.useCallback(() => {
      getApi();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Danh sách bài thi</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('AddExam')}>
            <Icon name="edit" size={29} color="#4DA6FF" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={exams}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.examCard}
            onPress={() => navigation.navigate('ExamDetail', { exam: item })}
            activeOpacity={0.8}
          >
            <Text style={styles.examName}>{item.examName}</Text>
            <Text style={styles.examDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  examCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  examName: { fontSize: 18, color: '#444', fontWeight: '600', marginBottom: 5 },
  examDescription: { fontSize: 14, color: '#666' },
});

export default ExamList;
