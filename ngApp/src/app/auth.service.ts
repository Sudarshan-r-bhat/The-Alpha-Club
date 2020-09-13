import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Here we are injecting the httpClient 
  constructor(private http: HttpClient) { }

  private _registerUrl: string = "http://localhost:3000/api/register";
  
  registerUser(user) {
    return this.http.put<any>(this._registerUrl, user);
  }
}
