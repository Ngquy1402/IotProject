import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type ExamListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ExamList'>;

type Props = {
  navigation: ExamListScreenNavigationProp;
};

const exams = [
  { id: 1, name: 'Bài thi Toán', description: 'Kiểm tra kiến thức môn Toán' },
  { id: 2, name: 'Bài thi Lý', description: 'Kiểm tra kiến thức môn Vật lý' },
  { id: 3, name: 'Bài thi Hóa', description: 'Kiểm tra kiến thức môn Hóa học' },
];

const ExamList: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={exams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => navigation.navigate('ExamDetail', { examId: item.id, examName: item.name })}
          >
            <Card.Title title={item.name} subtitle={item.description} />
            <Card.Actions>
              <Button onPress={() => navigation.navigate('ExamDetail', { examId: item.id, examName: item.name })}>
                Chi tiết
              </Button>
            </Card.Actions>
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
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
});

export default ExamList;
