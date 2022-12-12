import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppDataProduct } from './app-data-product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<AppDataProduct[]> {

  constructor(private service: ProductService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AppDataProduct[] | Observable<AppDataProduct[]> | Promise<AppDataProduct[]> {
    const urlParams = route.queryParams;
    const params = new HttpParams().append('number',urlParams.number).append('size',urlParams.size)
    return this.service.getPaged(params)
  }
}
