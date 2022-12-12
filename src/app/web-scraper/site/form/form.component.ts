import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";

import { AppSite } from "../app-site";
import { SiteService } from "../site.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() public model: AppSite = new AppSite();
  @Input() public isNew: boolean = false;

  apiSub = new Subscription();

  constructor(
    private service: SiteService,
    public activeModal: NgbActiveModal
  ) {}
  ngOnDestroy() {
    if (this.apiSub) this.apiSub.unsubscribe();
  }

  ngOnInit() {
    if (this.isNew) {
      this.model = new AppSite();
    }
  }

  close() {
    this.activeModal.close();
  }

  submit() {
    if (this.isNew) {
      this.apiSub = this.service.insert(this.model).subscribe((res) => {
        this.callBack(res);
      });
    } else {
      this.apiSub = this.service.update(this.model).subscribe((res) => {
        this.callBack(res.data);
      });
    }
  }

  callBack(m: AppSite) {
    this.activeModal.close(m.id)
  }
}
