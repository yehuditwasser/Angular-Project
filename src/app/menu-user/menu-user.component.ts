
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css']
})
export class MenuUserComponent implements OnInit, OnChanges {
  constructor(private router: Router, private cartService: CartService) { }

  items!: MenuItem[];
  activeItem: any;
  scrollableItems: any;
  activeItem2: any;
  visibleCart: boolean = false;
  MyCart: Cart[] = [];
  b: boolean = false;
  total: number = 0;

  ngOnInit() {
    this.items = [
      {
        label: 'login',
        icon: 'pi pi-user-minus',
        name: "login" // uncomment and provide the correct route path
      },
      {
        label: 'home',
        icon: 'pi pi-home',
        name: "home" // uncomment and provide the correct route path
      },
      {
        label: 'buying',
        icon: 'pi pi-shopping-cart',
        name: "buying" // uncomment and provide the correct route path
      },
    ];
    this.cartService.myCart().subscribe(d => {
      this.MyCart = d;
      this.getTotalItem();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTotalItem();
  }

  getTotalItem() {
    this.total = this.MyCart.reduce((acc, item) => acc + item.quantity, 0);
  }

  changeRoute(item: any) {
    console.log(item.label);
    this.router.navigate([item.name]);
  }

  logOut() {
    localStorage.clear();
    this.showProgressSpinner();

    setTimeout(() => {
      this.b = false;
      this.router.navigate(['login']);
    }, 3000);
  }

  myCart() {
    this.router.navigate(["my-cart"])
  }

  showProgressSpinner() {
    this.b = true;
  }
}
