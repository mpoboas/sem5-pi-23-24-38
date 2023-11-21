import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private baseUrl = 'http://localhost:3000/api/robots'; // Replace with your API URL

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
