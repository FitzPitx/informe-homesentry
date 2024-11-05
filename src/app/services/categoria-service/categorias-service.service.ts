import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/categorias';

  // Get all categorias from the API
  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  getSubcategoriasByCategory(idCategoria: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/search-subcategories/${idCategoria}`);
  }
}
