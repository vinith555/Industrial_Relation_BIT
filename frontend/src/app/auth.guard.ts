import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) { 
    const stored = localStorage.getItem('isLoggedIn');
    const isLoggedIn = stored ? JSON.parse(stored) : false;
    const role = localStorage.getItem('role');
    const expectedRole = route.data['role'] as string;

    if (isLoggedIn && role === expectedRole) {
      return true; 
    }
    this.router.navigate(['/login']);
    return false;
   }

}
