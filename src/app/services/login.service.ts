import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/UserLogin';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/LoginResponse';
import { UserRegister } from '../models/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  private reloadLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadLogin$: Observable<boolean> = this.reloadLoginSubject.asObservable();

  login(user: UserLogin): Observable<LoginResponse> {
    let url = "https://localhost:7243/api/Authenticate/login";
    return this.httpClient.post<LoginResponse>(url, user);
  }

  register(user:UserRegister): Observable<any>{
    let url="https://localhost:7243/api/Authenticate/register";
    return this.httpClient.post<any>(url,user)
  }
  setReloadGift() {
    let flag = this.reloadLoginSubject.value;
    this.reloadLoginSubject.next(!flag);
  }
}
