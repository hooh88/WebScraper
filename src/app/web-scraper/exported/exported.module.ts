import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportedRoutingModule } from './exported-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShareModule } from './../../core/share/share.module';


@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    ExportedRoutingModule
  ]
})
export class ExportedModule { }
