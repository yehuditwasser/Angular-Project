import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Puarchase } from '../models/puarchase';
import { PuarchaseDTO } from '../models/puarchaseDTO';
import { GiftWithPurchasesDTO } from '../models/giftWithPurchasesDTO';
import {  UserDTO } from '../models/userDTO';
// import { GiftWithPurchasesDTO } from '../models/GiftWithPurchasesDTO';


@Injectable({
  providedIn: 'root'
})
export class PurchasingManagementService {

  constructor(private httpClient: HttpClient) { }
  private reloadPurchasingManagementSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  reloadGifts$: Observable<boolean> = this.reloadPurchasingManagementSubject.asObservable();

  
getAllPurchases():Observable<PuarchaseDTO[]>{
  let url="https://localhost:7243/api/Purchase/GetPurchases";
   // Get the token from local storage
   const token = localStorage.getItem('token'); 
   // Create the headers object and add the token
   const headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', `Bearer ${token}`);
  
  return this.httpClient.get<PuarchaseDTO[]>(url,{headers});
}

getGiftsWithPurchases():Observable<GiftWithPurchasesDTO[]>{
  let url="https://localhost:7243/api/Purchase/GetGiftsWithPurchases";
   // Get the token from local storage
   const token = localStorage.getItem('token'); 
   // Create the headers object and add the token
   const headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', `Bearer ${token}`);
  
  return this.httpClient.get<GiftWithPurchasesDTO[]>(url,{headers});
}





getUsers():Observable<UserDTO[]>{
  let url="https://localhost:7243/api/Purchase/GetUsersWithPurchase";
   // Get the token from local storage
   const token = localStorage.getItem('token'); 
   // Create the headers object and add the token
   const headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', `Bearer ${token}`);
  
  return this.httpClient.get<UserDTO[]>(url,{headers});
}

}
