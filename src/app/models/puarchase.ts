import { PurchaseDetails } from "./purchaseDetails";

export class Puarchase{
    id:number;
    userId:number;
    dateTime:Date;
    PurchaseDetails: PurchaseDetails[] = [];
}

