import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _NgxSpinnerService: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._NgxSpinnerService.show();

    return next.handle(request).pipe(
      finalize(() => {
        this._NgxSpinnerService.hide();
      })
    );
  }
}
