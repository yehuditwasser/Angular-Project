import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Gift } from '../models/gift.model';
import { GiftService } from '../services/gift.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Category } from '../models/category';
import swal from 'sweetalert';
@Component({
  selector: 'app-gift-edit',
  templateUrl: './gift-edit.component.html',
  styleUrls: ['./gift-edit.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class GiftEditComponent implements OnChanges {


  categories: Category[] = [];

  @Input()
  giftId: number = 0;

  gift: Gift = new Gift();

  submitted: boolean = false;

  @Input()
  giftDialog: boolean = true;

  @Output()
  giftDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  c:Category =new Category();   
  constructor(private giftService: GiftService, private messageService: MessageService) { }

  ngOnChanges(): void {
    if (this.giftId > 0) {
      this.giftService.getGiftById(this.giftId).subscribe(gift => this.gift = gift);
    }
    else {
      this.gift.cost = 8;
      this.gift = new Gift()
    }
    this.giftService.getCategories().subscribe(g => {this.categories =g ; console.log(this.categories)});
  }

  hideDialog() {
    this.giftDialog = false;
    this.giftDialogChange.emit(this.giftDialog);
    this.submitted = false;
  }
saveGift() {
  debugger
  if (this.giftId === 0) {
    this.c = this.categories.find(l => l.id == this.gift.category.id);
    this.gift.category = this.c;
    this.hideDialog();
    this.giftService.addGift(this.gift).subscribe(b=> {
          this.giftService.setReloadGift();
          swal("אישור","המתנה נוספה בהצלחה","success") 
          })
}
 
else{   
    if (this.giftId > 0) {
        this.giftService.updateGift(this.gift).subscribe(b => {   
        swal("אישור","המתנה התעדכנה בהצלחה","success") 
        this.giftService.setReloadGift();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Updated', life: 3000 });
      })
    }
    this.gift = new Gift();
    this.hideDialog()
  }

}

}