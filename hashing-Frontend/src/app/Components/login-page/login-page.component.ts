import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  IsLoggedIn:boolean = false;
  ErrorMsg: string = '';

  constructor(private auth: AuthService ,private formbuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  //login form
  loginForm = this.formbuilder.group(
    {
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    }
  );

  //on button click for loggin in
  AdminLogin() {
    this.ErrorMsg = '';

    //call to api service
    this.auth.Login(this.loginForm.value).subscribe((loginResult: Boolean) => {

      //result of observable
      if (loginResult) {
        console.log("logged in");
      }
      else {
        this.ErrorMsg = `Brugernavn eller password inkorrekt, du er låst ude af systemet. Vent venligst 5 minutter`;
      }


    });

  }

}
