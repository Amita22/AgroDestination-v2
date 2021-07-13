import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router,
    private loginService:LoginService) { }

  ngOnInit() {
  }
  
  // Signup(Signupform:NgForm){
  //   console.log(Signupform.value);
  //   this.loginService.userSignUp(Signupform.value);

  //   }



    Signup(Signupform:NgForm){
      console.log(Signupform.value);
      this.loginService.userSignUp(Signupform.value);
    
  
      }
    SignIn(loginform:NgForm){
        this.loginService.userSignIn(loginform.value);
      }


}