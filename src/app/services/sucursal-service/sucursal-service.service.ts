import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalServiceService {

  constructor(private http: HttpClient) {  }

  private apiUrl = 'http://localhost:8080/api/sucursales/all'

  // Get all sucursales from the API
  fetchData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
