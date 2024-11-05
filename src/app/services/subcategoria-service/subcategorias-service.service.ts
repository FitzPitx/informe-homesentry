import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriasServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/subcategorias';

  getSubcategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  getLineasBySubcategory(idCategoria: number, idSubcategoria: number): Observable<any> {
    const url = `${this.apiUrl}/lines-by-subcategory/${idCategoria}/${idSubcategoria}`
    return this.http.get(url);
  }
}
