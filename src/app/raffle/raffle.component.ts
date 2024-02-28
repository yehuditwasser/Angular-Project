import { Component, OnInit } from '@angular/core';
import { GiftService } from '../services/gift.service';
import { Gift } from '../models/gift.model';
import { RaffelService } from '../services/raffel.service';
import { Winner } from '../models/winner';

@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrls: ['./raffle.component.css']
})
export class RaffleComponent implements OnInit {

  constructor(private giftService: GiftService, private raffelService: RaffelService) { }
  gifts: Gift[] = [];

  visible1: boolean = false;

  winners: Winner[] = [];
  ngOnInit(): void {
    this.giftService.getGifts().subscribe(data => this.gifts = data)
    this.raffelService.getWinners().subscribe(d => {
      this.winners = d; console.log(this.winners
      );
    })
  }


  raffel(id: number) {
    this.raffelService.raffel(id).subscribe(f => 
      {
        alert(f)
        location.reload();
      })
  }

  show() {
    this.visible1 = true;
  }
  sendEmail(email:string){
    debugger
    this.raffelService.sendEmail(email).subscribe(d => console.log("juhy")
    )
  }
}
