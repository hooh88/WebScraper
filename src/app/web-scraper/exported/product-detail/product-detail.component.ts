import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import {
  ActionsType,
  ColDir,
  ColType,
  GridColumn,
} from "./../../../core/components/table/app-table";
import { Status } from "./../../../core/models/app-response";
import { SwalDelete, SwalToast } from "./../../../core/models/app-swal";
import { forkJoin, Subscription } from "rxjs";
import { AppDataProduct } from "../product/app-data-product";
import { ProductService } from "../product/product.service";
import { AppDataProductDetail } from "./app-data-product-detail";
import { ProductDetailService } from "./product-detail.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @ViewChild("toastSwal") public readonly toastSwal!: SwalComponent;

  models = new Array<AppDataProductDetail>();
  model = new AppDataProductDetail();

  swalOptions = new SwalDelete();
  toastOptions = new SwalToast();

  routeSub = new Subscription();
  itemSub = new Subscription();
  delSub = new Subscription();

  faName = "محصول";
  isNew = false;
  grids = new Array<GridColumn>(
    // new GridColumn("شماره", "id"),
    new GridColumn("نام", "name"),
    new GridColumn("اطلاعات", "detail"),
    new GridColumn("دارای خطا", "hasError", ColDir.ltr,ColType.bool)
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductDetailService,
    private parentService: ProductService,
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
    this.model = e.item;
    const type = e.type;
    switch (type) {
      case ActionsType.new:
        this.itemSub = this.parentService.getAll().subscribe((res) => {
          this.modal(null, res);
        });
        break;
      case ActionsType.update:
        this.item(this.model.id);
        break;
      case ActionsType.delete:
        this.delete();
        break;
    }
  }

  item(id: number) {
    const item$ = this.service.get(id);
    const list$ = this.parentService.getAll();
    this.itemSub = forkJoin([item$, list$]).subscribe((res) => {
      this.modal(res[0], res[1]);
    });
  }

  modal(model: AppDataProductDetail | null, parents: AppDataProduct[]) {
    this.modalConfig.backdrop = "static";
    this.modalConfig.keyboard = false;
    const modalRef = this.modalService.open(
      null, // insert component
      this.modalConfig
    );
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
