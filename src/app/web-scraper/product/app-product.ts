import { AppBase } from "./../../core/models/app-base";

export class AppProduct extends AppBase {
  constructor(
    public propName: string = "",
    public xPath: string = "",
    public propValue: string = "",
    public exCategoryId: number = 0,
    public type: DetailType = DetailType.Default
  ) {
    super();
  }
}

export enum DetailType {
  Default= 1,
  Image,
  Gallery,
  Loop
}
