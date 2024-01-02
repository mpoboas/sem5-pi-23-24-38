import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = environment.apiUrl + '/api/pickup-delivery-tasks';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createPickupAndDeliveryTask(taskData: any): Observable<any> {
    return this.http.post(this.baseUrl, taskData, { headers: this.authService.getHeaders() });
  }

  updatePickupAndDeliveryTask(taskData: any): Observable<any> {
    return this.http.put(this.baseUrl, taskData, { headers: this.authService.getHeaders() });
  }

  getPickupAndDeliveryTasks(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.authService.getHeaders() });
  }

  getPendingPickupAndDeliveryTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pending`, { headers: this.authService.getHeaders() });
  }

  getApprovedPickupAndDeliveryTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/approved`, { headers: this.authService.getHeaders() });
  }

  approvePickupAndDeliveryTask(task: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${task.id}`, {
      isApproved: true,
      isPending: false,
    }, { headers: this.authService.getHeaders() });
  }

  denyPickupAndDeliveryTask(task: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${task.id}`, {
      isApproved: false,
      isPending: false,
    }, { headers: this.authService.getHeaders() });
  }
}
