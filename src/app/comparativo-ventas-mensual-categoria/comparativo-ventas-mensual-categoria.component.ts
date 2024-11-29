import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaMensualService } from '../services/categoria-mensual/categoria-mensual.service';
import { CategoriaVentasComponent } from '../graficas/categoria-ventas/categoria-ventas.component';
import { CategoryData, MonthData } from '../models/datatable-interface';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

// Create interface for transformed data
interface TransformedData {
  codigoCategoria: number;
  nombreCategoria: string;
  [key: string]: string | number; // For dynamic month-metric combinations
}

@Component({
  selector: 'app-comparativo-ventas-mensual-categoria',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    CategoriaVentasComponent,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './comparativo-ventas-mensual-categoria.component.html',
  styleUrls: ['./comparativo-ventas-mensual-categoria.component.scss'],
})
export class ComparativoVentasMensualCategoriaComponent implements OnInit {
  listaVentas: CategoryData[] = [];
  filterForm: FormGroup;

  uniqueCodigos: string[] = [];
  uniqueNombres: string[] = [];
  filterValues = {
    codigoCategoria: '',
    nombreCategoria: ''
  };

  searchText : string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  listaVentasDataSource = new MatTableDataSource<TransformedData>();


  constructor(
    private fb: FormBuilder,
    private _categoriaService: CategoriaMensualService,
  ) {
    // Inicializar el formulario reactivo
    this.filterForm = this.fb.group({
      sucursal: [''],
      year: [''],
    });
  }


  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  headerRows = ['header_Enero', 'header_Febrero', 'header_Marzo', 'header_Abril', 'header_Mayo', 'header_Junio', 'header_Julio', 'header_Agosto', 'header_Septiembre', 'header_Octubre', 'header_Noviembre', 'header_Diciembre'];


  metricsColumns = [
    'ventaActual', 'utilidadActual', 'margenActual', 'ventaAnterior', 'utilidadAnterior', 'margenAnterior', 'diferenciaVentas', 'diferenciaUtilidad', 'variacionVentas'
  ]

  displayedColumns: string[] = [
    'codigoCategoria',
    'nombreCategoria',
    ...this.months.flatMap((month) => 
      this.metricsColumns.map((metric) => `${month}-${metric}`))
  ];

  ngOnInit(): void {
    const year = new Date().getFullYear();
    
    // Get initial data
    this._categoriaService.getResumenMensual(year).subscribe({
      next: (resp: CategoryData[]) => {
        this.listaVentas = resp;
        this.feedDataSource(resp);
        this.updateFilterLists();
      },
      error: (err) => console.error('Error loading data:', err)
    });
  }

  updateFilterLists() {
    this.uniqueCodigos = [...new Set(this.listaVentasDataSource.data.map(item => item.codigoCategoria.toString()))];
    this.uniqueNombres = [...new Set(this.listaVentasDataSource.data.map(item => item.nombreCategoria))];
  }

  applyFilter(columnName: string, filterValue: string){
    this.filterValues[columnName as keyof typeof this.filterValues] = filterValue;
    
    this.listaVentasDataSource.filterPredicate = (data: any, filter: string) => {
      const matchFilter = [];
      for (const key in this.filterValues) {
        const val = this.filterValues[key as keyof typeof this.filterValues];
        if (val) {
          matchFilter.push(data[key].toString().toLowerCase() === val.toLowerCase());
        }
      }
      return matchFilter.every(Boolean);
    };
    
    this.listaVentasDataSource.filter = JSON.stringify(this.filterValues);

  }

  getAllHeaderColumns(): string[] {
    return ['first-group-spaces', 'second-group-spaces'].concat(this.headerRows);
  }

  formatMetricName(metric: string): string {
    const metricMap: { [key: string]: string } = {
      'ventaActual': 'Venta Actual',
      'utilidadActual': 'Utilidad Actual',
      'margenActual': 'Margen Actual',
      'ventaAnterior': 'Venta Anterior',
      'utilidadAnterior': 'Utilidad Anterior',
      'margenAnterior': 'Margen Anterior',
      'diferenciaVentas': 'Diferencia Ventas',
      'diferenciaUtilidad': 'Diferencia Utilidad',
      'variacionVentas': 'Variación Ventas'
    };
    return metricMap[metric] || metric;
  }


  transformData(data: CategoryData[]): TransformedData[] {
    return data.map(category => {
      const transformedRow: TransformedData = {
        codigoCategoria: category.codigo_categoria,
        nombreCategoria: category.nombre_categoria
      };

      this.months.forEach(month => {
        const monthKey = month.toLowerCase();
        const monthData = category[monthKey as keyof CategoryData] as MonthData;
        
        if (monthData) {
          Object.entries(monthData).forEach(([key, value]) => {
            transformedRow[key] = value;
          });
        }
      });

      return transformedRow;
    });
  }


  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    const { sucursal, year } = this.filterForm.value;
    if (sucursal && year) {
      this._categoriaService.getResumenMensual(year, sucursal).subscribe({
        next: (resp) => {
          console.log(resp);
          this.listaVentas = resp;
          this.feedDataSource(resp);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      alert('Por favor selecciona una sucursal y un año.');
    }
  }

  feedDataSource(data: CategoryData[]) {
    const transformedData = this.transformData(data);
    this.listaVentasDataSource = new MatTableDataSource<TransformedData>(transformedData);
    if (this.paginator) {
      this.listaVentasDataSource.paginator = this.paginator;
    }
  }


  // Filtrado por las 2 primeras columnas
  private searchableColumns = ['codigoCategoria', 'nombreCategoria'];


  onInputChange() {
    this.listaVentasDataSource.filterPredicate = (data: any, filter: string) => {
      const searchStr = filter.toLowerCase();
      
      return this.searchableColumns.some(column => {
        const value = data[column];
        
        // Convertir el valor a string y manejar casos especiales
        if (value === null || value === undefined) return false;
        
        // Manejar números y currency
        if (typeof value === 'number') {
          return value.toString().includes(searchStr);
        }
        // Para strings normales
        return value.toString().toLowerCase().includes(searchStr);
      });
    };

    this.listaVentasDataSource.filter = this.searchText.trim().toLowerCase();
  }


  metricsToExcludeFromTotals = ['margenActual', 'margenAnterior', 'variacionVentas'];

getTotalsByColumn(): any {
  if (!this.listaVentasDataSource.data || this.listaVentasDataSource.data.length === 0) {
    return {};
  }

  const totals: any = {
    codigoCategoria: 'Totales',
    nombreCategoria: ''
  };

  this.months.forEach(month => {
    this.metricsColumns
      .filter(metric => !this.metricsToExcludeFromTotals.includes(metric))
      .forEach(metric => {
        const key = `${month}-${metric}`;
        totals[key] = this.listaVentasDataSource.data
          .reduce((sum: number, row: any) => sum + (row[key] || 0), 0);
    });
  });

  return totals;
}

  pageSize = 5;
  currentPage = 0;

  getCurrentPageStart(): number {
    return this.currentPage * this.pageSize;
  }

  getCurrentPageEnd(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.listaVentasDataSource.filteredData.length);
  }

  getTotalPages(): number {
    return Math.ceil(this.listaVentasDataSource.filteredData.length / this.pageSize);
  }

  getPages(): number[] {
    const pageCount = this.getTotalPages();
    return Array(pageCount).fill(0).map((_, i) => i);
  }

  setPage(page: number): void {
    if (page >= 0 && page < this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  onPageSizeChange() {
    this.currentPage = 0; // Reset to first page when changing page size
  }

}



function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
