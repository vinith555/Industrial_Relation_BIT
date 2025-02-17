import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  email:string = '';
  confirmpassword:string = '';

  constructor(private router: Router) {}

  onLogin() {
    const validAdmin = { username: 'admin', password: 'password123' };
    const validUser = { username: 'user', password: 'user123' };

    if (this.username === validAdmin.username && this.password === validAdmin.password) {
      localStorage.setItem('user', JSON.stringify({ username: this.username, role: 'admin' }));
      this.router.navigate(['/admin/home']); 
    } else if (this.username === validUser.username && this.password === validUser.password) {
      localStorage.setItem('user', JSON.stringify({ username: this.username, role: 'user' }));
      this.router.navigate(['/user/home']); 
    } else {
      alert('Invalid username or password');
    }
  }
  toggle:boolean = true;
  tbetween(){
    this.toggle = !this.toggle;
  }
  onregiter(){
    this.toggle = !this.toggle;
  }
}
