import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Rendu } from '../shared/rendu';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Assignment } from './assignments.model';
import { MatListModule } from '@angular/material/list';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-assignments',
  imports: [
    DatePipe,
    MatDividerModule,
    Rendu,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,

    MatListModule,
    RouterLink,
  ],
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
})
export class Assignments implements OnInit {
  //pour gérer la pagination
  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;

  boutonActive = false;
  formVisible = false;

  // Pour la sélection
  assignmentSelectionne?: Assignment;

  constructor(private assignmentsService: AssignmentsService) {}

  assignments: Assignment[] = [];

  ngOnInit() {
    console.log("ngOnInit appelé avant l'affichage du composant");
    console.log('Appel du service pour récupérer les données');

    this.loadAssignments();
  }

  getColor(assignment: any) {
    if (assignment.rendu) {
      return 'green';
    } else {
      return 'red';
    }
  }

  assignmentClique(assignment: Assignment) {
    console.log('Assignment cliqué : ' + assignment.nom);
    this.assignmentSelectionne = assignment;
  }

  onDeleteAssignment(assignmentToDelete: Assignment) {
    // On va supprimer l'assignment reçu du tableau des assignments
    this.assignmentsService.deleteAssignment(assignmentToDelete).subscribe((message) => {
      console.log('Assignment supprimé avec succès');
    });
  }

  // Méthodes de pagination
  goToFirstPage() {
    this.page = 1;
    this.loadAssignments();
  }

  goToPreviousPage() {
    if (this.hasPrevPage) {
      this.page = this.prevPage;
      this.loadAssignments();
    }
  }

  goToNextPage() {
    if (this.hasNextPage) {
      this.page = this.nextPage;
      this.loadAssignments();
    }
  }

  goToLastPage() {
    this.page = this.totalPages;
    this.loadAssignments();
  }

  private loadAssignments() {
    this.assignmentsService
      .getPaginatedAssignments(this.page, this.limit)
      .subscribe((data: any) => {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        console.log('Données reçues - Page:', this.page);
      });
  }
}
