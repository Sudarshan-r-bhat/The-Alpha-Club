import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;


  registrationDetails = {  
    email: "",
    password: ""};


  email: String;
  password: String;

  // inject the auth service
  constructor(private _auth: AuthService, private _router: Router) { }
 

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registrationDetails)
      .subscribe(res => {
        localStorage.setItem('token', res.token);
        console.log(res);
        this._router.navigate(['/special']);
      }, err => console.log(err));    
    //console.log(this.registrationDetails);
   // console.log({email: this.email, password: this.password});
  }
}
