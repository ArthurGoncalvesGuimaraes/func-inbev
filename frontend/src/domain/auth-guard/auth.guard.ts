import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../utils/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    // Se não há usuário logado, bloqueia acesso e redireciona para login
    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }
    // Verifica se a rota exige certos roles do usuário
    const requiredRoles = route.data['roles'] as string[] | undefined;
    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.some(role => currentUser.roles.includes(role));
      if (!hasRole) {
        // Usuário logado, porém sem papel necessário
        this.router.navigate(['/login']);
        return false;
      }
    }
    // Usuário autenticado (e com papel adequado, se requerido)
    return true;
  }
}
