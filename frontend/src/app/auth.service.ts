import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private apiUrluser = 'http://localhost:3000/api/user';
  constructor(private http:HttpClient,private router:Router) { 
  }
  registerUser(data:{name:string,email:string,password:string,role:string}){
    return this.http.post(`${this.apiUrluser}/register`,data);
  }

  loginUser(data:{email:string,password:string}):Observable<{success:boolean,role:string}>{
    return this.http.post<{success:boolean,role:string}>(`${this.apiUrluser}/login`,data);
  }
}
