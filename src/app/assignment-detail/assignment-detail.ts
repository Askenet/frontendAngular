import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Assignment } from '../assignments/assignments.model';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth';

@Component({
  selector: 'app-assignment-detail',
  imports: [MatCardModule, MatCheckboxModule, MatButtonModule, DatePipe],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.css',
})
export class AssignmentDetail implements OnInit {
  @Output() deleteAssignment = new EventEmitter<Assignment>();

  assignmentTransmis?: Assignment;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    // On va utiliser ActivatedRoute pour lire l'id dans l'URL
    const id = +this.route.snapshot.params['id']; // le + convertit en number

    this.assignmentsService.getAssignment(id).subscribe((a: Assignment) => {
      this.assignmentTransmis = a;
    });
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = !this.assignmentTransmis.rendu;
      // On va utiliser le service pour faire la modification
      this.assignmentsService.updateAssignment(this.assignmentTransmis).subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
    }
  }

  onDeleteAssignment() {
    if (this.assignmentTransmis) {
      // Supprimer l'assignment via le service
      this.assignmentsService.deleteAssignment(this.assignmentTransmis).subscribe((message) => {
        console.log(message);
        // Rediriger vers la page d'accueil après suppression
        this.router.navigate(['/home']);
      });
    }
  }

  onClickEdit() {
    if (!this.assignmentTransmis) return;
    this.router.navigate(['/assignments', this.assignmentTransmis.id, 'edit'], {
      queryParams: {
        nom: this.assignmentTransmis.nom,
      },
      fragment: 'edition',
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdminSync();
  }
}
