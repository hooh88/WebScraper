import { AppProduct } from "./../../web-scraper/product/app-product";

export class AppExport {}
export class AppExportDataItems {
  constructor(
    public colHeads: Array<string> = new Array<string>(),
    public exProducts: Array<AppProduct> = new Array<AppProduct>(),
  ) {}
}
export class AppColHeadWithValue {
  constructor(
    public id: number = 0,
    public title: string = "",
    public value: string = "",
    public type: string = "",
  ){}
}
export class AppColHeadOptions {
  constructor(
    public exCategoryId : number = 0,
    public cols: Array<AppColHeadWithValue> = new Array<AppColHeadWithValue>(),
  ){}
}
