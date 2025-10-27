export interface DataRow {
  [key: string]: any;
}

export type ChartType = 'bar' | 'line' | 'point' | 'area';

export type FieldType = 'quantitative' | 'nominal' | 'ordinal' | 'temporal';

export interface EncodingField {
  field: string;
  type: FieldType;
}