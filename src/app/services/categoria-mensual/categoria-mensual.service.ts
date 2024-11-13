import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoriaSucursalResumen {
  codigo: number;
  sucursal: number;
  cantidad: number;
  valor: number;
  valorIva: number;
  costo: number;
}
@Injectable({
  providedIn: 'root'
})
export class CategoriaMensualService {
  private apiUrl = 'http://localhost:8080/api/categorias22/categorias-sucursal-resumen';

  constructor(private http: HttpClient) {}

  getResumen(): Observable<CategoriaSucursalResumen[]> {
    return this.http.get<CategoriaSucursalResumen[]>(this.apiUrl);
  }
}
