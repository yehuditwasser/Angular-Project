import { Component } from '@angular/core';
import { Donor } from '../models/donor.model';
import { DonorsService } from '../services/donors.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TypeOfDonation } from '../models/typeOfDonation';
import { Gift } from '../models/gift.model';
import { AddDonation } from '../models/addDonation.model';
import { GiftService } from '../services/gift.service';

@Component({
  selector: 'app-donors-list',
  templateUrl: './donors-list.component.html',
  styleUrls: ['./donors-list.component.css'],
  providers: [ConfirmationService, MessageService]
})

export class DonorsListComponent {
  donorDialog: boolean = false;

  donors: Donor[] = [];

  donor: Donor = new Donor();

  selectedDonors!: Donor[];

  submitted!: boolean;

  giftList: Gift[] = [];
  gift: Gift = new Gift();
  visible: boolean = false;

  visible1: boolean = false;

  value!: string;
  value2!: string;

  giftWithNoDonor: Gift[] = []
  donorD: Donor = new Donor()
  ad: AddDonation = new AddDonation();
  constructor(public donorService: DonorsService, public giftService: GiftService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  search() {
    if (this.value != "")
      this.donorService.searchDonorByEmailOrName(this.value).subscribe(data => this.donors = data)
    else
      this.donorService.getDonors().subscribe(data => this.donors = data);
  }
  search2() {
    if (this.value2 != "")
      this.donorService.searchDonorByGiftName(this.value2).subscribe(data => {this.donors = data; console.log(data);
      })
    else
      this.donorService.getDonors().subscribe(data => this.donors = data);
  }
  ngOnInit() {
    this.donorService.reloadDonors$.subscribe(x => {
      this.donorService.getDonors().subscribe(data => this.donors = data);
    });
  }
  showDialog(donor: Donor) {
    this.donorService.getGiftsByDonor(donor.id).subscribe(data => {
      this.giftList = data;
      console.log(this.giftList);
    })
    this.visible = true;
    this.donorD = donor
  }
  showDialog2() {
    if (this.donorD.typeOfDonation.name == 'כסף')
      this.giftService.getGiftsWithNoDonorOrMoney().subscribe(data => this.giftWithNoDonor = data)
    else
      this.giftService.getGiftsWithNoDonor().subscribe(data => this.giftWithNoDonor = data)
    this.visible1 = true
  }
  openNew() {
    this.donor = new Donor();
    this.submitted = false;
    this.donorDialog = true;
  }
  deleteSelectedDonors() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Donors?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.donors = this.donors.filter(val => !this.selectedDonors.includes(val));
        this.selectedDonors = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donors Deleted', life: 3000 });
      }
    });
  }

  editDonor(donor: Donor) {
    this.donor = { ...donor };
    this.donorDialog = true;
  }

  deleteDonor(donor: Donor) {
    this.confirmationService.confirm({
      message: 'האם אתה בטוח שברצונך למחוק את התורם  ' +  donor.name + '?',
      header: 'שים לב',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.donorService.deleteDonor(donor.id).subscribe(() => {
          this.donorService.setReloadDonor();
          this.donor = new Donor();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donor Deleted', life: 3000 });
        });
      }
    });
  }

  addDonation(giftId1: number, donorId1: number) {
    debugger
    this.ad.donorId = donorId1
    this.ad.giftId = giftId1
    this.visible = false;
    this.visible1 = false;

    this.giftService.addDonation(this.ad).subscribe(d => swal("תודה רבה!", "!התרומה נוספה בהצלחה", "success"))
  }
  // deleteGift(gift: Gift) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ' + gift.name + '?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.giftService.deleteGift(gift.id).subscribe(() => {
  //         this.giftService.setReloadGift();
  //         this.gift = new Gift();
  //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Deleted', life: 3000 });
  //       })
  //     }
  //   });
  // }

}
