import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  if (authService.isAutenticado()) {
    let router = inject(Router);
    if (router.url != '/login/logout') {
      router.navigate(['/login']);
    }
  }

  let path = state.url.split('/');

  switch (path[1]) {
    case '':
      return true;
    case 'basic':
      return authService.isAutorizado('BASIC');
    default:
      return true;
  }

};
