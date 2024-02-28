import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lowercase: boolean = false;
  uppercase: boolean = false;
  digits: boolean = false;


title = 'Yudit&Dassi';
 
role:string="";

constructor(private router:Router) {
}

ngOnInit(): void {
  const storedRole = localStorage.getItem("role"); 
  if (storedRole) { 
    this.role = storedRole; 
  } else {
    this.role="defalt"
  }
}

logOut(){
  localStorage.clear();
  this.router.navigate[("")]
}
 

  
}
