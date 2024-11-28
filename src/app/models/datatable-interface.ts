export interface MonthData {
  [key: string]: number;
}

export interface CategoryData {
  codigo_categoria: number;
  nombre_categoria: string;
  enero: MonthData;
  febrero: MonthData;
  marzo: MonthData;
  abril: MonthData;
  mayo: MonthData;
  junio: MonthData;
  julio: MonthData;
  agosto: MonthData;
  septiembre: MonthData;
  octubre: MonthData;
  noviembre: MonthData;
  diciembre: MonthData;
}
