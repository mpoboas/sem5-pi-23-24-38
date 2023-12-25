import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private baseUrl = 'http://localhost:3000/api/classrooms'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  createClassroom(classroomData: any): Observable<any> {
    return this.http.post(this.baseUrl, classroomData);
  }

  updateClassroom(classroomData: any): Observable<any> {
    return this.http.put(this.baseUrl, classroomData);
  }

  patchClassroom(id: string, classroomData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, classroomData);
  }

  getClassrooms(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getFloorClassrooms(floorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getClassrooms/${floorId}`);
  }

}
