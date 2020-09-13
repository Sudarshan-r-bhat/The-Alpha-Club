import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;


  registrationDetails = {  
    email: String,
    password: String};


  email: String;
  password: String;

  // inject the auth service
  constructor(private _auth: AuthService) { }
 

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registrationDetails)
      .subscribe(res => console.log(res), err => console.log(err));    
    //console.log(this.registrationDetails);
   // console.log({email: this.email, password: this.password});
  }
}
