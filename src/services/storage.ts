import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecordType } from '../types';

const STORAGE_KEY = 'glicocheck_records';

export const StorageService = {
  // Salvar registro
  async saveRecord(record: RecordType): Promise<void> {
    try {
      const existingRecords = await this.getRecords();
      const updatedRecords = [...existingRecords, record];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    } catch (error) {
      console.error('Erro ao salvar registro:', error);
      throw error;
    }
  },

  // Obter todos os registros
  async getRecords(): Promise<RecordType[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const records = JSON.parse(data);
      // Converter strings de data para objetos Date
      return records.map((record: any) => ({
        ...record,
        date: new Date(record.date)
      }));
    } catch (error) {
      console.error('Erro ao obter registros:', error);
      return [];
    }
  },

  // Obter registros por tipo
  async getRecordsByType(type: 'glicose' | 'insulina' | 'nota'): Promise<RecordType[]> {
    const records = await this.getRecords();
    return records.filter(record => record.type === type);
  },

  // Limpar todos os registros (para desenvolvimento)
  async clearRecords(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar registros:', error);
      throw error;
    }
  }
};