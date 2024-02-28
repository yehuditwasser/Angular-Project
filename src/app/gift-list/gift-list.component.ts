import { Component, OnInit } from '@angular/core';
import { Gift } from '../models/gift.model';
import { GiftService } from '../services/gift.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Donor } from '../models/donor.model';
import { GiftRevenue } from '../models/giftRevenue';
import { RaffelService } from '../services/raffel.service';
import { Winner } from '../models/winner';

@Component({
    selector: 'app-gift-list',
    templateUrl: './gift-list.component.html',
    styleUrls: ['./gift-list.component.css'],
    providers: [ConfirmationService, MessageService]
})
export class GiftListComponent implements OnInit {
    [x: string]: any;
    winners: Winner[] = [];

    giftDialog: boolean = false;

    gifts: Gift[] = [];

    gift: Gift = new Gift();

    selectedGifts!: Gift[];

    submitted!: boolean;

    donorList: Donor[] = []

    visible: boolean = false;
    visible1: boolean = false;
    visible3: boolean = false;

    value: string | undefined;

    value1: string | undefined;
    CalculateGiftRevenue: GiftRevenue = new GiftRevenue(); // Update the declaration
    constructor(public giftService: GiftService, private messageService: MessageService, private confirmationService: ConfirmationService, private raffelService: RaffelService) { }

    ngOnInit() {
        this.giftService.reloadGifts$.subscribe(x => {
            this.giftService.getGifts().subscribe(data => this.gifts = data);
        });
        this.giftService.calculateGiftRevenue().subscribe(d => {
            console.log(d);
            this.CalculateGiftRevenue = d;
            console.log(this.CalculateGiftRevenue);

        })
        this.raffelService.getWinners().subscribe(d => {
            this.winners = d; console.log(this.winners
            );
        })
    }
    getTotalAmount(): number {
        let total = 0;
        for (const gift of Object.values(this.CalculateGiftRevenue)) {
            total += gift;
        }
        return total;
    }
    openNew() {
        this.gift = new Gift();
        this.submitted = false;
        this.giftDialog = true;
    }
    showdoch() {
        this.visible1 = true;
    }


    showDialog(id: number) {

        // this.giftService.getDonorsByGiftId(id).subscribe(data => {
        //     this.donorsList = data;
        //     console.log(this.donorsList); // Move the console.log inside the subscribe callback     
        //   });
        this.giftService.getDonorsByGiftId(id).subscribe(data => {
            this.donorList = data;
            console.log(this.donorList); // Move the console.log inside the subscribe callback
            this.visible = true;
        });
    }

    editGift(gift: Gift) {
        this.gift = { ...gift };
        this.giftDialog = true;
    }


    deleteGift(gift1: Gift) {
        this.confirmationService.confirm({
            message: 'האם אתה בטוח שברצונך למחוק את המתנה  ' + gift1.name + '?',
            header: 'שים לב',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                debugger
                this.giftService.deleteGift(gift1.id).subscribe(() => {
                    this.giftService.setReloadGift();
                    this.gift = new Gift();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Deleted', life: 3000 });
                });
            }
        })
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
    searchByDonor() {
        if (this.value != "")
            this.giftService.searchGiftByDonorname(this.value1).subscribe(data => this.gifts = data)
        else
            this.giftService.getGifts().subscribe(data => this.gifts = data);
    }

    raffel(id: number) {
        this.raffelService.raffel(id).subscribe(f => {
            alert(f)
            location.reload();
        })
    }
    show() {
        this.visible3 = true;
    }

    sendEmail(email: string) {
        debugger
        this.raffelService.sendEmail(email).subscribe(
            d => {
                swal('עבודה טובה', ' המייל נשלח בהצלחה לכתובת' + email, 'success');
            }
        )
    }
}
