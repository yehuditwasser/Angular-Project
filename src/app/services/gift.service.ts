import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Gift } from '../models/gift.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Donor } from '../models/donor.model';
import { Category } from '../models/category';
import { AddDonation } from '../models/addDonation.model';
import { GiftRevenue } from '../models/giftRevenue';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor(private httpClient: HttpClient) { }
  private reloadGiftsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  reloadGifts$: Observable<boolean> = this.reloadGiftsSubject.asObservable();

  getGifts(): Observable<Gift[]> {
    const url = 'https://localhost:7243/api/Gift/GetAllGifts';
    // Get the token from local storage
    const token = localStorage.getItem('token');
    // Create the headers object and add the token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  
    // Pass the headers object as the second parameter in the get() method
    return this.httpClient.get<Gift[]>(url, { headers });
  }

  
  getGiftById(id: number) : Observable<Gift>{
    let url = 'https://localhost:7243/api/Gift/GetGiftById/' + id;
    // Get the token from local storage
    const token = localStorage.getItem('token'); 
    // Create the headers object and add the token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Gift>(url,{headers});
  }

  getDonorsByGiftId(id:number):Observable<Donor[]>{
  let url='https://localhost:7243/api/Gift/GetDonorsByGiftId/' + id;
   // Get the token from local storage
   const token = localStorage.getItem('token'); 
   // Create the headers object and add the token
   const headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', `Bearer ${token}`);
  
  return this.httpClient.get<Donor[]>(url,{headers})
}

updateGift(gift: Gift): Observable<boolean> {
  let url = 'https://localhost:7243/api/Gift/UpdateGift';
   // Get the token from local storage
   const token = localStorage.getItem('token'); 
   // Create the headers object and add the token
   const headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', `Bearer ${token}`);
  
  return this.httpClient.put<boolean>(url,gift,{headers});
}


addGift(gift: Gift): Observable<number> {
  let url = 'https://localhost:7243/api/Gift/AddNewGift';
   // Get the token from local storage
   const token = localStorage.getItem('token'); 
   // Create the headers object and add the token
   const headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Authorization', `Bearer ${token}`);
  
  return this.httpClient.post<number>(url,gift,{headers});
}

  deleteGift(id:number) :Observable<boolean> {
    let url = 'https://localhost:7243/api/Gift/DeleteGift/'+id;
     // Get the token from local storage
     const token = localStorage.getItem('token'); 
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);
    
    return this.httpClient.delete<boolean>(url,{headers})
  }

  getCategories():Observable<Category[]>{
    let url = 'https://localhost:7243/api/Gift/GetCategory';
     // Get the token from local storage
     const token = localStorage.getItem('token'); 
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);
    
    return this.httpClient.get<Category[]>(url,{headers})
}

  searchGiftByName(name:string):Observable<Gift[]>{
    let url = 'https://localhost:7243/api/Gift/SearchGiftByName/'+name;
    return this.httpClient.get<Gift[]>(url)
  }

  searchGiftByDonorname(name:string):Observable<Gift[]>{
    let url = 'https://localhost:7243/api/Gift/SearchGiftsByDonor/'+name;
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Gift[]>(url, {headers});
  }

  setReloadGift(){
    let flag = this.reloadGiftsSubject.value;
    this.reloadGiftsSubject.next(!flag);
  }
  getGiftsWithNoDonor():Observable<Gift[]>{
    let url ='https://localhost:7243/api/Gift/GetGiftsWithNoDonor';
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Gift[]>(url, {headers});
  }

  getGiftsWithNoDonorOrMoney():Observable<Gift[]>{
    let url ='https://localhost:7243/api/Gift/GetGiftsWithNoDonorOrMoneyDonor';
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Gift[]>(url, {headers});
  }

  addDonation(ad:AddDonation):Observable<number>{
    let url = 'https://localhost:7243/api/Donation/AddNewDonation';
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<number>(url,ad, {headers});
  }

  filterGiftByPrice(min: number, max: number): Observable<Gift[]> {
    debugger
    let url = 'https://localhost:7243/api/Gift/FilterGiftsByPrice';
    let params = new HttpParams()
      .set('minPrice', min.toString())
      .set('maxPrice', max.toString()); 
    return this.httpClient.get<Gift[]>(url, { params });
  }

  calculateGiftRevenue(): Observable<GiftRevenue>{
    let url = 'https://localhost:7243/api/Winner/CalculateGiftRevenue';
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
      return this.httpClient.get<GiftRevenue>(url,{headers});

  }
  
}

