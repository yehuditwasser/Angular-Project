import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }
  private reloadCartsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadCarts$: Observable<boolean> = this.reloadCartsSubject.asObservable();

  setReloadCart(){
    let flag = this.reloadCartsSubject.value;
    this.reloadCartsSubject.next(!flag);
  }
  addToCart(giftId: number):Observable<boolean> {
    debugger
    let url="https://localhost:7243/api/Cart/AddToCart";
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
      return this.httpClient.post<boolean>(url,giftId,{headers})
  }



  myCart():Observable<Cart[]>{
    let url="https://localhost:7243/api/Cart/GetCart";
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Cart[]>(url,{headers})
  }


  reduce(id: number): Observable<boolean> {
    let url = "https://localhost:7243/api/Cart/Reduce";
     // Get the token from local storage
     const token = localStorage.getItem('token');
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<boolean>(url, id,{headers});
  }

  increas(id: number): Observable<boolean> {
    let url = "https://localhost:7243/api/Cart/Increas";
     // Get the token from local storage
     const token = localStorage.getItem('token');
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<boolean>(url, id,{headers});
  }
  pay(): Observable<boolean> {
    let url = "https://localhost:7243/api/Purchase/Actual_purchase";
    // Get the token from local storage
    const token = localStorage.getItem('token');
    // Create the headers object and add the token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    // Pass the headers as options in the post() method
    return this.httpClient.post<boolean>(url, {}, { headers: headers });
  }

  remove(giftId:number):Observable<boolean>{
    let url = "https://localhost:7243/api/Cart/removeFromCart/"+giftId;
      // Get the token from local storage
      const token = localStorage.getItem('token');
      // Create the headers object and add the token
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      // Pass the headers as options in the post() method
      return this.httpClient.delete<boolean>(url,{headers})
  }

  private totalSubject = new BehaviorSubject<number>(0);
  public total$ = this.totalSubject.asObservable();

  updateTotal(value: number) {
    debugger
    this.totalSubject.next(value);
    console.log(this.total$);
    
    
  }
  
}
