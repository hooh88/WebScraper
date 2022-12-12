import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppDataProductDetail } from './app-data-product-detail';
import { ProductDetailService } from './product-detail.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolverService implements Resolve<AppDataProductDetail[]> {

  constructor(private service: ProductDetailService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AppDataProductDetail[] | Observable<AppDataProductDetail[]> | Promise<AppDataProductDetail[]> {
    const urlParams = route.queryParams;
    const params = new HttpParams().append('number',urlParams.number).append('size',urlParams.size)
    return this.service.getPaged(params)
  }

}
