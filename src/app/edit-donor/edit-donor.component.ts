import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Donor } from '../models/donor.model';
import { DonorsService } from '../services/donors.service';
import { TypeOfDonation } from '../models/typeOfDonation';



@Component({
  selector: 'app-edit-donor',
  templateUrl: './edit-donor.component.html',
  styleUrls: ['./edit-donor.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EditDonorComponent implements OnChanges,OnInit{
  @Input()
  donorId: number = 0;

  donor: Donor = new Donor();

  types:TypeOfDonation[]=[];
  constructor(private donorService: DonorsService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.donorService.getTypeOfDonation().subscribe(d=>this.types=d)
  }
  ngOnChanges(): void {
    if(this.donorId>0)
      {
        this.donorService.getDonorById(this.donorId).subscribe(data => this.donor=data);
      }
    else{
      this.donor=new Donor()
    }
  }

  submitted: boolean = false;
  @Input()
  donorDialog: boolean = true;

  @Output()
  donorDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  hideDialog() {
    this.donorDialog = false;
    this.donorDialogChange.emit(this.donorDialog);
    this.submitted = false;
  }

saveDonor() {
    if (this.donorId>0) {
      this.donorService.updateDonor(this.donor).subscribe(b => {
        this.donorService.setReloadDonor();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donor Updated', life: 3000 });
      });
    }
    else
      {             
        this.donorService.addDonor(this.donor).subscribe(a => {    
        this.donorService.setReloadDonor();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donor Created', life: 3000 });
      });
    }
    this.donor= new Donor();
    this.hideDialog()
  }
}