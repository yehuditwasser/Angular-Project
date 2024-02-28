import { Category } from "./category";

export class Gift{
    id: number = 0;
    name: string ='';
    cost: number = 10;
    picture:string='';
    category: Category;
    raffled:boolean=false;
}