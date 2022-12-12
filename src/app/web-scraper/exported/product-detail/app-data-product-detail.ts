import { DetailType } from "./../../../web-scraper/product/app-product";
import { AppBase } from "./../../../core/models/app-base";

export class AppDataProductDetail extends AppBase {
  constructor(
    public name: string = "",
    public detail: string = "",
    public type: DetailType = DetailType.Default,
    public hasError: boolean = false,
    public productId: number = 0,
  ) {
    super();
  }
}
