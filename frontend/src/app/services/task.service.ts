import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private pickupDeliveryUrl = environment.apiUrl + '/api/pickup-delivery-tasks';
  private surveillanceUrl = environment.apiUrl + '/api/surveillance-tasks';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createPickupAndDeliveryTask(taskData: any): Observable<any> {
    return this.http.post(this.pickupDeliveryUrl, taskData, { headers: this.authService.getHeaders() });
  }

  updatePickupAndDeliveryTask(taskData: any): Observable<any> {
    return this.http.put(this.pickupDeliveryUrl, taskData, { headers: this.authService.getHeaders() });
  }

  getPickupAndDeliveryTasks(): Observable<any> {
    return this.http.get(this.pickupDeliveryUrl, { headers: this.authService.getHeaders() });
  }

  getPendingPickupAndDeliveryTasks(): Observable<any> {
    return this.http.get(`${this.pickupDeliveryUrl}/pending`, { headers: this.authService.getHeaders() });
  }

  getApprovedPickupAndDeliveryTasks(): Observable<any> {
    return this.http.get(`${this.pickupDeliveryUrl}/approved`, { headers: this.authService.getHeaders() });
  }

  approvePickupAndDeliveryTask(task: any): Observable<any> {
    return this.http.patch(`${this.pickupDeliveryUrl}/${task.id}`, {
      isApproved: true,
      isPending: false,
    }, { headers: this.authService.getHeaders() });
  }

  denyPickupAndDeliveryTask(task: any): Observable<any> {
    return this.http.patch(`${this.pickupDeliveryUrl}/${task.id}`, {
      isApproved: false,
      isPending: false,
    }, { headers: this.authService.getHeaders() });
  }

  createSurveillanceTask(taskData: any): Observable<any> {
    return this.http.post(this.surveillanceUrl, taskData, { headers: this.authService.getHeaders() });
  }

  updateSurveillanceTask(taskData: any): Observable<any> {
    return this.http.put(this.surveillanceUrl, taskData, { headers: this.authService.getHeaders() });
  }

  getSurveillanceTasks(): Observable<any> {
    return this.http.get(this.surveillanceUrl, { headers: this.authService.getHeaders() });
  }

  getPendingSurveillanceTasks(): Observable<any> {
    return this.http.get(`${this.surveillanceUrl}/pending`, { headers: this.authService.getHeaders() });
  }

  getApprovedSurveillanceTasks(): Observable<any> {
    return this.http.get(`${this.surveillanceUrl}/approved`, { headers: this.authService.getHeaders() });
  }

  approveSurveillanceTask(task: any): Observable<any> {
    return this.http.patch(`${this.surveillanceUrl}/${task.id}`, {
      isApproved: true,
      isPending: false,
    }, { headers: this.authService.getHeaders() });
  }

  denySurveillanceTask(task: any): Observable<any> {
    return this.http.patch(`${this.surveillanceUrl}/${task.id}`, {
      isApproved: false,
      isPending: false,
    }, { headers: this.authService.getHeaders() });
  }
}
