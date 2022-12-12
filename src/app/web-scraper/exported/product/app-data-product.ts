import { AppBase } from "./../../../core/models/app-base";

export class AppDataProduct extends AppBase {
  constructor(
    public name: string = "",
    public url: string = "",
    public descriptions: string = "",
    public exCategoryId: number = 0
  ) {
    super();
  }
}
