import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractService } from "./../../core/service/abstract.service";
import { Observable } from "rxjs";
import { AppSite } from "./app-site";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class SiteService extends AbstractService<AppSite> {
  constructor(http: HttpClient) {
    super(http, "site");
  }
}
