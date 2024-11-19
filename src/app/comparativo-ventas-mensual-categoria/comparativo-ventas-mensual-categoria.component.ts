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
    // Cargar las sucursales desde el servicio
    this.sucursalService.getSucursales().subscribe((data: any[]) => {
      this.sucursales = data;
    });


    this.dtOptions = {
      processing: true,
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
          previous: 'Anterior'
        },
      },

      ajax: (dataTablesParameters: any, callback) => {
        this.categoriaService.getResumenCategoriaMes(dataTablesParameters)
          .subscribe((resp: DataTablesResponse) => {
            callback({
              draw: resp.draw,
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          });
      },
      columns: [
        { title: 'Código Categoría', data: 'codigoCategoria' },
        { title: 'Nombre Categoría', data: 'nombreCategoria' },
        { title: 'Mes', data: 'nombreMes' },
        { title: 'Total Cantidad', data: 'totalCantidad' },
        {
          title: 'Total Valor',
          data: 'totalValor',
          render: $.fn.dataTable.render.number(',', '.', 2, '$')
        },
        {
          title: 'Total Valor IVA',
          data: 'totalValorIva',
          render: $.fn.dataTable.render.number(',', '.', 2, '$')
        },
        {
          title: 'Total Costo',
          data: 'totalCosto',
          render: $.fn.dataTable.render.number(',', '.', 2, '$')
        }
      ]
    };
  }
    

  onSubmit(): void {
    const { sucursal, year } = this.filterForm.value;

    if (sucursal && year) {
      console.log('Filtros aplicados:', { sucursal, year });
      // Lógica para filtrar datos según la sucursal y el año seleccionados
    } else {
      console.log('Por favor, seleccione tanto la sucursal como el año para aplicar los filtros.');
    }
  }

}
