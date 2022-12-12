import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailResolverService } from './product-detail/product-detail-resolver.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductResolverService } from './product/product-resolver.service';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: "products",
    component: ProductComponent,
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
    resolve: { list: ProductResolverService },
  },
  {
    path: "product-details",
    component: ProductDetailComponent,
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
    resolve: { list: ProductDetailResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportedRoutingModule { }
