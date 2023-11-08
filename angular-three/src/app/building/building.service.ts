import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  private baseUrl = 'http://localhost:3000/api/buildings'; // Replace with your API URL

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

  findBuildingByMinMaxFloors(range: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/floorRange/${range}`);
  }
}
