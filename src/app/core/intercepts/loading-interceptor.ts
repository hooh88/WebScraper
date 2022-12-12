import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap, tap, finalize } from 'rxjs/operators';
import { SpinnerService } from '../components/spinner/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinner: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.isSpinnerVisible = true;
    return next.handle(req).pipe(
          finalize(() => {
            this.spinner.isSpinnerVisible = false;
          })
        )

  }
}
