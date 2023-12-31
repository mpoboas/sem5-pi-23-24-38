import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private baseUrl = environment.apiUrl + '/api/robots';

  constructor(private http: HttpClient) { }

  createRobot(robotData: any): Observable<any> {
    return this.http.post(this.baseUrl, robotData);
  }

  getRobots(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  updateRobot(robotData: any): Observable<any> {
    return this.http.put(this.baseUrl, robotData);
  }

  toggleRobot(robot: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${robot.id}`, {
      isActive: !robot.isActive,
    });
  }
  
}
