import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../models/UserLogin';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }
  ngOnInit(): void {
    // location.reload();
  }
  frmUser: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  user: UserLogin = new UserLogin();

  loginDialog: boolean = true;
  visible: boolean = true;
  login() {
    debugger;
    console.log(this.user);
    this.loginService.login(this.user).pipe(
      catchError(error => {
        swal("Oops!", "User not registered!!!, please register a pen", "error");

        this.router.navigate(["register"]);
        return throwError(error);
      })
    ).subscribe(data => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      swal("OK!", "Registered user, you are transferred to the purchase page", "success").then(() => {
        this.router.navigate(["buying"]);
      });
      location.reload();
    });
  }
}
