import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SucursalServiceService } from '../services/sucursal-service/sucursal-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-comparativo-ventas-mensual-categoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './comparativo-ventas-mensual-categoria.component.html',
  styleUrl: './comparativo-ventas-mensual-categoria.component.scss'
})
export class ComparativoVentasMensualCategoriaComponent implements OnInit {

  form: FormGroup;
  sucursales: any[] = [];

  constructor(private fb: FormBuilder, private sucursalService: SucursalServiceService){
    this.form = this.fb.group({
      year_selected: [''],
      sucursal: ['']
    });
  }

  ngOnInit(): void {
      // Cargando sucursales desde el servicio

      this.sucursalService.getSucursales().subscribe((data: any) => {
        this.sucursales = data;
      });
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

}
