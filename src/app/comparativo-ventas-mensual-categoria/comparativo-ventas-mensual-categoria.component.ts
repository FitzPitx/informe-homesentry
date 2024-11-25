import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaMensualService } from '../services/categoria-mensual/categoria-mensual.service';
import { CategoriaVentasComponent } from '../graficas/categoria-ventas/categoria-ventas.component';
import { dataTableResponse } from '../models/datatable-interface';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {Sort, MatSortModule} from '@angular/material/sort';
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
    MatSortModule
  ],
  templateUrl: './comparativo-ventas-mensual-categoria.component.html',
  styleUrls: ['./comparativo-ventas-mensual-categoria.component.scss'],
})
export class ComparativoVentasMensualCategoriaComponent implements OnInit {
  
  listaVentas!: dataTableResponse[];
  filterForm: FormGroup;

  listaVentasDataSource = new MatTableDataSource<dataTableResponse>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'codigoCategoria',
    'nombreCategoria',
    'mes',
    'nombreSucursal',
    'ventaActual',
    'utilidadActual',
    'margenActual',
    'ventaAnterior',
    'utilidadAnterior',
    'margenAnterior',
    'diferenciaVentas',
    'variacionVentas',
  ];

  constructor(
    private fb: FormBuilder,
    private _categoriaService: CategoriaMensualService
  ) {
    // Inicializar el formulario reactivo
    this.filterForm = this.fb.group({
      sucursal: [''],
      year: [''],
    });
  }

  ngOnInit(): void {
    let currenYear: number = new Date().getFullYear();
    this._categoriaService.getResumenMensual(1, currenYear).subscribe({
      next: (resp) => {
        this.listaVentasDataSource = new MatTableDataSource<dataTableResponse>(resp);
        this.listaVentasDataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    const { sucursal, year } = this.filterForm.value;
    if (sucursal && year) {
      this._categoriaService.getResumenMensual(sucursal, year).subscribe({
        next: (resp) => {
          this.listaVentasDataSource = new MatTableDataSource<dataTableResponse>(resp);
          this.listaVentasDataSource.paginator = this.paginator;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      alert('Por favor selecciona una sucursal y un año.');
    }
  }

  sortData(sort: Sort){
    
  }



}
