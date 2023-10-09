import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  registerForm(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      userData
    );
  }

  loginForm(userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      userData
    );
  }

  forgotPassword(formEmail: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      formEmail
    );
  }

  resetCode(code: any): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      code
    );
  }

  resetPassword(newInfo: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      newInfo
    );
  }
}
