import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type Props = StackScreenProps<RootStackParamList, 'StudentDetail'>;

const StudentDetail: React.FC<Props> = ({ route, navigation }) => {
  const { studentId, studentName, examId } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: studentName,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Text style={styles.goBackText}>{'< Back'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, studentName]);

  const handleGrade = () => {
    console.log(`Chấm điểm cho học sinh ${studentName} (${studentId}) trong kỳ thi ${examId}`);
    // TODO: Gọi API lấy ảnh bài làm từ database và xử lý.
  };

  const handleViewResult = () => {
    console.log(`Xem kết quả của học sinh ${studentName} (${studentId}) trong kỳ thi ${examId}`);
    // TODO: Gọi API lấy ảnh bài làm từ database và xử lý.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Mã học sinh: {studentId}</Text>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleGrade} style={styles.button}>
          Chấm điểm
        </Button>
        <Button mode="outlined" onPress={handleViewResult} style={styles.button}>
          Xem kết quả
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '40%',
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

export default StudentDetail;
