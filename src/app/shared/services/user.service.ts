import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { appsettings } from '../../settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${appsettings.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = sessionStorage.getItem('token'); 
    if (!token) {
      throw new Error('No token found!');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.createAuthorizationHeader() });
  }

  searchUsers(searchTerm: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search?searchTerm=${searchTerm}`, { headers: this.createAuthorizationHeader() });
  }

  getUserById(id: number | string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, { headers: this.createAuthorizationHeader() });
  }

  updateUser(id: number | string, userDetails: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, userDetails, { headers: this.createAuthorizationHeader() });
  }

  deleteUser(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.createAuthorizationHeader() });
  }

  updateSelf(user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/me`, user, { headers: this.createAuthorizationHeader() });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`, { headers: this.createAuthorizationHeader() });
  }
}
