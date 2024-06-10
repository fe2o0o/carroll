import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SellComponent } from './sell/sell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuctionsComponent } from './auctions/auctions.component';
import { UserAuctionsComponent } from './user-auctions/user-auctions.component';
import { SpacificAuctionComponent } from './spacific-auction/spacific-auction.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BindingComponent } from './user-auctions/binding/binding.component';
import { UserBidingComponent } from './user-biding/user-biding.component';
import { RegisterComponent } from './register/register.component';
import { Step1Component } from './register/step-1/step-1.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    SellComponent,
    AuctionsComponent,
    UserAuctionsComponent,
    SpacificAuctionComponent,
    BindingComponent,
    UserBidingComponent,
    RegisterComponent,
    Step1Component,
    LoginComponent,
    AboutComponent,
    ContactusComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
