import { Routes } from '@angular/router';
import { Assignments } from './assignments/assignments';
import { AddAssignment } from './add-assignment/add-assignment';
import { AssignmentDetail } from './assignment-detail/assignment-detail';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment';
import { LoginComponent } from './login/login';
import { authGuard } from './shared/auth-guard';
import { loggedGuard } from './shared/logged-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Assignments },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: AddAssignment, canActivate: [loggedGuard] },
  { path: 'assignments/:id', component: AssignmentDetail, canActivate: [loggedGuard] },
  { path: 'assignments/:id/edit', component: EditAssignmentComponent, canActivate: [authGuard] },
];
