import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import ExamList from './src/Screens/ExamList';
import ExamDetail from './src/Screens/ExamDetail';
import StudentDetail from './src/Screens/StudentDetail';

export type RootStackParamList = {
  ExamList: undefined;
  ExamDetail: { examId: number; examName: string };
  StudentDetail: { studentId: string; studentName: string; examId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50',
    accent: '#FFC107',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ExamList"
          screenOptions={{
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name="ExamList" component={ExamList} options={{ title: 'Danh sách bài thi' }} />
          <Stack.Screen name="ExamDetail" component={ExamDetail} />
          <Stack.Screen name="StudentDetail" component={StudentDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};


export default App;
