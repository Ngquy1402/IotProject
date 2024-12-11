import React, { useState } from 'react';
import { View, TextInput, Button, Alert, FlatList, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Student } from '../types/ExamTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  route: any;
  navigation: StackNavigationProp<RootStackParamList, 'AddStudentToExam'>;
};

const AddStudentToExam = ({ route, navigation }: Props) => {
  const { examid } = route.params;
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState('');
  const [mssv, setMssv] = useState('');
  const [lop, setLop] = useState('');

  const isMssvDuplicate = (mssv: string) => students.some(student => student.mssv === mssv);

  const handleAddStudentToList = () => {
    if (name && mssv && lop) {
      if (isMssvDuplicate(mssv)) {
        Alert.alert('Lỗi', `MSSV ${mssv} đã tồn tại trong danh sách.`);
        return;
      }
      const newStudent: Student = {
        id: String(new Date().getTime()),
        bai_thi_id: examid,
        name,
        mssv,
        lop,
        point: 0,
        created_at: new Date().toISOString(),
        answer: {}, 
        image: '',  
    };
      setStudents([...students, newStudent]);
      setName('');
      setMssv('');
      setLop('');
    } else {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin sinh viên.');
    }
  };

  const handleDeleteStudent = (id: string) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
  };

  const handleAddStudents = () => {
    const requestData = {
      request: students.map(student => ({
        bai_thi_id: student.bai_thi_id,
        name: student.name,
        mssv: student.mssv,
        lop: student.lop,
        point: student.point,
        created_at: student.created_at,
      })),
    };

    axios
      .post('http://52.43.134.34:8080/api/iot/sinhviens', requestData)
      .then(response => {
        Alert.alert('Thành công', 'Sinh viên đã được thêm vào bài thi!');
        navigation.goBack();
      })
      .catch(error => {
        console.error('Lỗi khi thêm sinh viên:', error.response || error.message);
        if (error.response && error.response.data && error.response.data.message) {
          Alert.alert('Lỗi server', error.response.data.message);
        } else {
          Alert.alert('Lỗi', 'Đã xảy ra lỗi khi thêm sinh viên.');
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Ionicons name="chevron-back" size={29} color="gray" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thêm Sinh Viên</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <TextInput
          placeholder="Tên sinh viên"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="MSSV"
          value={mssv}
          onChangeText={setMssv}
          style={styles.input}
        />
        <TextInput
          placeholder="Lớp"
          value={lop}
          onChangeText={setLop}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddStudentToList}>
          <Text style={styles.buttonText}>Thêm vào danh sách</Text>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
  data={students}
  renderItem={({ item }) => (
    <View style={styles.studentItem}>
      <View style={styles.studentTextContainer}>
        <Text style={styles.studentText}>{`Tên: ${item.name}`}</Text>
        <Text style={styles.studentText}>{`MSSV: ${item.mssv}`}</Text>
        <Text style={styles.studentText}>{`Lớp: ${item.lop}`}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteStudent(item.id)}
      >
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  )}
  keyExtractor={item => item.id}
  style={styles.list}
/>

      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleAddStudents}>
        <Text style={styles.buttonText}>Gửi danh sách sinh viên</Text>
      </TouchableOpacity>
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
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      position: 'relative',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
  },
  goBackButton: {
        position: 'absolute',
        left: 0,
        paddingLeft: 10,
        zIndex: 1,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
  formContainer: {
    paddingBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderColor: '#ddd', 
    borderRadius: 8,
    backgroundColor: '#f9f9f9', 
    fontSize: 16,
    color: '#333', 
  },
  button: {
    backgroundColor: '#2196f3', 
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
  },
  studentItem: {
    backgroundColor: '#e6f7ff', 
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#87cefa', 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    padding: 10,
  },
  studentTextContainer: {
    flex: 1, 
  },
  studentText: {
    fontSize: 16,
    color: '#4682b4', 
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 5,
    paddingHorizontal: 10, 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10, 
  },
  deleteButtonText: {
    color: '#ffffff', 
    fontWeight: 'bold',
    fontSize: 12, 
  },
});


export default AddStudentToExam;
