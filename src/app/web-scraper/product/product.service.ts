import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './../../core/service/abstract.service';
import { AppProduct } from './app-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractService<AppProduct> {

  constructor(protected http: HttpClient) {
    super(http,'ExProduct')
  }

}
