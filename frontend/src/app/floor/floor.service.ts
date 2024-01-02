import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private baseUrl = environment.apiUrl + '/api/floors';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createFloor(floorData: any): Observable<any> {
    return this.http.post(this.baseUrl, floorData, { headers: this.authService.getHeaders() });
  }

  getFloors(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.authService.getHeaders() });
  }

  getBuildingFloors(buildingId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFloors/${buildingId}`, { headers: this.authService.getHeaders() });
  }

  findFloorByNumber(floorNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/byNumber/${floorNumber}`, { headers: this.authService.getHeaders() });
  }

  getFloorNum(floorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFloorNum/${floorId}`, { headers: this.authService.getHeaders() });
  }

  updateFloor(floorData: any): Observable<any> {
    return this.http.put(this.baseUrl, floorData, { headers: this.authService.getHeaders() });
  }

  patchFloor(id: string, floorData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, floorData, { headers: this.authService.getHeaders() });
  }
}
