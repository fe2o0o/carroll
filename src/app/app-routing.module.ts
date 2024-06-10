import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellComponent } from './sell/sell.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { UserAuctionsComponent } from './user-auctions/user-auctions.component';
import { SpacificAuctionComponent } from './spacific-auction/spacific-auction.component';
import { UserBidingComponent } from './user-biding/user-biding.component';
import { RegisterComponent } from './register/register.component';
import { Step1Component } from './register/step-1/step-1.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "privacy", component: PrivacyComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactusComponent },
  { path: "sell", component: SellComponent },
  {path:"auctions" , component:AuctionsComponent},
  { path: "userAuction", component: UserAuctionsComponent },
  { path: "spacificAuction/:id", component: SpacificAuctionComponent },
  { path: "userBidding", component: UserBidingComponent },
  {
    path: 'register', component: RegisterComponent,
    children: [
      { path: '', redirectTo: 'step-1', pathMatch:"full" },
      {path:'step-1' , component:Step1Component}
    ]
  },
  {path:"login" , component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
