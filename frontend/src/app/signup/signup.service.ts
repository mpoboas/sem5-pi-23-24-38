// signup.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private apiUrl = 'http://localhost:3000/api/auth/signup';

  constructor(private http: HttpClient) {}

  signup(user: any) {
    return this.http.post(this.apiUrl, user);
  }
}
