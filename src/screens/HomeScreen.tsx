import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, RecordType, GlucoseRecord } from '../types';
import { StorageService } from '../services/storage';
import { DateUtils } from '../utils/dateUtils';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [lastGlucose, setLastGlucose] = useState<GlucoseRecord | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    loadData();
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    try {
      const allRecords = await StorageService.getRecords();
      setTotalRecords(allRecords.length);

      const glucoseRecords = allRecords
        .filter(record => record.type === 'glicose')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as GlucoseRecord[];

      if (glucoseRecords.length > 0) {
        setLastGlucose(glucoseRecords[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const getStatusInfo = (value: number) => {
    if (value < 70) return { text: 'Hipoglicemia', color: '#F44336' };
    if (value <= 99) return { text: 'Normal', color: '#4CAF50' };
    if (value <= 125) return { text: 'Pré-diabetes', color: '#FF9800' };
    return { text: 'Diabetes', color: '#F44336' };
  };

  const statusInfo = lastGlucose ? getStatusInfo(lastGlucose.value) : null;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GlicoCheck</Text>
        <Text style={styles.headerSubtitle}>Controle sua glicemia</Text>
      </View>

      {/* Quick Access Menu */}
      <View style={styles.quickMenuContainer}>
        <TouchableOpacity style={[styles.quickButton, { backgroundColor: '#2E86AB' }]} onPress={() => navigation.navigate('AddGlucose')}>
          <MaterialIcons name="opacity" size={20} color="#fff" />
          <Text style={styles.quickButtonText}>Glicose</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.quickButton, { backgroundColor: '#A23B72' }]} onPress={() => navigation.navigate('AddInsulin')}>
          <FontAwesome5 name="syringe" size={18} color="#fff" />
          <Text style={styles.quickButtonText}>Insulina</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.quickButton, { backgroundColor: '#F18F01' }]} onPress={() => navigation.navigate('AddNote')}>
          <MaterialIcons name="note" size={20} color="#fff" />
          <Text style={styles.quickButtonText}>Notas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.quickButton, { backgroundColor: '#6B8E23' }]} onPress={() => navigation.navigate('History')}>
          <MaterialIcons name="history" size={20} color="#fff" />
          <Text style={styles.quickButtonText}>Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.quickButton, { backgroundColor: '#5F4BB6' }]} onPress={() => navigation.navigate('Charts')}>
          <MaterialIcons name="show-chart" size={20} color="#fff" />
          <Text style={styles.quickButtonText}>Gráficos</Text>
        </TouchableOpacity>
      </View>

      {/* Última Medição */}
      {lastGlucose && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Última Medição</Text>
          <View style={styles.measurementContainer}>
            <Text style={styles.measurementValue}>{lastGlucose.value}</Text>
            <Text style={styles.measurementUnit}>mg/dL</Text>
          </View>
          {statusInfo && (
            <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
              <Text style={styles.statusText}>{statusInfo.text}</Text>
            </View>
          )}
          <Text style={styles.measurementDate}>
            {DateUtils.formatDateTime(lastGlucose.date)}
          </Text>
        </View>
      )}

      {/* Estatísticas Rápidas */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Estatísticas</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalRecords}</Text>
            <Text style={styles.statLabel}>Total de Registros</Text>
          </View>
        </View>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('SelectMeasurementType')}
        >
          <Text style={styles.actionButtonText}>+ Nova Medição</Text>
        </TouchableOpacity>
      </View>

      {/* Dicas */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dicas do Dia</Text>
        <Text style={styles.tip}>• Meça sua glicemia em jejum pela manhã</Text>
        <Text style={styles.tip}>• Mantenha-se hidratado</Text>
        <Text style={styles.tip}>• Pratique atividades físicas regularmente</Text>
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
    backgroundColor: '#2E86AB',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  measurementContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 10,
  },
  measurementValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginRight: 5,
  },
  measurementUnit: {
    fontSize: 18,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  measurementDate: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E86AB',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  actionsContainer: {
    padding: 16,
  },
  actionButton: {
    backgroundColor: '#2E86AB',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tip: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  quickMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  quickButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default HomeScreen;