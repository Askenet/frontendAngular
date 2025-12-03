import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';
import { inject } from '@angular/core';

export const loggedGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  if (authService.isLogged()) {
    console.log('Utilisateur connecté, navigation autorisée !');
    return true;
  } else {
    console.log('Utilisateur non connecté ! Navigation refusée => redirection vers login.');
    router.navigate(['/login']);
    return false;
  }
};
