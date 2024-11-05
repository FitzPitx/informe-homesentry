import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferenciasServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/referencias/all?page=0&size=10';

  getReferencias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
