import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../shared/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  login = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';

    if (this.authService.logIn(this.login, this.password)) {
      // Connexion réussie, rediriger vers la page d'accueil
      this.router.navigate(['/home']);
    } else {
      // Échec de la connexion
      this.errorMessage = 'Login ou mot de passe incorrect';
    }
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}
