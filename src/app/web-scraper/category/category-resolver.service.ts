import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AppCategory } from "./app-category";
import { CategoryService } from "./category.service";

@Injectable({
  providedIn: "root",
})
export class CategoryResolverService implements Resolve<AppCategory[]> {
  constructor(private service: CategoryService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): AppCategory[] | Observable<AppCategory[]> | Promise<AppCategory[]> {
    const urlParams = route.queryParams;
    const params = new HttpParams().append('number',urlParams.number).append('size',urlParams.size)
    return this.service.getPaged(params)
  }
}
