import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Here we are injecting the httpClient 
  constructor(private http: HttpClient, private _router: Router) { }

  private _registerUrl: string = "http://localhost:3000/api/register";
  private _loginUrl: string = "http://localhost:3000/api/login";

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }
  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);   // syntax: url, requestentity-body
  }

  loggedIn() {
    return !!localStorage.getItem('token');  // To return a boolean.
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/events']);
  }

}
