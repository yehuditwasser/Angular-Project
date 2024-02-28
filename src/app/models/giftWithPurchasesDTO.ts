import { Category } from "./category";
import { PurchaseDetailsDTO } from "./purchaseDetailsDTO";

export class GiftWithPurchasesDTO{
    id: number;
    name: string;
    cost: number;
    picture: string;
    category: Category;
    purchases: PurchaseDetailsDTO[];
}