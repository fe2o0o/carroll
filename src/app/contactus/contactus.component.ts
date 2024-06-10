import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  constructor(private _HttpClient:HttpClient , private _ToastrService:ToastrService){}
  contactForm: FormGroup = new FormGroup({
    email:new FormControl(null,Validators.required),
    name:new FormControl(null,Validators.required),
    phoneNumber:new FormControl(null,Validators.required),
    subject: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
  })

  handleAddContact(form: FormGroup) {
    this._HttpClient.post("http://localhost:3000/api/v1/cars/addContatc", form.value).subscribe({
      next: (res) => {
        this.contactForm.reset();
        this._ToastrService.success("Your Message Send" , "success")
      }
    })
  }

}
