import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaMensualService } from '../services/categoria-mensual/categoria-mensual.service';
import { CategoriaVentasComponent } from '../graficas/categoria-ventas/categoria-ventas.component';
import { dataTableResponse } from '../models/datatable-interface';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Sort, MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-comparativo-ventas-mensual-categoria',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatPaginator,
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
  listaVentas: dataTableResponse[] = [];
  filterForm: FormGroup;

  searchText : string = "";
  timeOut: any;

  uniqueCategories: number[] = [];
  selectedCategory: string = '';

  listaVentasDataSource = new MatTableDataSource<dataTableResponse>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'codigoCategoria',
    'nombreCategoria',
    'mes',
    'ventaActual',
    'utilidadActual',
    'margenActual',
    'ventaAnterior',
    'utilidadAnterior',
    'margenAnterior',
    'diferenciaVentas',
    'diferenciaUtilidad',
    'variacionVentas',
  ];

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

  ngOnInit(): void {
    // Obtener la lista de ventas año actual
    const year = new Date().getFullYear();
    this._categoriaService.getResumenMensual(year).subscribe({
      next: (resp) => {
        console.log(resp);
        this.listaVentas = resp;
        this.feedDataSource(resp);
        // Extraemos las categorías únicas
        this.uniqueCategories = Array.from(
          new Set(this.listaVentas.map((item) => item.codigoCategoria))
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterByCategory(category: number) {
    this.selectedCategory = category.toString();
    const filteredData = category
    ? this.listaVentas.filter((item) => item.codigoCategoria === category)
    : this.listaVentas;
    this.feedDataSource(filteredData);
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

  feedDataSource(data: dataTableResponse[]) {
    this.listaVentasDataSource = new MatTableDataSource<dataTableResponse>(
      data
    );
    this.listaVentasDataSource.paginator = this.paginator;
  }

  sortData(sort: Sort) {
    const data = this.listaVentas.slice();
    if (!sort.active || sort.direction === '') {
      this.feedDataSource(data);
      return;
    }

    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'codigoCategoria':
          return compare(a.codigoCategoria, b.codigoCategoria, isAsc);
        case 'nombreCategoria':
          return compare(a.nombreCategoria, b.nombreCategoria, isAsc);
        case 'mes':
          return compare(a.mes, b.mes, isAsc);
        default:
          return 0;
      }
    });

    this.feedDataSource(sortedData);
  }

  // Filtrado por las 3 primeras columnas
  private searchableColumns = ['codigoCategoria', 'nombreCategoria', 'mes'];


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
  
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
