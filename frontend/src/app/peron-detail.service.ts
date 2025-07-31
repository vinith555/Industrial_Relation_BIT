import { Injectable } from '@angular/core';
import { Visitor } from './detailInterface';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PeronDetailService {

  private apiUrl = 'http://localhost:3000/api/profiledetails'; 

  constructor(private http: HttpClient) {}

  getDet(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(this.apiUrl);
  }
  
  addVisi(visitor: Visitor): Observable<Visitor> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Visitor>(this.apiUrl, visitor, { headers });
  }

  updateVisi(visitor: Visitor, id: string): Observable<Visitor> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.put<Visitor>(url, visitor); 
  }

  deleteVisitor(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url);
}
}
