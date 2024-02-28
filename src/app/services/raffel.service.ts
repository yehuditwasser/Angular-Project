import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Winner } from '../models/winner';

@Injectable({
  providedIn: 'root'
})
export class RaffelService {

  constructor(private httpClient: HttpClient) { }
  private reloadRaffel: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  reloadGifts$: Observable<boolean> = this.reloadRaffel.asObservable();

  raffel(id: number): Observable<boolean> {
    let url = "https://localhost:7243/api/Winner/Raffle";
    // Get the token from local storage
    const token = localStorage.getItem('token');
    // Create the headers object and add the token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<boolean>(url, id, { headers })
  }

  getWinners(): Observable<Winner[]> {
    let url = "https://localhost:7243/api/Winner/GetWinners";
    // Get the token from local storage
    const token = localStorage.getItem('token');
    // Create the headers object and add the token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<Winner[]>(url, { headers })
  }

  sendEmail(emailTo: string): Observable<void> {
    debugger;
    let url = 'https://localhost:7243/api/Winner/SendEmail';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<void>(url, JSON.stringify(emailTo), { headers });
  }
}
