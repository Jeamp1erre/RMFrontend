import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoriaMedica } from '../models/HistoriaMedica';
import { appsettings } from '../../settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class HistoriaMedicaService {
  private apiUrl = `${appsettings.apiUrl}/api/historia-medica`;

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

  getHistoriaMedicaByPacienteId(pacienteId: number): Observable<HistoriaMedica> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<HistoriaMedica>(`${this.apiUrl}/paciente/${pacienteId}`, { headers });
  }

  clearHistoriaMedica(id: number): Observable<HistoriaMedica> {
    const headers = this.createAuthorizationHeader();
    return this.http.patch<HistoriaMedica>(`${this.apiUrl}/vaciar/${id}`, {}, { headers });
  }

 saveHistoriaMedica(historiaMedica: HistoriaMedica, pacienteId?: number): Observable<HistoriaMedica> {
    const headers = this.createAuthorizationHeader();
    
    if (historiaMedica.id) {
      return this.http.patch<HistoriaMedica>(`${this.apiUrl}/${historiaMedica.id}`, historiaMedica, { headers });
    } else if (pacienteId) {
      return this.http.post<HistoriaMedica>(`${this.apiUrl}/${pacienteId}`, historiaMedica, { headers });
    } else {
      throw new Error('Para crear una nueva historia médica se requiere el pacienteId');
    }
  }
  

  updateHistoriaMedica(id: number, historiaMedica: HistoriaMedica): Observable<HistoriaMedica> {
    const headers = this.createAuthorizationHeader();
    return this.http.patch<HistoriaMedica>(`${this.apiUrl}/${id}`, historiaMedica, { headers });
  }
}
