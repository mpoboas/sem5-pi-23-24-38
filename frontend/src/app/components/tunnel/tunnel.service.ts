import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TunnelService {
  private baseUrl = environment.apiUrl + '/api/tunnels';

  constructor(private http: HttpClient, private authService: AuthService) { }

  createTunnel(tunnelData: any): Observable<any> {
    return this.http.post(this.baseUrl, tunnelData, { headers: this.authService.getHeaders() });
  }

  getTunnels(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.authService.getHeaders() });
  }

  getFloorNumber(floorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/byId/${floorId}`, { headers: this.authService.getHeaders() });
  }

  updateTunnel(tunnelData: any): Observable<any> {
    return this.http.put(this.baseUrl, tunnelData, { headers: this.authService.getHeaders() });
  }

  patchTunnel(id: string, tunnelData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, tunnelData, { headers: this.authService.getHeaders() });
  }

  getFloorsTunnel(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFloorsTunnel`, { headers: this.authService.getHeaders() });
  }
}
