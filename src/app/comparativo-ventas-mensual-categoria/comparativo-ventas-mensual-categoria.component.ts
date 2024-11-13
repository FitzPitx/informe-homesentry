import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaVentasComponent } from '../graficas/categoria-ventas/categoria-ventas.component';

@Component({
  selector: 'app-comparativo-ventas-mensual-categoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CategoriaVentasComponent
  ],
  templateUrl: './comparativo-ventas-mensual-categoria.component.html',
  styleUrl: './comparativo-ventas-mensual-categoria.component.scss'
})
export class ComparativoVentasMensualCategoriaComponent implements OnInit {


  constructor(){
  }

  ngOnInit(): void {

  }


}
