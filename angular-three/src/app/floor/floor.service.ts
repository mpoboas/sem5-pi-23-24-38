import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private baseUrl = 'http://localhost:3000/api/floors'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  createFloor(floorData: any): Observable<any> {
    return this.http.post(this.baseUrl, floorData);
  }

  getFloors(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getBuildingFloors(buildingId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${buildingId}`);
  }

}
