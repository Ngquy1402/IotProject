import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

type Props = NativeStackScreenProps<RootStackParamList, 'AddExam'>;

const AddExam = ({ navigation }: Props) => {
  const [name, setExamName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSave = async () => {
    if (!name || !description) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const formData = { name, description };

    try {
      await axios.post('http://52.43.134.34:8080/api/iot', formData);
      Alert.alert('Thành công', 'Bài thi đã được thêm thành công!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Ionicons name="chevron-back" size={30} color="gray" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thêm bài thi</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Tên bài thi"
        value={name}
        onChangeText={setExamName}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả bài thi"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#aaa"
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
        <Text style={styles.saveButtonText}>Lưu bài thi</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    zIndex: 1
  },
  headerText: {
    fontSize: 30,
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
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
});

export default AddExam;
