import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaMensualService {
  private apiUrl = 'http://localhost:8080/api/acumulado';

  constructor(private http: HttpClient) {}

  getResumenCategoria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumen-categorias`);
  }

  getResumenCategoriaMes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumen-categorias-mes`);
  }

  /**
   * Realiza una solicitud al backend con los parámetros de sucursal y año.
   * @param sucursal - ID de la sucursal seleccionada
   * @param year - Año seleccionado
   */

  getResumenMensual(year: number, sucursal?: number): Observable<any> {
    let params = new HttpParams()
      .set('year', year.toString());     
    // Agregar sucursal como string vacío si no se proporciona
    if (sucursal) {
      params = params.set('sucursal', sucursal.toString());
    } else {
      params = params.set('sucursal', '');
    }
  
    return this.http.get(`${this.apiUrl}/resumen-categorias-mensual`, { params });
  }

  getTotalSummayGraph(year: number, sucursal?: number): Observable<any>{
    let params = new HttpParams()
    .set('year', year.toString());
    if (sucursal) {
      params = params.set('sucursal', sucursal.toString());
    } else {
      params = params.set('sucursal', '');
    }
    return this.http.get(`${this.apiUrl}/resumen-total-mensual-grafica`, { params });
  }

  getTotalSummaryGraphByCategory(year: number, sucursal?: number): Observable<any>{
    let params = new HttpParams()
      .set('year', year.toString());
      if (sucursal) {
        params = params.set('sucursal', sucursal.toString());
      } else {
        params = params.set('sucursal', '');
      }
    return this.http.get(`${this.apiUrl}/resumen-total-mensual-grafica-categoria`, { params });
  }

  getTotalProfitComparisonByMonth(year: number, sucursal?: number): Observable<any>{
    let params = new HttpParams()
    .set('year', year.toString());
    if (sucursal) {
      params = params.set('sucursal', sucursal.toString());
    } else {
      params = params.set('sucursal', '');
    }
    return this.http.get(`${this.apiUrl}/comparacion-utilidad-mensual`, { params });
  }


    
}
