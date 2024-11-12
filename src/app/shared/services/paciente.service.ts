import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/Paciente';
import { appsettings } from '../../settings/appsettings'; 

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = `${appsettings.apiUrl}/api/pacientes`;

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró un token de autorización');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  getAllPacientes(): Observable<Paciente[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Paciente[]>(this.apiUrl, { headers });
  }

  getPacienteById(id: number): Observable<Paciente> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`, { headers });
  }

  searchPaciente(search: string): Observable<Paciente[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Paciente[]>(`${this.apiUrl}/search?search=${search}`, { headers });
  }

  createPaciente(paciente: Paciente): Observable<Paciente> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<Paciente>(this.apiUrl, paciente, { headers });
  }

  updatePaciente(id: number, paciente: Paciente): Observable<Paciente> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente, { headers });
  }

  deletePaciente(id: number): Observable<string> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers });
  }

  patchPaciente(id: number, paciente: Partial<Paciente>): Observable<Paciente> {
    const headers = this.createAuthorizationHeader();
    return this.http.patch<Paciente>(`${this.apiUrl}/${id}`, paciente, { headers });
  }
}
