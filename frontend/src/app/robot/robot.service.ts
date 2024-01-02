import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private baseUrl = environment.apiUrl + '/api/robots';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createRobot(robotData: any): Observable<any> {
    return this.http.post(this.baseUrl, robotData, { headers: this.authService.getHeaders() });
  }

  getRobots(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.authService.getHeaders() });
  }

  updateRobot(robotData: any): Observable<any> {
    return this.http.put(this.baseUrl, robotData, { headers: this.authService.getHeaders() });
  }

  toggleRobot(robot: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${robot.id}`, {
      isActive: !robot.isActive,
    }, { headers: this.authService.getHeaders() });
  }
  
}
