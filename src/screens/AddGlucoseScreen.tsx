import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, MealType, GlucoseRecord } from '../types';
import { StorageService } from '../services/storage';
import { DateUtils } from '../utils/dateUtils';
import DateTimePickerSimple from '../components/DateTimePickerSimple';
import { MaterialIcons } from '@expo/vector-icons';

type AddGlucoseScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddGlucose'
>;

interface Props {
  navigation: AddGlucoseScreenNavigationProp;
}

const AddGlucoseScreen: React.FC<Props> = ({ navigation }) => {
  const [value, setValue] = useState<string>('');
  const [mealType, setMealType] = useState<MealType>('jejum');
  const [observations, setObservations] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());

  const mealTypes: { value: MealType; label: string }[] = [
    { value: 'jejum', label: 'Jejum' },
    { value: 'preRefeicao', label: 'Pré-Refeição' },
    { value: 'posRefeicao', label: 'Pós-Refeição' },
    { value: 'solucaoControle', label: 'Solução de Controle' },
  ];

  const handleSave = async (): Promise<void> => {
    if (!value.trim()) {
      Alert.alert('Erro', 'Por favor, informe o valor da glicose');
      return;
    }

    const glucoseValue = parseInt(value);
    if (isNaN(glucoseValue)) {
      Alert.alert('Erro', 'Por favor, informe um valor numérico válido');
      return;
    }

    if (glucoseValue < 20 || glucoseValue > 1000) {
      Alert.alert('Erro', 'Por favor, informe um valor entre 20 e 1000 mg/dL');
      return;
    }

    try {
      const record: GlucoseRecord = {
        id: Date.now().toString(),
        type: 'glicose',
        value: glucoseValue,
        mealType,
        date: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          time.getHours(),
          time.getMinutes(),
        ),
        observations: observations.trim() || undefined
      };

      await StorageService.saveRecord(record);
      Alert.alert('Sucesso', 'Registro de glicose salvo com sucesso!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o registro');
      console.error(error);
    }
  };

  const getStatusInfo = (value: string) => {
    if (!value) return null;
    
    const numValue = parseInt(value);
    if (isNaN(numValue)) return null;

    if (numValue < 70) return { text: 'Hipoglicemia', color: '#F44336' };
    if (numValue <= 99) return { text: 'Normal', color: '#4CAF50' };
    if (numValue <= 125) return { text: 'Pré-diabetes', color: '#FF9800' };
    return { text: 'Diabetes', color: '#F44336' };
  };

  const statusInfo = getStatusInfo(value);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <MaterialIcons name="opacity" size={22} color="#2E86AB" />
          <Text style={[styles.sectionTitle, {marginLeft: 8}]}>Registro de Glicose</Text>
        </View>

        {/* Valor da Glicose */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Valor da Glicose (mg/dL) *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 95"
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />
        </View>

        {/* Status */}
        {statusInfo && (
          <View style={[styles.statusContainer, { backgroundColor: statusInfo.color }]}>
            <Text style={styles.statusText}>{statusInfo.text}</Text>
          </View>
        )}

        {/* Tipo de Alimentação */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Alimentação *</Text>
          <View style={styles.radioGroup}>
            {mealTypes.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.radioButton}
                onPress={() => setMealType(item.value)}
              >
                <View style={styles.radioCircle}>
                  {mealType === item.value && <View style={styles.selectedRadio} />}
                </View>
                <Text style={styles.radioText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Data e Hora */}
        <DateTimePickerSimple
          value={date}
          onChange={(d) => setDate(d)}
          mode="date"
          label="Data"
        />

        <DateTimePickerSimple
          value={time}
          onChange={(d) => setTime(d)}
          mode="time"
          label="Hora"
        />

        {/* Observações */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Observações (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Alguma observação importante..."
            multiline
            numberOfLines={4}
            value={observations}
            onChangeText={setObservations}
          />
        </View>

        {/* Botões */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  statusContainer: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioGroup: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2E86AB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#2E86AB',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2E86AB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddGlucoseScreen;