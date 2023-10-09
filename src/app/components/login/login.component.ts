import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  isLoading: boolean = false;

  errorMsg: string = '';

  loginData(): void {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this._AuthService.loginForm(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message === 'success') {
            localStorage.setItem('_token', response.token);
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          this.errorMsg = err.error.message;
        },
      });
    }
  }
}
