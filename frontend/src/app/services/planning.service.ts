import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  private baseUrl = 'http://localhost:5000/caminho_final/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTrajetoria(inicio: any, fim: any): Observable<any> {
    return this.http.post(this.baseUrl, {inicio, fim});
  }
}
