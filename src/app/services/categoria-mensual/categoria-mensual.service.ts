import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoriaSucursalResumen {
  totalCantidad: any;
  codigo: number;
  sucursal: number;
  cantidad: number;
  totalValor: number;
  totalValorIva: number;
  totalCosto: number;
}
@Injectable({
  providedIn: 'root'
})
export class CategoriaMensualService {
  private apiUrl22 = 'http://localhost:8080/api/categorias22';

  private apiUrl23 = 'http://localhost:8080/api/categorias23';

  private apiUrl24 = 'http://localhost:8080/api/categorias24';

  constructor(private http: HttpClient) {}

  getResumenSucursal():
  Observable<any> {
    return this.http.get(`${this.apiUrl22}/resumen-sucursales`)
  }

  getResumenCategoria():
  Observable<any> {
    return this.http.get(`${this.apiUrl22}/resumen-categorias`)
  }

  getResumenCategoriaMes():
  Observable<any> {
    return this.http.get(`${this.apiUrl22}/resumen-categorias-mes`)
  }
    
  getResumen(): Observable<CategoriaSucursalResumen[]> {
    return this.http.get<CategoriaSucursalResumen[]>(`${this.apiUrl22}/categorias-sucursal-resumen`);
  }
}
