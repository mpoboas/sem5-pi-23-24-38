import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RobotTypeService {
  private baseUrl = environment.apiUrl + '/api/robot-types'; 


  constructor(private http: HttpClient) { }

  createRobotType(robotTypeData: any): Observable<any> {
    return this.http.post(this.baseUrl, robotTypeData);
  }

  updateRobotType(robotTypeData: any): Observable<any> {
    return this.http.put(this.baseUrl, robotTypeData);
  }

  patchRobotType(id: string, robotTypeData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, robotTypeData);
  }

  getRobotTypes(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  findRobotTypeById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/byId/${id}`);
  }
  


}
