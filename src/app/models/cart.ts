import { Gift } from "./gift.model";

export class Cart{
id:number=0;
giftId:number;
userId:string;
quantity:number=0;
gift:Gift=new Gift();
}
