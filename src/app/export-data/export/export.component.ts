import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { SwalToast } from "./../../core/models/app-swal";
import { Status } from "./../../core/models/app-response";
import { AppCategory } from "./../../web-scraper/category/app-category";
import {
  AppColHeadOptions,
  AppColHeadWithValue,
  AppExportDataItems,
} from "./app-export";
import { ExportService } from "./export.service";
import { saveAs } from 'file-saver';

@Component({
  selector: "app-export",
  templateUrl: "./export.component.html",
  styleUrls: ["./export.component.scss"],
})
export class ExportComponent implements OnInit {
  @ViewChild("toastSwal") public readonly toastSwal!: SwalComponent;
  @ViewChild("fileSelector") fileSelector: ElementRef | null = null;

  toastOptions = new SwalToast();
  model = new AppExportDataItems();
  options = new AppColHeadOptions();
  cats = new Array<AppCategory>();
  colHeads = new Array<AppColHeadWithValue>();
  catId = 0;
  isSelectFile = true;
  constructor(
    private service: ExportService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data: Data) => {
      this.cats = data.cats;
    });
  }
  postOptions() {
    this.options.exCategoryId = this.catId;
    this.options.cols = this.colHeads;
    this.service.postOptions(this.options).subscribe((res) => {
      if (res.status == Status.Success) {
        window.open(res.data);
        // const url = URL.createObjectURL(res.data.fileContents);
        // window.open(url, "_blank");
        // (window.URL || window.webkitURL).revokeObjectURL(url);
      }
      //  if (res.status == Status.Success) {
      //   URL.createObjectURL(res.data)
      //   this.model = res.data;
      //   this.setColHeads();
      //   this.toastOptions = new SwalToast(res.message);
      //   this.fireToast();
      //}
    });
  }
  postCSVFile() {
    const fileInput: HTMLInputElement = this.fileSelector?.nativeElement;
    this.service.getOptions(fileInput.files, this.catId).subscribe((res) => {
      if (res.status == Status.Success) {
        this.model = res.data;
        this.setColHeads();
        this.toastOptions = new SwalToast(res.message);
        this.fireToast();
      }
    });
  }
  setColHeads() {
    let id = 1;
    this.model.colHeads.forEach((element) => {
      this.colHeads.push(new AppColHeadWithValue(id, element));
      id = id + 1;
    });
    this.isSelectFile = false;
  }
  fireToast() {
    setTimeout(() => {
      this.toastSwal.fire();
    }, 100);
  }
}
