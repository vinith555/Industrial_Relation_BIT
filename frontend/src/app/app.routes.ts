import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component'; 
import { AdminComponent } from './admin/admin.component'; 
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopvicitorsComponent } from './topvicitors/topvicitors.component';
import { AuthGuard } from './auth.guard';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdmintopvisitorsComponent } from './admintopvisitors/admintopvisitors.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'topVicitor', component: TopvicitorsComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'admindashboard', component: AdmindashboardComponent},
      { path: 'admintopVicitor', component: AdmintopvisitorsComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
