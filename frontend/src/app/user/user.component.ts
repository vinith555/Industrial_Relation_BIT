import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { TopvicitorsComponent } from '../topvicitors/topvicitors.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router } from '@angular/router';
import { PeronDetailService } from '../peron-detail.service';
import { UpcomingService } from '../upcoming.service';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule,HomeComponent,TopvicitorsComponent,DashboardComponent],
  providers:[PeronDetailService,UpcomingService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  sideBar: boolean = false;
  title = 'relations';
  changeSideBar() {
    this.sideBar = !this.sideBar;
  }
  closeBar() {   
    this.sideBar = false;
  }
  closeBar1(event:Event) {
    event.preventDefault();
    this.sideBar = false;
  }
  constructor(private router: Router) {}
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); 
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
