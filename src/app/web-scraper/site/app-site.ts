import { Type } from "./../../core/models/type";
import { AppBase } from "./../../core/models/app-base";

export class AppSite extends AppBase  {
  constructor(
    public name: string = "",
    public url: string = "",
    public type: Type = Type.XPath,
  ) {
    super();
  }
}
