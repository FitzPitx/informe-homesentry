import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CategoriasServiceService } from '../services/categoria-service/categorias-service.service';
import { SubcategoriasServiceService } from '../services/subcategoria-service/subcategorias-service.service'; 
import { SucursalServiceService } from '../services/sucursal-service/sucursal-service.service'; 
import { LineasServiceService } from '../services/linea-service/lineas-service.service';
import { start } from 'repl';

@Component({
  selector: 'app-comparativo-ventas-3-anos',
  standalone: true,
  imports: [MatFormFieldModule, 
    MatDatepickerModule, 
    FormsModule, 
    ReactiveFormsModule,
    JsonPipe,
    MatNativeDateModule,
    CommonModule],
  templateUrl: './comparativo-ventas-3-anos.component.html',
  styleUrls: ['./comparativo-ventas-3-anos.component.scss'],
})
export class ComparativoVentas3AnosComponent implements OnInit {

  range: FormGroup;
  sucursales: any[] = [];
  categorias: any[] = [];
  subcategorias: any[] = [];
  lineas: any[] = [];
  selectedCategoryId: number = 0;

  constructor(
    private fb: FormBuilder,
    private sucursalService: SucursalServiceService,
    private categoriasService: CategoriasServiceService,
    private subcategoriasService: SubcategoriasServiceService,
    private lineasService: LineasServiceService
  ) {
    this.range = this.fb.group({
      start:[''],
      end:['']
    });
  }



  ngOnInit(): void {
    //Iniciallizar Sucursales
    this.sucursalService.getSucursales().subscribe((data: any) => {
      this.sucursales = data;
    });                                                     

    // Inicializar categorías, subcategorías y líneas
    this.categoriasService.getCategorias().subscribe((data: any) => {
      this.categorias = data;
      // Verificar si la categoría seleccionada es "Todas"
      const categoryId = Number(this.selectedCategoryId);
      if (categoryId === 999) {
        this.subcategorias = [];
        this.lineas = [];
      }

    });
  }

  onCategoryChange(event: any): void {
    this.selectedCategoryId = event.target.value;
    console.log(this.selectedCategoryId);

    const categoryId = Number(this.selectedCategoryId);
      if (categoryId === 999) {
        this.subcategorias = [];
        this.lineas = [];
      }

    if (this.selectedCategoryId != 999) { // Si no es "Todas"
      this.categoriasService.getSubcategoriasByCategory(this.selectedCategoryId).subscribe((data: any) => {
        this.subcategorias = data.subcategoriesDTOList.map((subcategoria: any) => ({
          ...subcategoria,
          descripcion: this.capitalizeWords(subcategoria.descripcion)
        }));
      });
    }
  }

  onSubcategoryChange(event: any): void {
    const selectedSubcategoryId = event.target.value;
    console.log(selectedSubcategoryId);
    console.log(this.selectedCategoryId);
    if (this.selectedCategoryId && selectedSubcategoryId) {
      this.subcategoriasService.getLineasBySubcategory(this.selectedCategoryId, selectedSubcategoryId).subscribe((data: any) => {
        this.lineas = data.lineasDTOList;
      });
    }
  }

  capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }
}
