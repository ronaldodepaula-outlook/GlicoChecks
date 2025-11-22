import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RecordType } from '../types';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { StorageService } from '../services/storage';
import DateTimePickerSimple from '../components/DateTimePickerSimple';
import { DateUtils } from '../utils/dateUtils';

type HistoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'History'>;

interface Props {
  navigation: HistoryScreenNavigationProp;
}

const HistoryScreen: React.FC<Props> = ({ navigation }) => {
  const [records, setRecords] = useState<RecordType[]>([]);
  const [filtered, setFiltered] = useState<RecordType[]>([]);
  const [typeFilter, setTypeFilter] = useState<'all' | 'glicose' | 'insulina' | 'nota'>('all');
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    loadAll();
    const unsubscribe = navigation.addListener('focus', () => {
      loadAll();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    applyFilters();
  }, [records, typeFilter, startDate, endDate]);

  const loadAll = async () => {
    try {
      const all = await StorageService.getRecords();
      // order desc by date
      all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRecords(all);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar o histórico');
    }
  };

  const applyFilters = () => {
    const s = new Date(startDate.setHours(0,0,0,0));
    const e = new Date(endDate.setHours(23,59,59,999));
    const result = records.filter(r => {
      const d = new Date(r.date);
      if (d < s || d > e) return false;
      if (typeFilter !== 'all' && r.type !== typeFilter) return false;
      return true;
    });
    setFiltered(result);
  };

  const clearFilters = () => {
    setTypeFilter('all');
    setStartDate(new Date(new Date().setDate(new Date().getDate() - 30)));
    setEndDate(new Date());
  };

  const renderItem = ({ item }: { item: RecordType }) => {
    let title = '';
    if (item.type === 'glicose') title = `Glicose: ${(item as any).value} mg/dL`;
    if (item.type === 'insulina') title = `Insulina: ${(item as any).dosage} u (${(item as any).insulinType})`;
    if (item.type === 'nota') title = `Nota: ${(item as any).description}`;

    return (
      <View style={styles.card}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.type === 'glicose' && <MaterialIcons name="opacity" size={18} color="#2E86AB" />}
          {item.type === 'insulina' && <FontAwesome5 name="syringe" size={16} color="#A23B72" />}
          {item.type === 'nota' && <MaterialIcons name="note" size={18} color="#F18F01" />}
          <Text style={[styles.cardTitle, {marginLeft: 8}]}>{title}</Text>
        </View>
        <Text style={styles.cardSubtitle}>{DateUtils.formatDateTime(new Date(item.date))}</Text>
        {item.observations ? <Text style={styles.observations}>{item.observations}</Text> : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico</Text>
        <Text style={styles.headerSubtitle}>Filtre e navegue pelos registros</Text>
      </View>

      <View style={styles.filtersContainer}>
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Período</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
            <DateTimePickerSimple value={startDate} onChange={setStartDate} mode="date" label="Início" />
            <DateTimePickerSimple value={endDate} onChange={setEndDate} mode="date" label="Fim" />
          </View>
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Tipo</Text>
          <View style={styles.typeButtons}>
            {(['all','glicose','insulina','nota'] as const).map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.typeButton, typeFilter === t ? styles.typeButtonActive : null]}
                onPress={() => setTypeFilter(t)}
              >
                <Text style={typeFilter === t ? styles.typeButtonTextActive : styles.typeButtonText}>{t === 'all' ? 'Todos' : t === 'glicose' ? 'Glicose' : t === 'insulina' ? 'Insulina' : 'Notas'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterActions}>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum registro encontrado</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#fff', padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  headerSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  filtersContainer: { padding: 16, backgroundColor: '#fff', marginTop: 8 },
  filterRow: { marginBottom: 12 },
  filterLabel: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  typeButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  typeButton: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: '#f0f0f0', marginRight: 8, alignItems: 'center' },
  typeButtonActive: { backgroundColor: '#2E86AB' },
  typeButtonText: { color: '#333' },
  typeButtonTextActive: { color: '#fff', fontWeight: '600' },
  filterActions: { flexDirection: 'row', justifyContent: 'flex-end' },
  clearButton: { padding: 8 },
  clearButtonText: { color: '#A23B72' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  cardSubtitle: { fontSize: 12, color: '#666', marginTop: 6 },
  observations: { marginTop: 8, color: '#444' }
});

export default HistoryScreen;
