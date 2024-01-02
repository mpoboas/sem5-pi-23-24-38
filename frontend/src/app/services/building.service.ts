import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  private baseUrl = environment.apiUrl + '/api/buildings';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createBuilding(buildingData: any): Observable<any> {
    return this.http.post(this.baseUrl, buildingData, { headers: this.authService.getHeaders() });
  }

  updateBuilding(buildingData: any): Observable<any> {
    return this.http.put(this.baseUrl, buildingData, { headers: this.authService.getHeaders() });
  }

  patchBuilding(id: string, buildingData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, buildingData, { headers: this.authService.getHeaders() });
  }

  getBuildings(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.authService.getHeaders() });
  }

  findBuildingById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/byId/${id}`, { headers: this.authService.getHeaders() });
  }

  findBuildingByCode(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/byCode/${code}`, { headers: this.authService.getHeaders() });
  }

  findBuildingByMinMaxFloors(range: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/floorRange/${range}`, { headers: this.authService.getHeaders() });
  }

  getBuildingCode(buildingId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getBuildingCode/${buildingId}`, { headers: this.authService.getHeaders() });
  }
}
