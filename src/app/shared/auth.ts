import { Injectable } from '@angular/core';

interface User {
  login: string;
  password: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    { login: 'admin', password: 'admin123', role: 'admin' },
    { login: 'user', password: 'user123', role: 'user' },
  ];

  private currentUser: User | null = null;
  loggedIn = false;

  logIn(login: string, password: string): boolean {
    const user = this.users.find((u) => u.login === login && u.password === password);
    if (user) {
      this.currentUser = user;
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    this.loggedIn = false;
  }

  // Vérifie si l'utilisateur est connecté
  isLogged(): boolean {
    return this.loggedIn;
  }

  // Vérifie si l'utilisateur connecté est admin
  isAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      resolve(this.loggedIn && this.currentUser?.role === 'admin');
    });
  }

  // Méthode synchrone pour l'admin (pour les bindings dans les templates)
  isAdminSync(): boolean {
    return this.loggedIn && this.currentUser?.role === 'admin';
  }

  // Retourne l'utilisateur actuel
  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
