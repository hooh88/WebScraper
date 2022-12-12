import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractService } from "./../../../core/service/abstract.service";
import { AppDataProduct } from "./app-data-product";

@Injectable({
  providedIn: "root",
})
export class ProductService extends AbstractService<AppDataProduct> {
  constructor(protected http: HttpClient) {
    super(http, "Product");
  }
}
