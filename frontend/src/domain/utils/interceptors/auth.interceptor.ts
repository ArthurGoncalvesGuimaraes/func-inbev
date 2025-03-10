import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtém o token JWT do LocalStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Clona a requisição e adiciona o cabeçalho de Authorization com o token JWT
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(authReq);
    }
    // Se não há token, segue a requisição original
    return next.handle(req);
  }
}
