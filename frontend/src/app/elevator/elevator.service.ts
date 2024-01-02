import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ElevatorService {

  private baseUrl = environment.apiUrl + '/api/elevators';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createElevator(elevatorData: any): Observable<any> {
    return this.http.post(this.baseUrl, elevatorData, { headers: this.authService.getHeaders() });
  }

  getElevators(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.authService.getHeaders() });
  }

  getElevatorFloors(elevatorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getElevatorFloors/${elevatorId}`, { headers: this.authService.getHeaders() });
  }

  updateElevator(elevatorData: any): Observable<any> {
    return this.http.put(this.baseUrl, elevatorData, { headers: this.authService.getHeaders() });
  }

  patchElevator(id: string, elevatorData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, elevatorData, { headers: this.authService.getHeaders() });
  }


  
}
