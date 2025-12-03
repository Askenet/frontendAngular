import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignments/assignments.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './add-assignment.html',
  styleUrl: './add-assignment.css',
})
export class AddAssignment implements OnInit {
  id!: number;
  nomDevoir: string = '';
  ajoutActive: boolean = false;
  dateDeRendu: Date = new Date();

  constructor(private assignmentsService: AssignmentsService, private router: Router) {}
  ngOnInit() {
    setTimeout(() => {
      this.ajoutActive = true;
    }, 200);
  }

  onSubmit(event: any) {
    if (this.nomDevoir.trim()) {
      const newAssignment = new Assignment();
      newAssignment.nom = this.nomDevoir;
      newAssignment.dateDeRendu = this.dateDeRendu;
      newAssignment.rendu = false;
      newAssignment.id = Math.floor(Math.random() * 1000000);

      // Émettre l'événement vers le parent

      this.assignmentsService.addAssignment(newAssignment).subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
    }
  }
}
