import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Donor } from '../models/donor.model';
import { TypeOfDonation } from '../models/typeOfDonation';
import { Gift } from '../models/gift.model';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {

  constructor(private httpClient: HttpClient) { }
  private reloadDonorsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadDonors$: Observable<boolean> = this.reloadDonorsSubject.asObservable();
 

  getDonors(): Observable<Donor[]>{//
    let url = 'https://localhost:7243/api/Donor/GetAllDonors';
     // Get the token from local storage
     const token = localStorage.getItem('token'); 
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);
    
    return this.httpClient.get<Donor[]>(url,{headers});
  }

  getDonorById(id:number):Observable<Donor>{//
    let url='https://localhost:7243/api/Donor/GetDonorById/'+id;
     // Get the token from local storage
     const token = localStorage.getItem('token'); 
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Donor>(url,{headers})
  }


  updateDonor(donor: Donor) :Observable<boolean>{//
      let url = "https://localhost:7243/api/Donor/UpdateDonor";
       // Get the token from local storage
    const token = localStorage.getItem('token'); 
    // Create the headers object and add the token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
      return this.httpClient.put<boolean>(url,donor,{headers})
    }


  addDonor(donor: Donor) :Observable<number> {//
    let url = 'https://localhost:7243/api/Donor/addNewDonor';
     // Get the token from local storage
     const token = localStorage.getItem('token'); 
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);
    return this.httpClient.post<number>(url, donor,{headers})
  }

  setReloadDonor(){//
    let flag = this.reloadDonorsSubject.value;
    this.reloadDonorsSubject.next(!flag);
  }

  deleteDonor(id:number) :Observable<boolean> {//
    let url = 'https://localhost:7243/api/Donor/DeleteDonor/'+id;
     // Get the token from local storage
     const token = localStorage.getItem('token'); 
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<boolean>(url,{headers})
  }

  getTypeOfDonation():Observable<TypeOfDonation[]>{//
    let url='https://localhost:7243/api/Donor/GetTypeOfDonation';
     // Get the token from local storage
     const token = localStorage.getItem('token'); 
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);  
    return this.httpClient.get<TypeOfDonation[]>(url,{headers})
  }


  searchDonorByEmailOrName(name:string):Observable<Donor[]>{//
    let url="https://localhost:7243/api/Donor/searchByName/"+name;
     // Get the token from local storage
     const token = localStorage.getItem('token'); 
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Donor[]>(url,{headers})
  }


  searchDonorByGiftName(name:string):Observable<Donor[]>{//
    let url="https://localhost:7243/api/Donor/SearchDonorsByGift/"+name;
     // Get the token from local storage
     const token = localStorage.getItem('token'); 
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);
    
    return this.httpClient.get<Donor[]>(url,{headers})
  }


  getGiftsByDonor(id:number):Observable<Gift[]>{
    let url="https://localhost:7243/api/Donor/GetAllGiftByDonorId/"+id;
     // Get the token from local storage
     const token = localStorage.getItem('token'); 
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Gift[]>(url,{headers})
  }

  getGiftWithNotDonor():Observable<Gift[]>{
    let url='https://localhost:7243/api/Gift/GetGiftsWithNoDonor';
     // Get the token from local storage
     const token = localStorage.getItem('token'); 
     // Create the headers object and add the token
     const headers = new HttpHeaders()
       .set('Content-Type', 'application/json')
       .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Gift[]>(url,{headers});
  }
  } 



