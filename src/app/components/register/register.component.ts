import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import lottie from 'lottie-web';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements AfterViewInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  isLoading: boolean = false;
  errorMsg: string = '';
  animation: any;
  container: Element | null = null;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  registerData(): void {
    this.isLoading = true;
    if (this.registerForm.valid) {
      this._AuthService.registerForm(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message === 'success') {
            this._Router.navigate(['/login']);
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
    this.container = document.getElementById(
      'your-animation-container-register'
    );

    if (this.container) {
      this.animation = lottie.loadAnimation({
        container: this.container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './assets/images/signup.json',
      });
    }
  }
}
