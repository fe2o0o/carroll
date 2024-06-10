import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _Router:Router,private _ToastrService:ToastrService , private _AuthService:AuthService){}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null , Validators.required)
  })


  handleLogin(form: FormGroup) {
    this._AuthService.login(form.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token)
        this._AuthService.decodedToken()
        this._Router.navigate(['/home'])
      },
      error: (err) => {
        this._ToastrService.error(err.error.message , "Faild")
      }
    })
  }

}
