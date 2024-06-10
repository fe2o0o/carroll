import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem('token') != null) {
      this.decodedToken()
    }
  }

  isLoggin: BehaviorSubject<any> = new BehaviorSubject<any>(null)


  decodedToken() {
    const token = `${localStorage.getItem('token')}`;
    const decoded = jwtDecode(token)
    this.isLoggin.next(decoded)
  }

  logOut() {
    localStorage.clear();
    this.isLoggin.next(null)
  }

  register(data:any): Observable<any>{
    return this._HttpClient.post('http://localhost:3000/api/v1/auth/signup',data)
  }

  login(data: any): Observable<any>{
    return this._HttpClient.post('http://localhost:3000/api/v1/auth/login' , data)
  }
}
