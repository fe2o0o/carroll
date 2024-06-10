import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  constructor(private _Router:Router,private _AuthService: AuthService)  {
    this._AuthService.isLoggin.subscribe({
      next: () => {
        if (this._AuthService.isLoggin.getValue() != null) {
          this.isLoggin = true
        } else {
          this.isLoggin = false
        }
      }
    })
  }


  toggleProfile() {
    $('.profile-links').slideToggle(500)
  }

  isLoggin: boolean = false;


  logOut() {
    this._AuthService.logOut()
    this._Router.navigate(['/home'])
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');

    } else {
      element.classList.remove('navbar-inverse');
    }
  }
}
