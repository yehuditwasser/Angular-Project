import { PurchaseDetailsDTO } from "./purchaseDetailsDTO";
import { UserDTO } from "./userDTO";

export class PuarchaseDTO{
    id: number;
    userId: number;
    user: UserDTO;
    date: Date;
    purchaseDetails: PurchaseDetailsDTO[];
}