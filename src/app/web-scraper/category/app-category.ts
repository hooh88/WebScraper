import { AppBase } from "./../../core/models/app-base";

export class AppCategory extends AppBase  {
  constructor(
    public name: string = "",
    public url: string = "",
    public xPathRepeat: string = '//div[contains(concat(" ", normalize-space(@class), " "), " product ")]',
    public xPathTitle: string = './/h3[contains(concat(" ", normalize-space(@class), " "), " product-title ")]/a',
    public xPathUrl: string = './/h3[contains(concat(" ", normalize-space(@class), " "), " product-title ")]/a',
    public xPathPaging: string = './/a[contains(concat(" ", normalize-space(@class), " "), " page-numbers ")]',
    public pagingTemplate: string = "",
    public productBaseUrlTemplate: string = "https://api.com/{0}/",
    public pagesCount: number = 0,
    public siteId: number = 0,
  ) {
    super();
  }
}
