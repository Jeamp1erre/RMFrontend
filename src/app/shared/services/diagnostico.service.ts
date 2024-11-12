import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diagnostico } from '../models/Diagnostico';
import { appsettings } from '../../settings/appsettings'; 

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  private apiUrl = `${appsettings.apiUrl}/api/diagnosticos`;

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

  getAllDiagnosticos(): Observable<Diagnostico[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Diagnostico[]>(this.apiUrl, { headers });
  }

  getDiagnosticosByConsultaId(consultaId: number): Observable<Diagnostico[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Diagnostico[]>(`${this.apiUrl}/consulta/${consultaId}`, { headers });
  }

  createDiagnostico(consultaId: number, nombreDoctor: string, descripcionDiagnostico: string): Observable<Diagnostico> {
    const headers = this.createAuthorizationHeader(); 
    return this.http.post<Diagnostico>(`${this.apiUrl}/${consultaId}?nombreDoctor=${nombreDoctor}&descripcionDiagnostico=${descripcionDiagnostico}`, {}, { headers });
  }

  updateDiagnostico(diagnosticoId: number, nombreDoctor?: string, descripcionDiagnostico?: string): Observable<Diagnostico> {
    const headers = this.createAuthorizationHeader();
    return this.http.patch<Diagnostico>(`${this.apiUrl}/${diagnosticoId}?nombreDoctor=${nombreDoctor}&descripcionDiagnostico=${descripcionDiagnostico}`, {}, { headers });
  }

  deleteDiagnostico(diagnosticoId: number): Observable<string> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<string>(`${this.apiUrl}/${diagnosticoId}`, { headers });
  }
}
