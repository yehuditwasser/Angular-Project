import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftListComponent } from './gift-list/gift-list.component';
import { DonorsListComponent } from './donors-list/donors-list.component';
import { BuyingComponent } from './buying/buying.component';
import { LoginComponent } from './login/login.component';
import { PurchasingManagementComponent } from './purchasing-management copy/purchasing-management.component';
import { RaffleComponent } from './raffle/raffle.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';


  const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'gifts', component:GiftListComponent},
    {path:"donors",component:DonorsListComponent},
    {path:"buying",component:BuyingComponent},
    {path:"login",component:LoginComponent},
    {path:"purchases",component:PurchasingManagementComponent},
    {path:"raffle",component:RaffleComponent},
    {path:"my-cart",component:MyCartComponent},
    {path:"register",component:RegisterComponent},
    {path:"home",component:HomeComponent},
 

  ];
   

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
