import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AppSite } from "./../../../web-scraper/site/app-site";
import { Subscription } from "rxjs";

import { AppCategory } from "../app-category";
import { CategoryService } from "../category.service";


@Component({
  selector: 'app-form-cat',
  templateUrl: './form-cat.component.html',
  styleUrls: ['./form-cat.component.scss']
})
export class FormCatComponent implements OnInit,OnDestroy {
  @Input() public model: AppCategory = new AppCategory();
  @Input() public parents: AppSite[] = new Array<AppSite>();
  @Input() public isNew: boolean = false;

  apiSub = new Subscription();

  constructor(
    private service: CategoryService,
    public activeModal: NgbActiveModal
  ) {}
  ngOnDestroy() {
    if (this.apiSub) this.apiSub.unsubscribe();
  }

  ngOnInit() {
    if (this.isNew) {
      this.model = new AppCategory();
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

  callBack(m: AppCategory) {
    this.activeModal.close(m.id)
  }
}
