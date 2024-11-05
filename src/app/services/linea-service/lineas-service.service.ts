import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineasServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/lineas/all'

  // Get all lineas from the API
  getLineas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
