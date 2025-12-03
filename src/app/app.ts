import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from './shared/auth';

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('assigment-app');
  constructor(public authService: AuthService, private router: Router) {}

  handleAccountClick() {
    if (!this.authService.isLogged()) {
      // Rediriger vers la page de connexion
      this.router.navigate(['/login']);
    } else {
      this.authService.logout();
      // et on renvoie vers la home page
      this.router.navigate(['/home']);
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
    console.log('goToHome');
  }

  sideOpen: boolean = false;

  toggleSide() {
    this.sideOpen = !this.sideOpen;
  }
}
