import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { from, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { TablePaginationStore } from "../components/table/state/table-pagination.store";

@Injectable({
  providedIn: "root",
})
export class ResponseHeaderInterceptor implements HttpInterceptor {
  constructor(private pageStore: TablePaginationStore) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((httpEvent: HttpEvent<any>) => {
        // Skip request
        if (httpEvent.type === 0) {
          return;
        }
        if (httpEvent instanceof HttpResponse) {
          if (httpEvent.headers.has("x_paging")) {
            const pageOpt = httpEvent.headers.get("x_paging") ?? null;
            this.pageStore.update((state) => {
              return {
                Paging: JSON.parse(pageOpt ?? ""),
              };
            });
          }
          //  else {
          //   const toast = new SwalToast(
          //     "دریافت اطلاعات صفحه بندی با شکست مواجه شد.",
          //     Color.warning,
          //     SwalIcon.warning
          //   );
          //   Swal.fire(toast);
          // }
        }
      })
    );
  }
}
