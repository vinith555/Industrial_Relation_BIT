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
  
  addVisi(formData: FormData): Observable<Visitor> {
    return this.http.post<Visitor>(this.apiUrl, formData);
  }

  updateVisi(data: FormData , id: string): Observable<Visitor> {
    return this.http.put<Visitor>(`${this.apiUrl}/${id}`, data); 
  }

  deleteVisitor(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url);
}
}
