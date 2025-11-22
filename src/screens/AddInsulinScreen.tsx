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
import { RootStackParamList, MealType, InsulinType, InsulinPoint, InsulinRecord } from '../types';
import { StorageService } from '../services/storage';
import DateTimePickerSimple from '../components/DateTimePickerSimple';
import { FontAwesome5 } from '@expo/vector-icons';

type AddInsulinScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddInsulin'
>;

interface Props {
  navigation: AddInsulinScreenNavigationProp;
}

const AddInsulinScreen: React.FC<Props> = ({ navigation }) => {
  const [dosage, setDosage] = useState<string>('');
  const [insulinType, setInsulinType] = useState<InsulinType>('rapida');
  const [insulinPoint, setInsulinPoint] = useState<InsulinPoint>('asparte');
  const [mealType, setMealType] = useState<MealType>('jejum');
  const [observations, setObservations] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());

  const insulinTypes: { value: InsulinType; label: string }[] = [
    { value: 'ultrarrapida', label: 'Ultrarrápida' },
    { value: 'rapida', label: 'Rápida' },
    { value: 'acaoIntermediaria', label: 'Ação Intermediária' },
    { value: 'longaDuracao', label: 'Longa Duração' },
    { value: 'preMisturadaRegular', label: 'Pré-misturada Regular' },
    { value: 'preMisturadaAnaloga', label: 'Pré-misturada Análoga' },
    { value: 'inserirManual', label: 'Inserir Manualmente' },
  ];

  const insulinPoints: { value: InsulinPoint; label: string }[] = [
    { value: 'glulisina', label: 'Apidra (Glulisina)' },
    { value: 'lispro', label: 'Humalog (Lispro)' },
    { value: 'asparte', label: 'NovoRapid (Asparte)' },
  ];

  const mealTypes: { value: MealType; label: string }[] = [
    { value: 'jejum', label: 'Jejum' },
    { value: 'preRefeicao', label: 'Pré-Refeição' },
    { value: 'posRefeicao', label: 'Pós-Refeição' },
    { value: 'solucaoControle', label: 'Solução de Controle' },
  ];

  const handleSave = async (): Promise<void> => {
    if (!dosage.trim()) {
      Alert.alert('Erro', 'Por favor, informe a dosagem');
      return;
    }

    const dosageValue = parseFloat(dosage);
    if (isNaN(dosageValue)) {
      Alert.alert('Erro', 'Por favor, informe uma dosagem válida');
      return;
    }

    if (dosageValue <= 0) {
      Alert.alert('Erro', 'A dosagem deve ser maior que zero');
      return;
    }

    try {
      const record: InsulinRecord = {
        id: Date.now().toString(),
        type: 'insulina',
        dosage: dosageValue,
        insulinType,
        insulinPoint,
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
      Alert.alert('Sucesso', 'Registro de insulina salvo com sucesso!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o registro');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <FontAwesome5 name="syringe" size={20} color="#A23B72" />
          <Text style={[styles.sectionTitle, {marginLeft: 8}]}>Registro de Insulina</Text>
        </View>

        {/* Dosagem */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dosagem (unidades) *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 10"
            keyboardType="decimal-pad"
            value={dosage}
            onChangeText={setDosage}
          />
        </View>

        {/* Tipo de Insulina */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tipo de Insulina *</Text>
          <View style={styles.radioGroup}>
            {insulinTypes.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.radioButton}
                onPress={() => setInsulinType(item.value)}
              >
                <View style={styles.radioCircle}>
                  {insulinType === item.value && <View style={styles.selectedRadio} />}
                </View>
                <Text style={styles.radioText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Ponto de Insulina */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ponto de Insulina *</Text>
          <View style={styles.radioGroup}>
            {insulinPoints.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.radioButton}
                onPress={() => setInsulinPoint(item.value)}
              >
                <View style={styles.radioCircle}>
                  {insulinPoint === item.value && <View style={styles.selectedRadio} />}
                </View>
                <Text style={styles.radioText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Alimentação */}
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
    borderColor: '#A23B72',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#A23B72',
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
    backgroundColor: '#A23B72',
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

export default AddInsulinScreen;