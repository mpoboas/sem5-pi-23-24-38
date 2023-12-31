import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private baseUrl = environment.apiUrl + '/api/floors';

  constructor(private http: HttpClient) { }

  createFloor(floorData: any): Observable<any> {
    return this.http.post(this.baseUrl, floorData);
  }

  getFloors(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getBuildingFloors(buildingId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFloors/${buildingId}`);
  }

  findFloorByNumber(floorNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/byNumber/${floorNumber}`);
  }

  getFloorNum(floorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFloorNum/${floorId}`);
  }

  updateFloor(floorData: any): Observable<any> {
    return this.http.put(this.baseUrl, floorData);
  }

  patchFloor(id: string, floorData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, floorData);
  }
}
