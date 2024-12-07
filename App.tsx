import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExamList from './src/Screens/ExamList';
import ExamDetail from './src/Screens/ExamDetail';
import AddAnswer from './src/Screens/AddAnswer';
import AddExam from './src/Screens/AddExam';
import StudenDetail from './src/Screens/StudentDetail';
import AddStudentToExam from './src/Screens/AddStudentToExam';
import { Exam } from './src/types/ExamTypes';

export type RootStackParamList = {
    ExamList: undefined;
    ExamDetail: { exam: Exam };
    AddAnswer: { examId: string, examName: string,  questionNumber: number};
    AddExam: undefined;
    StudentDetail: undefined;
    AddStudentToExam: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ExamList" component={ExamList} options={{ title: 'Danh sách bài thi', headerShown: false } } />
                <Stack.Screen name="ExamDetail" component={ExamDetail} options={{ title: 'Chi tiết bài thi', headerShown: false  }} />
                <Stack.Screen name="AddAnswer" component={AddAnswer} options={{ title: 'Thêm đáp án', headerShown: false  }} />
                <Stack.Screen name="AddExam" component={AddExam} options={{ title: 'Thêm bài thi', headerShown: false  }} />
                <Stack.Screen name="StudentDetail" component={StudenDetail} options={{ title: 'Thêm bài thi', headerShown: false  }} />
                <Stack.Screen name="AddStudentToExam" component={AddStudentToExam} options={{ title: 'Thêm học sinh vào bài thi', headerShown: false  }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
