import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { StorageService } from '../services/storage';
import { DateUtils } from '../utils/dateUtils';

type ChartsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Charts'>;

interface Props {
  navigation: ChartsScreenNavigationProp;
}

const screenWidth = Dimensions.get('window').width - 32;

const ChartsScreen: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const all = await StorageService.getRecordsByType('glicose');
      // sort by date asc
      all.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      // take last 20 entries
      const last = all.slice(-20);
      const vals = last.map(r => (r as any).value as number);
      const labs = last.map(r => DateUtils.formatDate(new Date(r.date)));
      setValues(vals);
      setLabels(labs);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os dados para o gráfico');
    } finally {
      setLoading(false);
    }
  };

  // try to load react-native-chart-kit dynamically; if unavailable, show message
  let ChartLib: any = null;
  try {
    // require at runtime so project doesn't crash if not installed
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ChartLib = require('react-native-chart-kit');
  } catch (e) {
    ChartLib = null;
  }

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  if (!ChartLib || !ChartLib.LineChart) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Gráficos</Text>
        <View style={styles.messageBox}>
          <Text style={styles.message}>Para visualizar os gráficos, instale a dependência opcional:</Text>
          <Text style={styles.command}>npm install react-native-chart-kit react-native-svg</Text>
          <Text style={{marginTop:8}}>Depois rode: <Text style={{fontWeight:'600'}}>expo start</Text></Text>
        </View>
      </View>
    );
  }

  const { LineChart } = ChartLib;

  const data = {
    labels: labels.length ? labels : ['-'],
    datasets: [
      {
        data: values.length ? values : [0],
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(46,134,171, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(102,102,102, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evolução da Glicemia</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{ borderRadius: 8 }}
        />
      </View>
      <Text style={styles.hint}>Últimos {values.length} registros</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 16 },
  center: { flex:1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', color: '#333', marginBottom: 12 },
  chartContainer: { backgroundColor: '#fff', padding: 12, borderRadius: 8, elevation: 2 },
  hint: { marginTop: 12, color: '#666' },
  messageBox: { backgroundColor: '#fff', padding: 16, borderRadius: 8 },
  message: { color: '#333' },
  command: { marginTop: 8, fontFamily: 'monospace', backgroundColor: '#eee', padding: 8, borderRadius: 6 }
});

export default ChartsScreen;
