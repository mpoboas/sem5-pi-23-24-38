import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private baseUrl = environment.apiUrl + '/api/classrooms';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createClassroom(classroomData: any): Observable<any> {
    return this.http.post(this.baseUrl, classroomData, { headers: this.authService.getHeaders() });
  }

  updateClassroom(classroomData: any): Observable<any> {
    return this.http.put(this.baseUrl, classroomData, { headers: this.authService.getHeaders() });
  }

  patchClassroom(id: string, classroomData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, classroomData, { headers: this.authService.getHeaders() });
  }

  getClassrooms(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.authService.getHeaders() });
  }

  getFloorClassrooms(floorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getClassrooms/${floorId}`, { headers: this.authService.getHeaders() });
  }

}
