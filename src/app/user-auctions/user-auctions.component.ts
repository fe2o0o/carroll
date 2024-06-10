import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery'
@Component({
  selector: 'app-user-auctions',
  templateUrl: './user-auctions.component.html',
  styleUrls: ['./user-auctions.component.css']
})
export class UserAuctionsComponent implements OnInit{
  constructor(private _HttpClient:HttpClient){}
  myAuctions: any[];
  bidAuctionId: any;
  openSide: boolean = false;
  ngOnInit(): void {
    this._HttpClient.get('http://localhost:3000/api/v1/cars/userAuction', {
      headers: {
          token:`${localStorage.getItem('token')}`
        }
    }).subscribe({
      next: (res) => {
        this.myAuctions = res['data']
        console.log(this.myAuctions);

      }
    })
  }

  showRoomData:any

  getClassStatus(value:string):string {
    if (value == "accept") {
      return 'text-success'
    }
    else if (value == 'pending') {
      return 'text-warning'
    } else {

      return 'text-danger'
    }
  }


  showBiding(id: any) {
    this.bidAuctionId = id;
    this.openSide = true
  }

  toggleSlide(event) {
    this.openSide = event
  }

  showRoom(id: any) {
    $('.proccess').fadeIn(500, () => {
      $('body').addClass('overflow-hidden')
    })
    this._HttpClient.get(`http://localhost:3000/api/v1/cars/showroom/${id}`, {
      headers: {
        token:`${localStorage.getItem('token')}`
      }
    }).subscribe({
      next: (res:any) => {
        this.showRoomData = res.room;
      }
    })
  }

    hideOver() {
    $('.proccess').fadeToggle(500, () => {
      if ($('body').hasClass('overflow-hidden')) {
        $('body').removeClass('overflow-hidden')
      } else {
        $('body').addClass('overflow-hidden')
      }
    })
  }
}
