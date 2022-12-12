import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
import { Observable } from "rxjs";
import { AppResponse } from "../models/app-response";

import { map } from "rxjs/operators";

export abstract class AbstractService<T> {
  private api = environment.api;

  constructor(
    protected http: HttpClient,
    protected actionUrl: string,) {}

  getPaged(params: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(`${this.api}${this.actionUrl}`,{  params:params })
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.api}${this.actionUrl}/list`);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.api}${this.actionUrl}/${id}`);
  }

  insert(model: T): Observable<T> {
    return this.http.post<T>(`${this.api}${this.actionUrl}`, model);
  }

  update(model: T): Observable<AppResponse<T>> {
    return this.http.put<AppResponse<T>>(`${this.api}${this.actionUrl}`, model);
  }

  delete(id: number): Observable<AppResponse<T>> {
    return this.http.delete<AppResponse<T>>(
      `${this.api}${this.actionUrl}/${id}`
    );
  }

  runScrap(id: number): Observable<AppResponse<null>> {
    return this.http.get<AppResponse<null>>(`${this.api}${this.actionUrl}/RunScraper/${id}`);
  }
}
