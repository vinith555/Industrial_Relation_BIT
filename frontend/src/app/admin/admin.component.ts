import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';
import { PeronDetailService } from '../peron-detail.service';
import { UpcomingService } from '../upcoming.service';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,HomeComponent],
  providers:[PeronDetailService,UpcomingService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
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
// hello this is a comment