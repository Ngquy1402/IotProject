import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type Props = StackScreenProps<RootStackParamList, 'ExamDetail'>;

const students = [
  { id: 1, name: 'Nguyễn Văn A', studentId: 'S01' },
  { id: 2, name: 'Trần Thị B', studentId: 'S02' },
  { id: 3, name: 'Phạm Văn C', studentId: 'S03' },
];

const ExamDetail: React.FC<Props> = ({ route, navigation }) => {
  const { examId, examName } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: examName,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Text style={styles.goBackText}>{'< Back'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, examName]);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Mã bài thi: {examId}</Text>
      <Text style={styles.sectionTitle}>Danh sách học sinh:</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('StudentDetail', {
                  studentId: item.studentId,
                  studentName: item.name,
                  examId: examId,
                })
              }
            >
              <Card.Title title={item.name} subtitle={`Mã học sinh: ${item.studentId}`} />
            </TouchableOpacity>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
  },
  goBackButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  goBackText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default ExamDetail;
