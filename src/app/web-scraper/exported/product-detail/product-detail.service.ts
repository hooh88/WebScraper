import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './../../../core/service/abstract.service';
import { AppDataProductDetail } from './app-data-product-detail';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService extends AbstractService<AppDataProductDetail> {

  constructor(protected http: HttpClient) {
    super(http, "ProductDetail");
  }

}
