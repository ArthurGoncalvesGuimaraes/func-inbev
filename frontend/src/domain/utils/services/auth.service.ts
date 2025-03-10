import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/auth/user.model';
import { AuthRepository } from '../../../data/auth/auth.repository';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject para armazenar o usuário atualmente logado (ou null se não logado)
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();  // Observable para componentes assinarem

  constructor(private authRepository: AuthRepository, private router: Router) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        // Lógica para inicializar usuário a partir do token
      }
    }
  }

  // Getter síncrono opcional para obter o valor atual do usuário
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Atualiza o estado do usuário logado (por exemplo, após login bem-sucedido)
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  // Faz logout do usuário: limpa token e estado, e redireciona para tela de login
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
