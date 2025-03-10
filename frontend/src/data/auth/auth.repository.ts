import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../domain/models/auth/login-response.model';



@Injectable({
  providedIn: 'root'
})
export class AuthRepository {
  // URL base da API (pode ser ajustada conforme ambiente)
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Chama a API de login com credenciais e retorna usuário + token
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/login`, credentials);
  }

  // (Opcional) Chama a API de logout para invalidar o token no backend
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/logout`, {});
  }
}
