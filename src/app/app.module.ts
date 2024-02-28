import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GiftListComponent } from './gift-list/gift-list.component';
import { GiftEditComponent } from './gift-edit/gift-edit.component';
import { SetBoolPipe } from './infrastructure/pipes/set-bool.pipe';
import { SetHebrewDatePipe } from './infrastructure/pipes/set-hebrew-date.pipe';
import { DonorsListComponent } from './donors-list/donors-list.component';
import { EditDonorComponent } from './edit-donor/edit-donor.component';
import { MenuComponent } from './menu/menu.component';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import {MenubarModule} from 'primeng/menubar';
import { BuyingComponent } from './buying/buying.component';
import {CardModule} from 'primeng/card';
import { LoginComponent } from './login/login.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { PurchasingManagementComponent } from './purchasing-management copy/purchasing-management.component';
import { TabViewModule } from 'primeng/tabview';
import { RaffleComponent } from './raffle/raffle.component';
import { MenuUserComponent } from './menu-user/menu-user.component';
import { ImageModule } from 'primeng/image';
import { MyCartComponent } from './my-cart/my-cart.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { InputMaskModule } from 'primeng/inputmask';
import { ShowCartComponent } from './show-cart/show-cart.component';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {SidebarModule} from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    GiftListComponent,
    GiftEditComponent,
    SetBoolPipe,
    SetHebrewDatePipe,
    DonorsListComponent,
    EditDonorComponent,
    MenuComponent,
    BuyingComponent,
    LoginComponent,
    PurchasingManagementComponent,
    RaffleComponent,
    MenuUserComponent,
    MyCartComponent,
    RegisterComponent,
    HomeComponent,
    ShowCartComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    MenuModule,
    TabMenuModule,
    MenubarModule,
    CardModule,
    DynamicDialogModule,
    ToastModule ,
    TabViewModule,
    ImageModule,
    ProgressSpinnerModule,
    GalleriaModule,
    CarouselModule,
    InputMaskModule,
    SidebarModule,
    SliderModule,
    MatIconModule,
    MatBadgeModule
    ],
  providers: [ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
