import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  toggle: boolean = true;
  email:string = '';
  confirmpassword:string = '';
  loading:boolean = false;
  constructor(private router: Router,private auth:AuthService) {}

  ngOnInit(): void {
  }
  onLogin() {
    this.loading = true;
    this.auth.loginUser({email:this.email,password:this.password}).subscribe((data)=>{
      localStorage.setItem('isLoggedIn', JSON.stringify(data.success));
      localStorage.setItem('role', data.role);
      if (data.role === 'admin') {
        this.router.navigate(['/admin/home']);
      } else {
        this.router.navigate(['/user/home']);
      }
    },(err)=>{
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      console.log(err);
    });
    this.loading = false;
  }
  tbetween(){
    this.toggle = !this.toggle;
  }
  onregiter(){
    this.auth.registerUser({name:this.username,email:this.email,password:this.password,role:"user"}).subscribe(
      (data)=>{console.log(data);
      },(err)=>{console.log(err);
      }
    );
    this.tbetween();
  }

}
