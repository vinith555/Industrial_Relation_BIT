import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpcomingService {


private apiUrl = 'http://localhost:3000/visitors'; 

constructor(private http: HttpClient) {}


getUpcomingEv(): Observable<Array<{ guestName: string; eventName: string; date: string; _id?: string }>> {
  return this.http.get<Array<{ guestName: string; eventName: string; date: string; _id?: string }>>(this.apiUrl);
}

addEv(event: { guestName: string; eventName: string; date: string }): Observable<any> {
  return this.http.post(this.apiUrl, event);
}

deleteEv(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}
