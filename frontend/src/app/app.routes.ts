import { Routes } from '@angular/router';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { AdmFuncionariosComponent } from './adm-funcionarios/adm-funcionarios.component';

export const routes: Routes = [
     {
        path: 'login',  // Caminho explícito para a página de login
        component: PaginaLoginComponent
      },
      {
        path: 'funcionarios',  // Caminho explícito para a página de login
        component: AdmFuncionariosComponent
      },
      {
        path: '**',  // Caso não encontre nenhuma rota, redireciona para o login ou outra página
        redirectTo: '/login',
      },
];
