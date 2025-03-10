import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Funcionario } from '../../domain/models/funcionario/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioRepository {
  private apiUrl = 'http://localhost:5000/api/funcionarios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/all`).pipe(
      catchError(this.handleError)
    );
  }

  create(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario).pipe(
      tap((funcionario) => console.log('Funcionário criado:', funcionario)), // 🔥 Apenas loga no console
      catchError(this.handleError) // 🔥 Captura erros corretamente
    );
  }
  

  update(id: number, funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}`, funcionario).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'Ocorreu um erro desconhecido.';
  
    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro no lado do servidor
      if (error.status === 500) {
        if (typeof error.error === 'string') {
          errorMessage = error.error; // 🔥 Captura a mensagem se for string
        } else if (error.error?.message) {
          errorMessage = error.error.message; // 🔥 Se for um objeto JSON, pega a mensagem
        } else {
          errorMessage = 'Erro interno no servidor.';
        }
      } else if (error.status === 400) {
        errorMessage = error.error?.message;
      } else if (error.status === 404) {
        errorMessage = 'Recurso não encontrado.';
      }
    }
  
    console.error('Erro capturado:', errorMessage); // 🔥 Exibe no console para depuração
    return throwError(() => new Error(errorMessage));
  }
  
}
