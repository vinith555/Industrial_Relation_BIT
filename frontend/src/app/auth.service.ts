import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private apiUrluser = 'http://localhost:3000/logindetails';
  EmailName:string = '';
  passWord:string = '';
  userExist:boolean = false;
  userArray:{email:string,pass:string,username:string}[] = [];
  constructor(private http:HttpClient,private router:Router) { 
   }
  getUser(){
    return this.http.get<Array<{ email: string; pass: string; username: string }>>(this.apiUrluser);
  }
  checkForUser(email: string, pass: string) {
    this.getUser().subscribe((data) => {
      this.userArray = data;
      const user = this.userArray.find((value) => value.email === email && value.pass === pass);  
      if (user) {
        this.userExist = true;
        localStorage.setItem('user', JSON.stringify(user));
        if(email === 'admin@gmail.com' && pass === '5114'){  
        this.router.navigate(['admin','home']);  }
        else{
          this.router.navigate(['user','home']);
        }
        // console.log(this.userArray);
        
      } else {
        this.userExist = false;
        alert("Invalid credentials!");
      }
    });
  }
  registerUser(value:{ email: string; pass: string; username: string }){
    this.http.post(this.apiUrluser,value).subscribe(data=>{console.log(data);},error=>{alert(error.error.message)});
  }
}
