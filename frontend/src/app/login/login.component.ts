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
    this.auth.checkForUser(this.email,this.password);
    this.loading = false;
  }

  tbetween(){
    this.toggle = !this.toggle;
  }
  onregiter(){
    if(this.password === this.confirmpassword){
      console.log(this.username + this.password + this.confirmpassword);
      this.auth.registerUser({email:this.email,pass:this.password,username:this.username});
      this.toggle = !this.toggle;
    }else{
      alert("Invalid password!")
    }
  }

}
