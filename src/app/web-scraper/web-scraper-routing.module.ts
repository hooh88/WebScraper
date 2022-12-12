import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryResolverService } from "./category/category-resolver.service";
import { CategoryComponent } from "./category/category.component";
import { ProductResolverService } from "./product/product-resolver.service";
import { ProductComponent } from "./product/product.component";
import { SiteResolverService } from "./site/site-resolver.service";
import { SiteComponent } from "./site/site.component";
import { WebScraperComponent } from "./web-scraper.component";

const routes: Routes = [
  {
    path: "",
    component: WebScraperComponent,
    children: [
      {
        path: "ex-sites",
        component: SiteComponent,
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
        resolve: { list: SiteResolverService },
      },
      {
        path: "ex-cats",
        component: CategoryComponent,
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
        resolve: { list: CategoryResolverService },
      },
      {
        path: "ex-product",
        component: ProductComponent,
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
        resolve: { list: ProductResolverService },
      },
      {
        path: "data",
        loadChildren: ()=> import("./exported/exported.module").then(m=>m.ExportedModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebScraperRoutingModule {}
