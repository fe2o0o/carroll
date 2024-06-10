import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {

  constructor(private _HttpClient:HttpClient){}
  auctions: any;
  ngOnInit(): void {
    this._HttpClient.get('http://localhost:3000/api/v1/cars/allAuctions').subscribe({
      next: (res) => {

        this.auctions = res['data']
        console.log(this.auctions);

      }
    })
  }

}
