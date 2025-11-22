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
import { RootStackParamList, NoteType, NoteRecord } from '../types';
import { StorageService } from '../services/storage';
import DateTimePickerSimple from '../components/DateTimePickerSimple';
import { MaterialIcons } from '@expo/vector-icons';

type AddNoteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddNote'
>;

interface Props {
  navigation: AddNoteScreenNavigationProp;
}

const AddNoteScreen: React.FC<Props> = ({ navigation }) => {
  const [noteType, setNoteType] = useState<NoteType>('exercicio');
  const [description, setDescription] = useState<string>('');
  const [observations, setObservations] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());

  const noteTypes: { value: NoteType; label: string }[] = [
    { value: 'exercicio', label: 'Exercício' },
    { value: 'refeicao', label: 'Refeição' },
    { value: 'outros', label: 'Outros' },
  ];

  const handleSave = async (): Promise<void> => {
    if (!description.trim()) {
      Alert.alert('Erro', 'Por favor, informe uma descrição');
      return;
    }

    try {
      const record: NoteRecord = {
        id: Date.now().toString(),
        type: 'nota',
        noteType,
        description: description.trim(),
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
      Alert.alert('Sucesso', 'Nota salva com sucesso!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a nota');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <MaterialIcons name="note" size={20} color="#F18F01" />
          <Text style={[styles.sectionTitle, {marginLeft: 8}]}>Nova Nota</Text>
        </View>

        {/* Tipo de Nota */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tipo de Nota *</Text>
          <View style={styles.radioGroup}>
            {noteTypes.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.radioButton}
                onPress={() => setNoteType(item.value)}
              >
                <View style={styles.radioCircle}>
                  {noteType === item.value && <View style={styles.selectedRadio} />}
                </View>
                <Text style={styles.radioText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Descrição Breve */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição Breve *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva brevemente..."
            multiline
            numberOfLines={3}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Observações */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Observações (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Observações adicionais..."
            multiline
            numberOfLines={4}
            value={observations}
            onChangeText={setObservations}
          />
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
    borderColor: '#F18F01',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#F18F01',
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
    backgroundColor: '#F18F01',
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

export default AddNoteScreen;