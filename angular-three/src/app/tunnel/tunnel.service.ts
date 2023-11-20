import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TunnelService {
  private baseUrl = 'http://localhost:3000/api/tunnels'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  createTunnel(tunnelData: any): Observable<any> {
    return this.http.post(this.baseUrl, tunnelData);
  }

  getTunnels(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getFloorNumber(floorId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/byId/${floorId}`);
  }
}
