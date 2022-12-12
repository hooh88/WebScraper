import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AbstractService } from "./../../core/service/abstract.service";
import { AppCategory } from "./app-category";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends AbstractService<AppCategory> {
  constructor(protected http: HttpClient) {
    super(http, "ExCategory");
  }
}
