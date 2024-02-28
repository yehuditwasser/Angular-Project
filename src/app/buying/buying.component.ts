import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Gift } from '../models/gift.model';

import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { GiftService } from '../services/gift.service';
import { Cart } from '../models/cart';
import { Winner } from '../models/winner';
import { RaffelService } from '../services/raffel.service';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css']
})
export class BuyingComponent implements OnInit, OnChanges {
  constructor(private router: Router, public giftService: GiftService, private cartService: CartService, private raffelService: RaffelService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.raffelService.getWinners().subscribe(d => {this.winners = d; console.log(d);
    })
  }

  winners: Winner[] = [];
  gifts: Gift[] = [];
  filteredGifts: Gift[] = [];
  minPrice: number = 0;
  maxPrice: number = 100;
  selectedGiftIndex: number = -1;
  b: boolean = false;
  showcart: boolean = false
  isHeartClicked: boolean = false;
  sidebarVisible: boolean = false;
  cartList: Cart[] = []

  value!: string;
  value2!: string;
  rangeValues: number[] = [0, 100];

  filterGifts() {
    console.log(this.rangeValues)
    debugger
    this.giftService.filterGiftByPrice(this.rangeValues[0], this.rangeValues[1])
      .subscribe(filteredGifts => {
        this.gifts = filteredGifts;
        console.log(filteredGifts);

      });
  }
  toggleHeartColor(index: any) {
    this.selectedGiftIndex = index;
  }

  role: string = "";

  ngOnInit() {
    this.giftService.reloadGifts$.subscribe(x => {
      this.giftService.getGifts().subscribe(data => {
        this.gifts = data
        console.log(data);
      });
    });
    this.cartService.myCart().subscribe(d => {
      this.cartList = d
    })
    this.raffelService.getWinners().subscribe(data=>{this.winners=data;console.log(data);
    })
    const storedRole = localStorage.getItem("role");

    if (storedRole) {
      this.role = storedRole;
    } else {
      this.role = "default";
    }
  }
  search() {
    if (this.value != "")
      this.giftService.searchGiftByName(this.value).subscribe(data => this.gifts = data)
    else
      this.giftService.getGifts().subscribe(data => this.gifts = data);

  }
  search2() {
    if (this.value2 != "")
      this.giftService.searchGiftByDonorname(this.value2).subscribe(data => {
        this.gifts = data; console.log(data);
      })
    else
      this.giftService.getGifts().subscribe(data => this.gifts = data);

  }

  addToCart(x: Gift) {
    debugger;
  
    this.sidebarVisible = true;
    let token = localStorage.getItem('token');
    if (token == null) {
      // Show spinner progress for 3 seconds
      this.showProgressSpinner();
  
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 3000);
    } else {
      this.cartService.addToCart(x.id).subscribe((d) => {
        swal('עבודה טובה', 'המוצר נוסף לסל בהצלחה', 'success');
        setTimeout(() => {
          location.reload();
        }, 2000); // Delay for 2 seconds before reloading the page
      });
    }
  }
  showProgressSpinner() {
    this.b = true
  }
  showWinner(id:number){
    const winner = this.winners.find(w => w.giftId === id); // Find the winner with matching gift id
    if (winner) {
      console.log(winner);
      swal('הזוכה המאושר', winner.user.name);
    } else {
      console.log('Winner not found');
      swal('Error', 'הזוכה אינו נמצאvb', 'error');
    }
  }
}