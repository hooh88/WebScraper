import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Subscription } from "rxjs";

import { SwalDelete, SwalToast } from "./../../core/models/app-swal";
import { Status } from "./../../core/models/app-response";
import {
  Actions,
  ActionsType,
  ColDir,
  ColType,
  GridColumn,
} from "./../../core/components/table/app-table";

import { FormComponent } from "./form/form.component";
import { SiteService } from "./site.service";
import { AppSite } from "./app-site";

@Component({
  selector: "app-site",
  templateUrl: "./site.component.html",
  styleUrls: ["./site.component.scss"],
})
export class SiteComponent implements OnInit, OnDestroy {
  @ViewChild("toastSwal") public readonly toastSwal!: SwalComponent;

  models = new Array<AppSite>();
  site = new AppSite();

  swalOptions = new SwalDelete();
  toastOptions = new SwalToast();

  routeSub = new Subscription();
  itemSub = new Subscription();
  delSub = new Subscription();

  isNew = false;
  grids = new Array<GridColumn>(
    // new GridColumn("شماره", "id"),
    new GridColumn("نام", "name"),
    new GridColumn("آدرس", "url", ColDir.ltr, ColType.url)
  );
    actions = new Array<Actions>(
      new Actions('ویرایش','pencil',ActionsType.update),
      new Actions('حذف','trash',ActionsType.delete,'danger'),
    )
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SiteService,
    private modalService: NgbModal,
    public modalConfig: NgbModalConfig
  ) {}

  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
    if (this.itemSub) this.itemSub.unsubscribe();
    if (this.delSub) this.delSub.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSub = this.route.data.subscribe((data: Data) => {
      this.models = data.list;
    });
  }
  TableActions(e: any) {
    debugger
    this.site = e.item;
    const type = e.type;
    switch (type) {
      case ActionsType.new:
        this.modal(null);
        break;
      case ActionsType.update:
        this.item(this.site.id);
        break;
      case ActionsType.delete:
        this.delete();
        break;
    }
  }

  item(id: number) {
    this.itemSub = this.service.get(id).subscribe((res) => {
      this.modal(res);
    });
  }

  modal(site: AppSite | null) {
    this.modalConfig.backdrop = "static";
    this.modalConfig.keyboard = false;
    const modalRef = this.modalService.open(FormComponent, this.modalConfig);
    modalRef.componentInstance.model = site;
    this.isNew = site == null;
    modalRef.componentInstance.isNew = this.isNew;
    modalRef.result.then((res) => {
      if (res) {
        this.updatePage(res);
        if (this.isNew) {
          this.toastOptions = new SwalToast("سایت اضافه شد.");
        } else this.toastOptions = new SwalToast("سایت بروزرسانی شد.");
        this.fireToast();
      }
    });
  }

  // askDelete(site: AppSite) {
  //   this.site = site;
  //   this.swalOptions = new SwalDelete();
  //   this.deleteSwal.fire();
  // }

  delete() {
    this.delSub = this.service.delete(this.site.id).subscribe((res) => {
      if (res.status == Status.Success) {
        this.toastOptions = new SwalToast(res.message);
        this.fireToast();
        this.updatePage(this.site.id, false);
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
