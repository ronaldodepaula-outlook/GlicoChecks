import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Telas
import HomeScreen from './src/screens/HomeScreen';
import SelectMeasurementTypeScreen from './src/screens/SelectMeasurementTypeScreen';
import AddGlucoseScreen from './src/screens/AddGlucoseScreen';
import AddInsulinScreen from './src/screens/AddInsulinScreen';
import AddNoteScreen from './src/screens/AddNoteScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ChartsScreen from './src/screens/ChartsScreen';

// Tipos
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2E86AB',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'GlicoCheck' }}
        />
        <Stack.Screen 
          name="SelectMeasurementType" 
          component={SelectMeasurementTypeScreen}
          options={{ title: 'Nova Medição' }}
        />
        <Stack.Screen 
          name="AddGlucose" 
          component={AddGlucoseScreen}
          options={{ title: 'Registro de Glicose' }}
        />
        <Stack.Screen 
          name="AddInsulin" 
          component={AddInsulinScreen}
          options={{ title: 'Registro de Insulina' }}
        />
        <Stack.Screen 
          name="AddNote" 
          component={AddNoteScreen}
          options={{ title: 'Nova Nota' }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: 'Histórico' }}
        />
        <Stack.Screen
          name="Charts"
          component={ChartsScreen}
          options={{ title: 'Gráficos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;