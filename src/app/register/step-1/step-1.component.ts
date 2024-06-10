import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.css']
})
export class Step1Component {
  constructor(private _ToastrService:ToastrService,private AuthService:AuthService , private _Router:Router ){}
  isMember: boolean = true;
  messageError: string = '';
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    password: new FormControl(null, Validators.required),
    memberType: new FormControl('basic'),
    cardnumber: new FormControl(null),
    expireDate: new FormControl(null),
    cvv:new FormControl(null)
  })

  getMember(event: any) {
    const memberValue = event.target.value;
    if (memberValue == 'basic' || memberValue == 'premier') {
      this.isMember = true;
    } else {
      this.isMember = false;
    }
  }

  handleRegister(form:FormGroup):any {
    if (form.value.memberType != 'free') {
      if (!form.get('cardnumber').value || !form.get('expireDate').value || !form.get('cvv').value) {
        return this.messageError = "All Card Data Is Required"
      } else {
        this.messageError = '';
        this.AuthService.register(form.value).subscribe({
          next: (res) => {
            this._ToastrService.success("An amount has been withdrawn from the bank account" , "Success")
            this._ToastrService.success("Follow Up Your Email To Verfify Account", "Success")
            this._Router.navigate(['/login'])
          },
          error: (err) => {
            this._ToastrService.error(err.error.message , "Faild")
          }
        })
      }
    } else {
      this.AuthService.register(form.value).subscribe({
        next: (res) => {
          this._Router.navigate(['/login'])
            this._ToastrService.success("Follow Up Your Email To Verfify Account" , "Success")
          },
        error: (err) => {
            this._ToastrService.error(err.error.message , "Faild")
          }
        })
    }
  }

}


     // const data = {
      //   name: form.value.name,
      //   email: form.value.email,
      //   password: form.value.password,
      //   phoneNumber: form.value.phoneNumber,
      //   memberType:form.value.memberType
      // }
