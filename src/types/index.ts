export type MealType = 'posRefeicao' | 'preRefeicao' | 'jejum' | 'solucaoControle';
export type InsulinType = 'ultrarrapida' | 'rapida' | 'acaoIntermediaria' | 'longaDuracao' | 'preMisturadaRegular' | 'preMisturadaAnaloga' | 'inserirManual';
export type InsulinPoint = 'glulisina' | 'lispro' | 'asparte';
export type NoteType = 'exercicio' | 'refeicao' | 'outros';

export interface BaseRecord {
  id: string;
  date: Date;
  observations?: string;
  type: 'glicose' | 'insulina' | 'nota';
}

export interface GlucoseRecord extends BaseRecord {
  type: 'glicose';
  value: number;
  mealType: MealType;
}

export interface InsulinRecord extends BaseRecord {
  type: 'insulina';
  dosage: number;
  insulinType: InsulinType;
  insulinPoint: InsulinPoint;
  mealType: MealType;
}

export interface NoteRecord extends BaseRecord {
  type: 'nota';
  noteType: NoteType;
  description: string;
}

export type RecordType = GlucoseRecord | InsulinRecord | NoteRecord;

export type RootStackParamList = {
  Home: undefined;
  SelectMeasurementType: undefined;
  AddGlucose: undefined;
  AddInsulin: undefined;
  AddNote: undefined;
  History: undefined;
  Charts: undefined;
} & Record<string, object | undefined>;