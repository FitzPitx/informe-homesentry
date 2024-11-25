import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaMensualService {
  private apiUrl = 'http://localhost:8080/api/acumulado';

  constructor(private http: HttpClient) {}

  getResumenCategoria():
  Observable<any> {
    return this.http.get(`${this.apiUrl}/resumen-categorias`)
  }

  getResumenCategoriaMes(dataTablesParameters: any):
  Observable<any> {
    return this.http.get(`${this.apiUrl}/resumen-categorias-mes`)
  }

  /**
   * Realiza una solicitud al backend con los parámetros de sucursal y año.
   * @param sucursal - ID de la sucursal seleccionada
   * @param year - Año seleccionado
   */

  getResumenMensual(sucursal: number, year: number): Observable<any> {
    let params = new HttpParams()
      .set('sucursal', sucursal.toString())
      .set('year', year.toString());
  
    return this.http.get(`${this.apiUrl}/resumen-categorias-mensual`, { params });
  }


    
}
