import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // injection par programme (au lieu de le faire dans le constructeur d'un composant)
  let authService = inject(AuthService);
  let router = inject(Router);

  // si ça renvoie true, alors, on peut activer la route
  return authService.isAdmin().then((isAdmin) => {
    if (isAdmin) {
      console.log('Vous êtes admin, navigation autorisée !');
      return true;
    } else {
      console.log("Vous n'êtes pas admin ! Navigation refusée => redirection.");
      // et on retourne vers la page d'accueil
      router.navigate(['/home']);
      return false;
    }
  });
};
