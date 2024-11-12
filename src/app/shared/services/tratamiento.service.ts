import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from '../models/Tratamiento';
import { appsettings } from '../../settings/appsettings'; 

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  private apiUrl = `${appsettings.apiUrl}/api/tratamientos`;

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

  getAllTratamientos(): Observable<Tratamiento[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Tratamiento[]>(this.apiUrl, { headers });
  }

  getTratamientosByDiagnosticoId(diagnosticoId: number): Observable<Tratamiento[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<Tratamiento[]>(`${this.apiUrl}/diagnostico/${diagnosticoId}`, { headers });
  }

  createTratamiento(diagnosticoId: number, descripcionTratamiento: string, duracionDias: number): Observable<Tratamiento> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<Tratamiento>(
      `${this.apiUrl}/diagnostico/${diagnosticoId}`,  
      null, 
      {
        headers,
        params: {  
          descripcionTratamiento,
          duracionDias: duracionDias.toString()  
        }
      }
    );
  }

  updateTratamiento(id: number, updatedTratamiento: Tratamiento): Observable<Tratamiento> {
    const headers = this.createAuthorizationHeader();
    return this.http.patch<Tratamiento>(`${this.apiUrl}/${id}`, updatedTratamiento, { headers });
  }

  deleteTratamiento(id: number): Observable<void> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
