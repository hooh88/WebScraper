import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import {  Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { Color, SwalIcon, SwalToast } from "../models/app-swal";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          this.toast(err.error.Message)
          console.log(err);

          switch (err.status) {
            case 401:
              // Handle 401 Error
              return throwError(err);
              break;
            case 404:
              // this.toast(err.error.response)
              return throwError(err);
              break;
            case 403:
              return throwError(err);
              break;
            case 422:
              return throwError(err);
              //return err;
              break;
            default:
              return throwError(err);
          }
        } else {
          return throwError(err);
        }
      }),
      // retryWhen((err) => {
      //   let retries = 1;
      //   return err.pipe(
      //     delay(2000),
      //     tap(() => {
      //       if (retries > 1) {
      //         this.showRetry(retries);
      //       }
      //     }),
      //     map((error) => {
      //       if (error.status < 500 && error.status > 300) {
      //         throw error;
      //       }
      //       console.log(error);

      //       retries++;
      //       if (retries === 3) {
      //         throw error;
      //       }
      //       return error;
      //     })
      //   );
      // }),
      // catchError((err) => {
      //   console.log(err);
      //   this.failedAlert(err.error.msg);
      //   return EMPTY;
      // }),
      finalize(() => {})
    );
  }

  toast(message:string) {
    const toast = new SwalToast(
      message,
      Color.warning,
      SwalIcon.warning
    );
    setTimeout(() => {
      Swal.fire(toast);
    }, 150);
  }
}
