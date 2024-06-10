import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery'
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-biding',
  templateUrl: './user-biding.component.html',
  styleUrls: ['./user-biding.component.css']
})
export class UserBidingComponent implements OnInit {
  constructor(private _HttpClient:HttpClient){}
   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
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


  myBindingAuction: any;
  showroomId: any;
  showRoomData: any;
  ngOnInit(): void {
    this.getUserBid()
  }

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

  getUserBid() {
        this._HttpClient.get('http://localhost:3000/api/v1/cars/userBid', {
      headers: {
          token:`${localStorage.getItem('token')}`
        }
    }).subscribe({
      next: (res) => {
        this.myBindingAuction = res['data']
        }
      })
  }

  showCard(id: any) {
    this.showroomId=id
    $('.proccess').fadeToggle(500, () => {
      if ($('body').hasClass('overflow-hidden')) {
        $('body').removeClass('overflow-hidden')
      } else {
        $('body').addClass('overflow-hidden')
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

  getShowRoom() {
    this._HttpClient.get(`http://localhost:3000/api/v1/cars/showroom/${this.showroomId}`, {
      headers: {
        token:`${localStorage.getItem('token')}`
      }
    }).subscribe({
      next: (res:any) => {
        console.log(res);

        this.showRoomData = res.room;

        $('.cardinfo').fadeOut(500, () => {
          $('.showRoomInfo').fadeIn(500)
        })
      }
    })
  }

  pickUp() {
    $('.showRoomInfo').fadeOut(500, () => {
      $('.pickUp').fadeIn(500)
    })
  }

  fadeBack() {
      $('.pickUp').fadeOut(500, () => {
      $('.feedback').fadeIn(500)
    })
  }

  cardForm: FormGroup = new FormGroup({
    cardnumber:new FormControl(null,Validators.required),
    expireDate:new FormControl(null,Validators.required),
    cvv:new FormControl(null,Validators.required),
  })


  feedbackForm: FormGroup = new FormGroup({
    message: new FormControl(null , Validators.required)
  })

  finish(from:FormGroup) {
    this._HttpClient.post('http://localhost:3000/api/v1/cars/feedback', from.value, {
      headers: {
        token:`${localStorage.getItem('token')}`
      }
    }).subscribe({
      next: (res) => {
        console.log(res);

      }
    })
    this.hideOver();
    $('.feedback').fadeOut(100, () => {
      $('.showRoomInfo').fadeIn(100, () => {
        $('.showRoomInfo button').addClass('d-none')
      })
    })


  }
}
