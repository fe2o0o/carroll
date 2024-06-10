import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-spacific-auction',
  templateUrl: './spacific-auction.component.html',
  styleUrls: ['./spacific-auction.component.css']
})
export class SpacificAuctionComponent implements OnInit {
  constructor(private _ToastrService:ToastrService,private _AuthService:AuthService,private _ActivatedRoute:ActivatedRoute , private _HttpClient:HttpClient){}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  auctionId: any;
  currentAuction: any;
  last_bid: number = 0;
  ngOnInit(): void {
    if (this._AuthService.isLoggin.getValue() == null) {
      $('.overlay').addClass('show').removeClass('hide')
    }
    this._ActivatedRoute.params.subscribe({
      next: (res) => {
        this.auctionId = res['id']
      }
    })

    this.getCurrentAuction()

  }
  bidForm: FormGroup = new FormGroup({
    price:new FormControl(this.last_bid , [Validators.required,Validators.min(Number(this.last_bid))])
  })

  getCurrentAuction() {
    this._HttpClient.get(`http://localhost:3000/api/v1/cars/spacific-auction/${this.auctionId}`).subscribe({
      next: (res: any) => {
        this.currentAuction = res.data[0];
        this.last_bid = Number(this.currentAuction.last_bid)
        console.log(this.last_bid);

      }
    })
  }

  addBid(form: FormGroup):any {
    let data = form.value;

    if (data.price <= this.last_bid) {
      return this._ToastrService.error(`Your Bid Must Be Greater Than ${this.last_bid} EGP `)
    } else {

      data.auctionId = this.auctionId;
      this._HttpClient.post('http://localhost:3000/api/v1/cars/bidAuction', data,{headers:{token:`${localStorage.getItem('token')}`}}).subscribe({
        next: (res) => {
          console.log(res);

          this._ToastrService.success("Your Bid Is Added", "Success");
          this.getCurrentAuction()
        },
        error: (err) => {
          this._ToastrService.error(`${err.error.message}` , "Faild")
        }
      })
    }
  }

   toggleOverLay() {
    $('.overlay').addClass('hide').removeClass('show')
  }

}
