import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'login',  
    renderMode: RenderMode.Prerender  // Prerender para a página de login
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender  // Caso não encontre a página, renderiza com Prerender
  }
  ,
  {
    path: 'funcionarios',
    renderMode: RenderMode.Server  // Caso não encontre a página, renderiza com Prerender
  }
];
