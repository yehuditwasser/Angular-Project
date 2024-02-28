import { Gift } from "./gift.model";
import { UserDTO } from "./userDTO";

export class Winner{
    id: number;
    userId: number;
    giftId: number;
    user: UserDTO;
    Gift: Gift;
}