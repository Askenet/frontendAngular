import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignments.model';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  getAssignments(): Observable<any> {
    return this.http.get<any>(this.backendUrl);
  }

  getAssignment(id: number): Observable<Assignment> {
    return this.http.get<any>(this.backendUrl + '/' + id);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<any>(this.backendUrl, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // On n'a besoin de ne RIEN faire ici car l'objet
    // assignment est passé par référence, donc modifié
    // directement dans le tableau this.assignments
    return this.http.put<any>(this.backendUrl, assignment);

    // PLUS TARD ON DEVRA VRAIMENT APPELER UN WEB SERVICE
    // DISTANT POUR FAIRE LA MODIFICATION !!!
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete<any>(this.backendUrl + '/' + assignment.id);
  }

  getPaginatedAssignments(page: number, limit: number): Observable<any> {
    return this.http.get<any>(this.backendUrl + '?page=' + page + '&limit=' + limit);
  }
}
