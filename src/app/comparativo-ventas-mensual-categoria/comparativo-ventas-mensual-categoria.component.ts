import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SucursalServiceService } from '../services/sucursal-service/sucursal-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaVentasComponent } from '../graficas/categoria-ventas/categoria-ventas.component';
import { CategoriaMensualService } from '../services/categoria-mensual/categoria-mensual.service';



@Component({
  selector: 'app-comparativo-ventas-mensual-categoria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriaVentasComponent,
  ],
  templateUrl: './comparativo-ventas-mensual-categoria.component.html',
  styleUrls: ['./comparativo-ventas-mensual-categoria.component.scss']
})
export class ComparativoVentasMensualCategoriaComponent implements OnInit {

  sucursales: any[] = [];
  filterForm: FormGroup;
  public categorias: any[] = []; // Almacena los datos de las categorías formateadas
  public meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

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

    this.categoriaService.getResumenCategoriaMes().subscribe((data) => {
      // Transformar los datos para adaptarlos a la tabla
      const categoriasMap: { [codigo: number]: any } = {};

      data.forEach((item: any) => {
        const codigo = item.codigoCategoria;
        if (!categoriasMap[codigo]) {
          // Inicializar la categoría si no existe
          categoriasMap[codigo] = {
            codigo: item.codigoCategoria,
            nombre: item.nombreCategoria,
            meses: Array(12).fill(null).map(() => ({
              cantidad: 0,
              valor: 0,
              valorIva: 0,
              costo: 0
            }))
          };
        }
        // Asignar los valores al mes correspondiente
        const mesIndex = item.mes - 1; // Restar 1 porque los meses están indexados desde 0
        categoriasMap[codigo].meses[mesIndex] = {
          cantidad: item.totalCantidad,
          valor: item.totalValor,
          valorIva: item.totalValorIva,
          costo: item.totalCosto
        };
      });

      // Convertir el mapa en un array
      this.categorias = Object.values(categoriasMap);
    });
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
