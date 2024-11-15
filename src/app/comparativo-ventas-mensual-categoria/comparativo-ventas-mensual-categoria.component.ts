import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SucursalServiceService } from '../services/sucursal-service/sucursal-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaVentasComponent } from '../graficas/categoria-ventas/categoria-ventas.component';



@Component({
  selector: 'app-comparativo-ventas-mensual-categoria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriaVentasComponent
  ],
  templateUrl: './comparativo-ventas-mensual-categoria.component.html',
  styleUrls: ['./comparativo-ventas-mensual-categoria.component.scss']
})
export class ComparativoVentasMensualCategoriaComponent implements OnInit {

  sucursales: any[] = [];
  filterForm: FormGroup;

  constructor(
    private sucursalService: SucursalServiceService,
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
