import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { clear } from 'console';

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
    MatInputModule
  ],
  templateUrl: './comparativo-ventas-mensual-categoria.component.html',
  styleUrls: ['./comparativo-ventas-mensual-categoria.component.scss'],
})
export class ComparativoVentasMensualCategoriaComponent implements OnInit {
  listaVentas: dataTableResponse[] = [];
  filterForm: FormGroup;

  searchText : string = "";
  timeOut: any;

  listaVentasDataSource = new MatTableDataSource<dataTableResponse>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'codigoCategoria',
    'nombreCategoria',
    'mes',
    'nombreSucursal',
    'ventaActual',
    'costoActual',
    'utilidadActual',
    'margenActual',
    'ventaAnterior',
    'costoAnterior',
    'utilidadAnterior',
    'margenAnterior',
    'diferenciaVentas',
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
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    const { sucursal, year } = this.filterForm.value;
    if (sucursal && year) {
      this._categoriaService.getResumenMensual(sucursal, year).subscribe({
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
        case 'nombreSucursal':
          return compare(a.nombreSucursal, b.nombreSucursal, isAsc);
        default:
          return 0;
      }
    });

    this.feedDataSource(sortedData);
  }


  onInputChange() {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.filterData();
    }, 300);
  }

  filterData(){
    const search = this.searchText;
    const data = this.listaVentas.slice();
    if (!search){
      this.feedDataSource(data);
      return;
    }

    const dataFiltered = data.filter((item) => {
      return item.nombreCategoria.toLowerCase().includes(search.toLowerCase());
    });

    this.feedDataSource(dataFiltered);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
