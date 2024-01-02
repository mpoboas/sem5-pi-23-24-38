import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RobotTypeService {
  private baseUrl = environment.apiUrl + '/api/robot-types'; 


  constructor(private http: HttpClient, private authService: AuthService) { }

  createRobotType(robotTypeData: any): Observable<any> {
    return this.http.post(this.baseUrl, robotTypeData, { headers: this.authService.getHeaders() });
  }

  updateRobotType(robotTypeData: any): Observable<any> {
    return this.http.put(this.baseUrl, robotTypeData, { headers: this.authService.getHeaders() });
  }

  patchRobotType(id: string, robotTypeData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, robotTypeData, { headers: this.authService.getHeaders() });
  }

  getRobotTypes(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.authService.getHeaders() });
  }

  findRobotTypeById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/byId/${id}`, { headers: this.authService.getHeaders() });
  }
  


}
