import { TypeOfDonation } from "./typeOfDonation";

export class Donor{
    id: number = 0;
    name: string ='';
    email:string="";
    picture:string="";
    typeOfDonation:TypeOfDonation;
}