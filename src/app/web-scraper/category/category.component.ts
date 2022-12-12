import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { forkJoin, Subscription } from "rxjs";

import { SwalDelete, SwalToast } from "./../../core/models/app-swal";
import { Status } from "./../../core/models/app-response";
import {
  Actions,
  ActionsType,
  ColDir,
  ColType,
  GridColumn,
} from "./../../core/components/table/app-table";

import { FormCatComponent } from "./form-cat/form-cat.component";
import { CategoryService } from "./category.service";
import { AppCategory } from "./app-category";
import { SiteService } from "../site/site.service";
import { AppSite } from "../site/app-site";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit, OnDestroy {
  @ViewChild("toastSwal") public readonly toastSwal!: SwalComponent;

  models = new Array<AppCategory>();
  model = new AppCategory();

  swalOptions = new SwalDelete();
  toastOptions = new SwalToast();

  routeSub = new Subscription();
  itemSub = new Subscription();
  delSub = new Subscription();
  ScrapSub = new Subscription();

  faName = "دسته بندی";
  isNew = false;
  grids = new Array<GridColumn>(
    // new GridColumn("شماره", "id"),
    new GridColumn("نام", "name"),
    new GridColumn("آدرس", "url", ColDir.ltr, ColType.url),
    new GridColumn("تگ تکرار محصول", "xPathRepeat", ColDir.ltr),
    new GridColumn("تگ تایتل محصول", "xPathTitle", ColDir.ltr),
    new GridColumn("تگ آدرس محصول", "xPathUrl", ColDir.ltr),
    new GridColumn("تگ دسته بندی", "xPathPaging", ColDir.ltr)
    // new GridColumn("وبسایت", "site")
  );
  actions = new Array<Actions>(
    new Actions("ویرایش", "pencil", ActionsType.update),
    new Actions("حذف", "trash", ActionsType.delete, "danger"),
    new Actions(
      "دریافت اطلاعات",
      "binoculars-fill",
      ActionsType.custom,
      "danger"
    )
  );
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CategoryService,
    private siteService: SiteService,
    private modalService: NgbModal,
    public modalConfig: NgbModalConfig
  ) {}

  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
    if (this.itemSub) this.itemSub.unsubscribe();
    if (this.delSub) this.delSub.unsubscribe();
    if (this.ScrapSub) this.ScrapSub.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSub = this.route.data.subscribe((data: Data) => {
      this.models = data.list;
    });
  }
  TableActions(e: any) {
    this.model = e.item;
    const type = e.type;
    switch (type) {
      case ActionsType.new:
        this.itemSub = this.siteService.getAll().subscribe((res) => {
          this.modal(null, res);
        });
        break;
      case ActionsType.update:
        this.item(this.model.id);
        break;
      case ActionsType.delete:
        this.delete();
        break;
      case ActionsType.custom:
        this.startScrap();
        break;
    }
  }
  startScrap() {
    this.ScrapSub = this.service
      .runScrap(this.model.siteId)
      .subscribe((res) => {
        if (res.status == Status.Success) {
          this.toastOptions = new SwalToast(`${res.message}`);
          this.fireToast();
        }
      });
  }
  item(id: number) {
    const item$ = this.service.get(id);
    const list$ = this.siteService.getAll();
    this.itemSub = forkJoin([item$, list$]).subscribe((res) => {
      this.modal(res[0], res[1]);
    });
  }

  modal(model: AppCategory | null, parents: AppSite[]) {
    this.modalConfig.backdrop = "static";
    this.modalConfig.keyboard = false;
    const modalRef = this.modalService.open(FormCatComponent, this.modalConfig);
    modalRef.componentInstance.model = model;
    modalRef.componentInstance.parents = parents;
    this.isNew = model == null;
    modalRef.componentInstance.isNew = this.isNew;
    modalRef.result.then((res) => {
      if (res) {
        this.updatePage(res);
        if (this.isNew) {
          this.toastOptions = new SwalToast(`${this.faName} اضافه شد.`);
        } else
          this.toastOptions = new SwalToast(`${this.faName} بروزرسانی شد.`);
        this.fireToast();
      }
    });
  }

  delete() {
    this.delSub = this.service.delete(this.model.id).subscribe((res) => {
      if (res.status == Status.Success) {
        this.toastOptions = new SwalToast(res.message);
        this.fireToast();
        this.updatePage(this.model.id, false);
      }
    });
  }

  updatePage(id: number, isUpdate = true) {
    const type = isUpdate ? "u" : "r";
    const p = this.route.snapshot.queryParams;
    this.router.navigate([], {
      queryParams: { number: p.number, size: p.size, u: `${type}${id}` },
    });
  }

  fireToast() {
    setTimeout(() => {
      this.toastSwal.fire();
    }, 100);
  }
}
