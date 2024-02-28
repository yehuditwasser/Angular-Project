import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import swal from 'sweetalert';
import { PrimeIcons } from 'primeng/api';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router) { }

  myCart: Cart[] = [];
  total1: number = 0;

  frmPay: FormGroup = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.cartService.myCart().subscribe(d => {
      this.myCart = d; console.log(this.myCart);
      this.getTotalItems(this.myCart)
      const shekelSymbol = '\u20AA';
      console.log(shekelSymbol);
    })
  }

  getTotalItems(myCart: any[]) {
    this.total1 = myCart.reduce((acc, item) => acc + item.gift.cost * item.quantity, 0);
  }

  reduce(id: number) {
    this.cartService.reduce(id).subscribe(f => {
      this.cartService.myCart().subscribe(updatedCart => {
        this.myCart = updatedCart;
        this.getTotalItems(this.myCart)

      });
    });
  }

  increas(id: number) {
    this.cartService.increas(id).subscribe(() => {
      this.cartService.myCart().subscribe(updatedCart => {
        this.myCart = updatedCart;
        this.getTotalItems(this.myCart)

      });
    });
  }

  pay() {
    if (this.myCart.length == 0) {
      swal("הסל שלך ריק ואין באפשרותך לבצע רכישה כרגע").then
      this.router.navigate(["buying"])
      return;
    }
    this.cartService.pay().subscribe(data => {
      swal("התשלום בוצע בהצלחה", "הקבלה תשלח למייל שסיפקת במילוי הפרטים האישיים", "success");
      this.cartService.myCart().subscribe(d => {
        this.myCart = d;
        this.getTotalItems(this.myCart)
      })
    }
    )
  }

  remove(id: number) {
    this.cartService.remove(id).subscribe(data => {
      swal('הוסר', "המוצר נמחק מהעגלה שלך", 'success')
      this.cartService.myCart().subscribe(d => {
        this.myCart = d;
        this.getTotalItems(this.myCart)
      })
    })
  }
}
