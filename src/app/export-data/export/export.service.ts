import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "./../../../environments/environment";
import { Observable } from "rxjs";
import {
  AppColHeadOptions,
  AppColHeadWithValue,
  AppExportDataItems,
} from "./app-export";
import { AppResponse, Status } from "./../../core/models/app-response";
import { switchMap } from "rxjs-compat/operator/switchMap";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ExportService {
  private api = environment.api;
  private actionUrl = "Export";

  constructor(private http: HttpClient) {}

  getOptions(
    filesList: FileList | null,
    catId: number
  ): Observable<AppResponse<AppExportDataItems>> {
    const formData: FormData = new FormData();
    if (!filesList || filesList.length > 0) {
      formData.append("file", filesList != null ? filesList[0] : "null");
    }
    return this.http.post<AppResponse<AppExportDataItems>>(
      `${this.api}${this.actionUrl}/${catId}`,
      formData
    );
  }

  postOptions(model: AppColHeadOptions): Observable<AppResponse<Blob | any>> {
    return this.http
      .post<AppResponse<Blob|any>>(`${this.api}${this.actionUrl}`, model)
      // .pipe(
      //   tap((res) => {

      //   })
      // );
  }
}
