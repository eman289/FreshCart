import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import lottie from 'lottie-web';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  isLoading: boolean = false;
  errorMsg: string = '';
  animation: any;
  container: Element | null = null;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

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

  ngAfterViewInit(): void {
    this.container = document.getElementById('your-animation-container-login');

    if (this.container) {
      this.animation = lottie.loadAnimation({
        container: this.container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './assets/images/freshCart.json',
      });
    }
  }
}
