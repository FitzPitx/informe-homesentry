import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaVentasComponent } from '../graficas/categoria-ventas/categoria-ventas.component';
import { CategoriaMensualService } from '../services/categoria-mensual/categoria-mensual.service';
import { Config } from 'datatables.net';
import { DatatableVentasMensualesComponent } from '../datatables/datatable-ventas-mensuales/datatable-ventas-mensuales.component';

@Component({
  selector: 'app-comparativo-ventas-mensual-categoria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriaVentasComponent,
    DatatableVentasMensualesComponent
  ],
  templateUrl: './comparativo-ventas-mensual-categoria.component.html',
  styleUrls: ['./comparativo-ventas-mensual-categoria.component.scss'],
})
export class ComparativoVentasMensualCategoriaComponent implements OnInit {
  dtOptions: Config = {};
  sucursales: any[] = [];
  filterForm: FormGroup;
  results: any[] = [];
  public categorias: any[] = []; // Almacena los datos de las categorías formateadas

  constructor(
    private _categoriaService: CategoriaMensualService,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario reactivo
    this.filterForm = this.fb.group({
      sucursal: [''],
      year: [''],
    });
  }

  ngOnInit(): void {
   // this.getResumenMensual();
  }

  getResumenMensual(){
    const { sucursal, year } = this.filterForm.value;
    this._categoriaService.getResumenMensual(sucursal, year).subscribe({
      next:(resp) => {
        console.log(resp);
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    this.getResumenMensual();
  }
}