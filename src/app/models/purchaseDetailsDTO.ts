import { Gift } from "./gift.model";

export class PurchaseDetailsDTO{
    id?: number;
    giftId: number;
    quantity?: number;
    gift: Gift;
}
