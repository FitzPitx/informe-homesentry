import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SucursalServiceService } from '../services/sucursal-service/sucursal-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaVentasComponent } from '../graficas/categoria-ventas/categoria-ventas.component';
import { CategoriaMensualService } from '../services/categoria-mensual/categoria-mensual.service';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';

export interface DataTablesResponse {
  data: any[];
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
}

@Component({
  selector: 'app-comparativo-ventas-mensual-categoria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriaVentasComponent,
    DataTablesModule,
  ],
  templateUrl: './comparativo-ventas-mensual-categoria.component.html',
  styleUrls: ['./comparativo-ventas-mensual-categoria.component.scss']
})
export class ComparativoVentasMensualCategoriaComponent implements OnInit {

  dtOptions: Config = {};
  sucursales: any[] = [];
  filterForm: FormGroup;
  results: any[] = [];
  public categorias: any[] = []; // Almacena los datos de las categorías formateadas

  constructor(
    private sucursalService: SucursalServiceService,
    private categoriaService: CategoriaMensualService,
    private fb: FormBuilder,
  ) {
    // Inicializar el formulario reactivo
    this.filterForm = this.fb.group({
      sucursal: [''],
      year: ['']
    });
  }

  ngOnInit(): void {

    this.dtOptions = {
      processing: true,
      serverSide: false,
      pageLength: 10,
      pagingType: 'full_numbers',
      language: {
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: 'No se encontraron resultados',
        info: 'Mostrando página _PAGE_ de _PAGES_',
        infoEmpty: 'No hay registros disponibles',
        infoFiltered: '(filtrado de _MAX_ registros totales)',
        search: 'Buscar:',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior',
        },
      },

      ajax: (dataTablesParameters: any, callback) => {
        const sucursal = this.filterForm.get('sucursal')?.value;
        const year = this.filterForm.get('year')?.value;

        this.categoriaService
          .getResumenMensual(sucursal, year)
          .subscribe((resp: any) => {
            callback({
              draw: dataTablesParameters.draw,
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data,
            });
          });
      },

      columns: [
        { title: 'Código Categoría', data: 'codigoCategoria' },
        { title: 'Nombre Categoría', data: 'nombreCategoria' },
        { title: 'Mes', data: 'mes' },
        { title: 'Sucursal', data: 'nombreSucursal' },
        {
          title: 'Venta Actual',
          data: 'ventaActual',
          render: $.fn.dataTable.render.number(',', '.', 2, '$'),
        },
        {
          title: 'Utilidad Actual',
          data: 'utilidadActual',
          render: $.fn.dataTable.render.number(',', '.', 2, '$'),
        },
        {
          title: 'Margen Actual',
          data: 'margenActual',
          render: $.fn.dataTable.render.number(',', '.', 2, '%'),
        },
        {
          title: 'Venta Anterior',
          data: 'ventaAnterior',
          render: $.fn.dataTable.render.number(',', '.', 2, '$'),
        },
        {
          title: 'Utilidad Anterior',
          data: 'utilidadAnterior',
          render: $.fn.dataTable.render.number(',', '.', 2, '$'),
        },
        {
          title: 'Margen Anterior',
          data: 'margenAnterior',
          render: $.fn.dataTable.render.number(',', '.', 2, '%'),
        },
        {
          title: 'Diferencia Ventas',
          data: 'diferenciaVentas',
          render: $.fn.dataTable.render.number(',', '.', 2, '$'),
        },
        {
          title: 'Variación Ventas',
          data: 'variacionVentas',
          render: $.fn.dataTable.render.number(',', '.', 2, '%'),
        },
      ],
    };
  }
    

 // Método que se ejecuta al enviar el formulario
 onSubmit(): void {
  const { sucursal, year } = this.filterForm.value;

  if (!sucursal || !year) {
    alert('Por favor selecciona una sucursal y un año.');
    return;
  }

  // Llamar al servicio para obtener los resultados
  this.categoriaService.getResumenMensual(sucursal, year).subscribe({
    next: (data) => {
      this.results = data; // Guardar los resultados para mostrarlos en la tabla
      console.log('Datos recibidos:', data);
    },
    error: (err) => {
      console.error('Error al obtener los datos:', err);
      alert('Ocurrió un error al obtener los datos. Verifica la conexión al servidor.');
    }
  });
}
}
