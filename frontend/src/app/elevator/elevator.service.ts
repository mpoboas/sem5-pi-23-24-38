import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElevatorService {

  private baseUrl = 'http://localhost:3000/api/elevators';

  constructor(private http: HttpClient) { }

  createElevator(elevatorData: any): Observable<any> {
    return this.http.post(this.baseUrl, elevatorData);
  }

  getElevators(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getElevatorFloors(elevatorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${elevatorId}`);
  }

  updateElevator(elevatorData: any): Observable<any> {
    return this.http.put(this.baseUrl, elevatorData);
  }

  patchElevator(id: string, elevatorData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, elevatorData);
  }
}
