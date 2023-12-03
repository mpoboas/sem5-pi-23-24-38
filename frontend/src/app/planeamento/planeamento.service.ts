import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaneamentoService {
  private baseUrl = 'http://localhost:5000/caminho_final/'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getTrajetoria(inicio: any, fim: any): Observable<any> {
    return this.http.post(this.baseUrl, {inicio, fim});
  }
}
