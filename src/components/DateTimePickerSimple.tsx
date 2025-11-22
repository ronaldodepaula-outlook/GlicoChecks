import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';

interface Props {
  value: Date;
  onChange: (d: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  label?: string;
}

export const DateTimePickerSimple: React.FC<Props> = ({ value, onChange, mode = 'datetime', label }) => {
  const [visible, setVisible] = useState(false);
  const [day, setDay] = useState(String(value.getDate()));
  const [month, setMonth] = useState(String(value.getMonth() + 1));
  const [year, setYear] = useState(String(value.getFullYear()));
  const [hours, setHours] = useState(String(value.getHours()));
  const [minutes, setMinutes] = useState(String(value.getMinutes()));
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date(value.getFullYear(), value.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date>(value);

  useEffect(() => {
    setSelectedDate(value);
    setDay(String(value.getDate()));
    setMonth(String(value.getMonth() + 1));
    setYear(String(value.getFullYear()));
    setHours(String(value.getHours()));
    setMinutes(String(value.getMinutes()));
    setCalendarMonth(new Date(value.getFullYear(), value.getMonth(), 1));
  }, [value]);

  const open = () => {
    const d = value;
    setDay(String(d.getDate()));
    setMonth(String(d.getMonth() + 1));
    setYear(String(d.getFullYear()));
    setHours(String(d.getHours()));
    setMinutes(String(d.getMinutes()));
    setVisible(true);
  };

  const apply = () => {
    const dd = parseInt(day || '1', 10);
    const mm = parseInt(month || '1', 10) - 1;
    const yy = parseInt(year || String(new Date().getFullYear()), 10);
    const hh = parseInt(hours || '0', 10);
    const min = parseInt(minutes || '0', 10);
    const newDate = new Date();
    newDate.setFullYear(yy, mm, dd);
    newDate.setHours(hh, min, 0, 0);
    onChange(newDate);
    setVisible(false);
  };

  const formattedDate = () => {
    const d = value;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    if (mode === 'date') return `${dd}/${mm}/${yy}`;
    if (mode === 'time') return `${hh}:${min}`;
    return `${dd}/${mm}/${yy} ${hh}:${min}`;
  };

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity style={styles.display} onPress={open}>
        <Text style={styles.displayText}>{formattedDate()}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione {mode === 'time' ? 'Hora' : 'Data'}</Text>

            {(mode === 'date' || mode === 'datetime') && (
              <View>
                <View style={styles.calendarHeader}>
                  <TouchableOpacity onPress={() => setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>
                    <Text style={styles.navText}>‹</Text>
                  </TouchableOpacity>
                  <Text style={styles.calendarTitle}>{calendarMonth.toLocaleString(undefined, { month: 'long' })} {calendarMonth.getFullYear()}</Text>
                  <TouchableOpacity onPress={() => setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>
                    <Text style={styles.navText}>›</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.weekRow}>
                  {['Dom','Seg','Ter','Qua','Qui','Sex','Sab'].map((w) => (
                    <Text key={w} style={styles.weekDay}>{w}</Text>
                  ))}
                </View>

                <View style={styles.calendarGrid}>
                  {(() => {
                    const yearNum = calendarMonth.getFullYear();
                    const monthNum = calendarMonth.getMonth();
                    const firstDay = new Date(yearNum, monthNum, 1).getDay();
                    const daysInMonth = new Date(yearNum, monthNum + 1, 0).getDate();
                    const cells: (number | null)[] = [];
                    for (let i = 0; i < firstDay; i++) cells.push(null);
                    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
                    while (cells.length % 7 !== 0) cells.push(null);

                    return cells.map((dayCell, idx) => {
                      if (dayCell === null) return <View key={idx} style={styles.dayCellEmpty} />;
                      const isSelected = selectedDate.getFullYear() === yearNum && selectedDate.getMonth() === monthNum && selectedDate.getDate() === dayCell;
                      const today = new Date();
                      const isToday = today.getFullYear() === yearNum && today.getMonth() === monthNum && today.getDate() === dayCell;
                      return (
                        <TouchableOpacity
                          key={idx}
                          style={[styles.dayCell, isSelected ? styles.selectedDay : null]}
                          onPress={() => {
                            const newD = new Date(yearNum, monthNum, dayCell, selectedDate.getHours(), selectedDate.getMinutes());
                            setSelectedDate(newD);
                            setDay(String(dayCell));
                            setMonth(String(monthNum + 1));
                            setYear(String(yearNum));
                          }}
                        >
                          <Text style={[styles.dayText, isToday ? styles.todayText : null]}>{dayCell}</Text>
                        </TouchableOpacity>
                      );
                    });
                  })()}
                </View>
              </View>
            )}

            {(mode === 'time' || mode === 'datetime') && (
              <View style={styles.row}>
                <TextInput style={styles.inputSmall} keyboardType="number-pad" value={hours} onChangeText={setHours} />
                <Text style={styles.sep}>:</Text>
                <TextInput style={styles.inputSmall} keyboardType="number-pad" value={minutes} onChangeText={setMinutes} />
              </View>
            )}

            <View style={styles.buttonsRow}>
              <Button title="Cancelar" onPress={() => setVisible(false)} />
              <Button title="Ok" onPress={apply} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  display: { backgroundColor: '#fff', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ddd' },
  displayText: { fontSize: 16, color: '#333' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  inputSmall: { width: 60, backgroundColor: '#f6f6f6', padding: 8, borderRadius: 8, textAlign: 'center', marginHorizontal: 6 },
  inputSmallLong: { width: 100, backgroundColor: '#f6f6f6', padding: 8, borderRadius: 8, textAlign: 'center', marginHorizontal: 6 },
  sep: { fontSize: 18, fontWeight: 'bold' },
  buttonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  navText: { fontSize: 22, color: '#2E86AB', paddingHorizontal: 12 },
  calendarTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 6 },
  weekDay: { width: 36, textAlign: 'center', color: '#666', fontSize: 12 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: `${100 / 7}%`, paddingVertical: 10, alignItems: 'center', justifyContent: 'center' },
  dayCellEmpty: { width: `${100 / 7}%`, paddingVertical: 10 },
  dayText: { color: '#333' },
  selectedDay: { backgroundColor: '#2E86AB', borderRadius: 20 },
  todayText: { fontWeight: 'bold', color: '#A23B72' },
});

export default DateTimePickerSimple;
