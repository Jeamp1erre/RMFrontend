import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/Consulta';
import { appsettings } from '../../settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = `${appsettings.apiUrl}/api/consultas`;

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No se encontró un token de autorización');
      throw new Error('No se encontró un token de autorización');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  getAllConsultas(): Observable<Consulta[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Consulta[]>(this.apiUrl, { headers });
  }

  getUltimaConsulta(): Observable<Consulta> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Consulta>(`${this.apiUrl}/ultima`, { headers });
  }

  getConsultasByPacienteId(pacienteId: number): Observable<Consulta[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Consulta[]>(`${this.apiUrl}/paciente/${pacienteId}`, { headers });
  }

  createConsulta(pacienteId: number, motivoConsulta: string): Observable<Consulta> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<Consulta>(`${this.apiUrl}/${pacienteId}?motivoConsulta=${motivoConsulta}`, {}, { headers });
  }

  deleteConsulta(consultaId: number): Observable<string> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<string>(`${this.apiUrl}/${consultaId}`, { headers });
  }

  updateMotivoConsulta(consultaId: number, nuevoMotivo: string): Observable<Consulta> {
    const headers = this.createAuthorizationHeader();
    const body = { nuevoMotivo }; 
    return this.http.patch<Consulta>(`${this.apiUrl}/${consultaId}`, body, { headers });
  }
  
}
