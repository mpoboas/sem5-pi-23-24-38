import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  userDTO: any;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api';
  private readonly tokenKey = 'authToken';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private updateAuthStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  signup(userDTO: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, userDTO);
  }

  signin(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/signin`, { email, password }).pipe(
      tap((response) => {
        const { token } = response;
        this.setToken(token);
        this.updateAuthStatus(true);
      })
    );
  }

  signout(): void {
    this.removeToken();
    this.updateAuthStatus(false);
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.name || null;
    }
    return null;
  }

  getUserId(): string | null { 
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.id || null;
    }
    return null;
  }

  deleteAccount(): Observable<any> {
    const userId = this.getUserId();
    console.log("user id:" ,userId);
    return this.http.delete(`${this.apiUrl}/auth/${userId}`).pipe(
      tap(() => {
        this.removeToken();
        this.updateAuthStatus(false);
      })
    );
  }
  
  getUsers(): Observable<any> {
    console.log('Fetching users');
    return this.http.get(`${this.apiUrl}/auth/users`);
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles`);
  }
}
