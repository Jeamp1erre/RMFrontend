// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';
import { appsettings } from '../../settings/appsettings'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = `${appsettings.apiUrl}/auth`;  

  constructor(private http: HttpClient, private router: Router) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, request);
  }

  logout(): void {
    sessionStorage.removeItem('token');  
    this.router.navigate(['/login']); 
  }
}
