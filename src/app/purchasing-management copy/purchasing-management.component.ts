import { Component } from '@angular/core';
import { PurchasingManagementService } from '../services/purchasing-management.service';
import { PuarchaseDTO } from '../models/puarchaseDTO';
import { PurchaseDetailsDTO } from '../models/purchaseDetailsDTO';

import { UserDTO } from '../models/userDTO';
import { GiftWithPurchasesDTO } from '../models/giftWithPurchasesDTO';

@Component({
  selector: 'app-purchasing-management',
  templateUrl: './purchasing-management.component.html',
  styleUrls: ['./purchasing-management.component.css']
})
export class PurchasingManagementComponent {
 
  purchases: PuarchaseDTO[] = [];
  purchasesDetails: PurchaseDetailsDTO[] = [];

  gifts: GiftWithPurchasesDTO[] = [];
  giftDetails: PurchaseDetailsDTO[]=[];

  users: UserDTO[]=[]
  visible: boolean = false;

  visible1: boolean = false;

  constructor(private purchaseService: PurchasingManagementService) { }

  ngOnInit() {
    this.purchaseService.getAllPurchases().subscribe(d => {
      this.purchases = d;
    });
    this.purchaseService.getGiftsWithPurchases().subscribe(d =>{
      this.gifts=d;
    })
    this.purchaseService.getUsers().subscribe(d =>{
      this.users=d;
    })
  }

  showDialog(p: PurchaseDetailsDTO[]) {
    this.purchasesDetails = p
    this.visible = true;
  }
  showDialog2(s: PurchaseDetailsDTO[]) {
    this.giftDetails=s;
    this.visible1 = true;
  }
}
