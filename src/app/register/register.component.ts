import { Component } from '@angular/core';
import { UserRegister } from '../models/UserRegister';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  lowercase: boolean = false;
  uppercase: boolean = false;
  digits: boolean = false;
  specialCharacters: boolean = false;
  minimumLength: boolean = false;

  frmUserRegister: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });

  checkPasswordConditions(password: string) {
    this.lowercase = /[a-z]/.test(password);
    this.uppercase = /[A-Z]/.test(password);
    this.digits = /\d/.test(password);
    this.specialCharacters = /[!@#$%^&*]/.test(password);
    this.minimumLength = password.length >= 6;

  }

  user: UserRegister = new UserRegister();

  constructor(private loginService: LoginService, private router: Router) { }
  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);

  register() {
    if (this.emailControl.valid) {

      this.loginService.register(this.user).subscribe(
        (response) => {
          Swal({
            icon: 'success',
            title: 'Registration Successful',
            text: 'משתמש נוצר בהצלחה'
          });
          console.log(response); // Handle the successful response
          this.router.navigate(['/login']); // Redirect to the login page

        },
        (error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // Client-side error occurred
            Swal({
              icon: 'error',
              title: 'An error occurred',
              text: error.error.message
            });
          } else {
            // Server-side error occurred
            if (error.status === 400) {
              Swal({
                icon: 'error',
                title: 'Bad Request',
                text: JSON.stringify(error.error.errors.Email)
              });
            } else if (error.status === 500) {
              Swal({
                icon: 'error',
                title: 'Internal Server Error',
                text: JSON.stringify(error.error.message)
              });
            } else {
              Swal({
                icon: 'error',
                title: 'Backend returned code ' + error.status,
                text: JSON.stringify(error.error)
              });
            }
          }
        }
      );
    } else {
      // Email is invalid, display an error message or take appropriate action
    }
  }
}
