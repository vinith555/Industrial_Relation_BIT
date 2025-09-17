import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpcomingService {


private apiUrl = 'http://localhost:3000/api/visitors'; 

constructor(private http: HttpClient) {}


getUpcomingEv(): Observable<Array<{id: string; guestName: string; eventName: string; eventDate: string; }>> {
  return this.http.get<Array<{id: string; guestName: string; eventName: string; eventDate: string; }>>(this.apiUrl);
}

addEv(event: { guestName: string; eventName: string; eventDate: string }): Observable<any> {
  return this.http.post(this.apiUrl, event);
}

deleteEv(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

updateEv(id:string,event:{ guestName: string; eventName: string; eventDate: string }):Observable<any>{
  return this.http.put(`${this.apiUrl}/${id}`,event);
}

}
