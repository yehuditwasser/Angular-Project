import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {TabMenuModule} from 'primeng/tabmenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  
constructor(private router: Router) { }

items: MenuItem[]; 
activeItem: any;
scrollableItems: any;
activeItem2: any;
b: boolean = false;

    ngOnInit() {
      this.items = [
        {
          label:'ניהול מתנות',
          icon:'pi pi-gift',
          name:"gifts"
        },
        {
          label:'כניסה',
          icon:'pi pi-user-minus',
          name:"login"
        },
        {
          label:'ניהול תורמים',
          icon:'pi pi-users',
          name:"donors"
        },
        {
          label:'דף הבית',
          icon:'pi pi-home',
          name:"home"
        },
        {
          label:'ניהול רכישות',
          icon:'pi pi-shopping-cart',
          name:"purchases"
        },
        {
          label:'הגרלה',
          icon:'pi pi-spinner',
          name:"raffle"
        } 
      ];
  }
  
  changeRoute(item: any) {
    this.router.navigate([item.name]);
  }
  logOut() {
    localStorage.clear();
    this.showProgressSpinner();

    setTimeout(() => {
      this.b = false;      
      location.reload();
      this.router.navigate(["buying"]);

    }, 3000);
  }
  showProgressSpinner() {
    this.b = true;
  }
}
