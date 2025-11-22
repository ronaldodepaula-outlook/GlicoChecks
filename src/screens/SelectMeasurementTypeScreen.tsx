import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

type SelectMeasurementTypeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SelectMeasurementType'
>;

interface Props {
  navigation: SelectMeasurementTypeScreenNavigationProp;
}

const SelectMeasurementTypeScreen: React.FC<Props> = ({ navigation }) => {
  const measurementTypes = [
    {
      type: 'glicose' as const,
      title: 'Glicose',
      color: '#2E86AB',
      description: 'Registrar nível de glicose no sangue'
    },
    {
      type: 'insulina' as const,
      title: 'Insulina',
      color: '#A23B72',
      description: 'Registrar aplicação de insulina'
    },
    {
      type: 'nota' as const,
      title: 'Notas',
      color: '#F18F01',
      description: 'Registrar observações importantes'
    }
  ];

  const handleSelectType = (type: 'glicose' | 'insulina' | 'nota') => {
    switch (type) {
      case 'glicose':
        navigation.navigate('AddGlucose');
        break;
      case 'insulina':
        navigation.navigate('AddInsulin');
        break;
      case 'nota':
        navigation.navigate('AddNote');
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nova Medição</Text>
        <Text style={styles.headerSubtitle}>Selecione o tipo de registro</Text>
      </View>

      <View style={styles.optionsContainer}>
        {measurementTypes.map((item) => (
          <TouchableOpacity
            key={item.type}
            style={[styles.optionCard, { borderLeftColor: item.color }]}
            onPress={() => handleSelectType(item.type)}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionHeader}>
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}> 
                  {item.type === 'glicose' && <MaterialIcons name="opacity" size={18} color="#fff" />}
                  {item.type === 'insulina' && <FontAwesome5 name="syringe" size={16} color="#fff" />}
                  {item.type === 'nota' && <MaterialIcons name="note" size={18} color="#fff" />}
                </View>
                <Text style={styles.optionTitle}>{item.title}</Text>
              </View>
              <Text style={styles.optionDescription}>{item.description}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  optionsContainer: {
    padding: 16,
  },
  optionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 16,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionContent: {
    flex: 1,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  arrow: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
});

export default SelectMeasurementTypeScreen;