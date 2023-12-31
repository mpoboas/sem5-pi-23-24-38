import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  private baseUrl = environment.apiUrl + '/api/buildings';

  constructor(private http: HttpClient) { }

  createBuilding(buildingData: any): Observable<any> {
    return this.http.post(this.baseUrl, buildingData);
  }

  updateBuilding(buildingData: any): Observable<any> {
    return this.http.put(this.baseUrl, buildingData);
  }

  patchBuilding(id: string, buildingData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, buildingData);
  }

  getBuildings(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  findBuildingById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/byId/${id}`);
  }

  findBuildingByCode(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/byCode/${code}`);
  }

  findBuildingByMinMaxFloors(range: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/floorRange/${range}`);
  }

  getBuildingCode(buildingId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getBuildingCode/${buildingId}`);
  }
}
