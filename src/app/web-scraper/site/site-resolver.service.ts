import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { urlPagingParams } from "./../../core/components/table/app-table";
import { Observable } from "rxjs";
import { AppSite } from "./app-site";
import { SiteService } from "./site.service";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SiteResolverService implements Resolve<AppSite[]> {
  constructor(
    private service: SiteService,
    private activeRoute: ActivatedRoute
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): AppSite[] | Observable<AppSite[]> | Promise<AppSite[]> {
    const urlParams = route.queryParams;
    const params = new HttpParams().append('number',urlParams.number).append('size',urlParams.size)
    return this.service.getPaged(params)
  }
}
