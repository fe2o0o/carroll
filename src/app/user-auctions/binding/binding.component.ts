import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent implements OnChanges {
  constructor(private _ToastrService:ToastrService,private _HttpClient:HttpClient){}
  @Input() auctionId:any;

  @Input() isOpen: boolean = false;

  @Output()
    myEmmit = new EventEmitter<boolean>()
    message: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']['currentValue']) {
      this.toggleOverLay()
      this.getMessage()
    }
  }

  getMessage() {
    this._HttpClient.get(`http://localhost:3000/api/v1/cars/rejectMessage/${this.auctionId}`, {
        headers: {
          token:`${localStorage.getItem('token')}`
        }
      }).subscribe({
        next: (res:any) => {
          this.message = res?.message[0]?.content;
          console.log(this.message);

        }
      })
  }

  toggleOverLay() {
    if ($('.binding').hasClass('show')) {
      $('.binding').addClass('hide').removeClass('show')
      this.myEmmit.emit(false)
    } else {
      $('.binding').addClass('show').removeClass('hide')
      this.myEmmit.emit(true)
    }
  }
}
