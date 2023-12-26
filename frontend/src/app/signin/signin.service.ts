// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  private apiUrl = 'http://localhost:3000/api/auth/signin';

  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post(this.apiUrl, user);
  }
}
