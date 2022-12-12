import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebScraperRoutingModule } from './web-scraper-routing.module';
import { SiteComponent } from './site/site.component';
import { RouterModule } from '@angular/router';
import { WebScraperComponent } from './web-scraper.component';
import { ShareModule } from './../core/share/share.module';
import { FormComponent } from './site/form/form.component';
import { CategoryComponent } from './category/category.component';
import { FormCatComponent } from './category/form-cat/form-cat.component';
import { ProductComponent } from './product/product.component';
import { FormProductComponent } from './product/form-product/form-product.component';


@NgModule({
  declarations: [
    SiteComponent,
    WebScraperComponent,
    FormComponent,
    FormCatComponent,
    CategoryComponent,
    ProductComponent,
    FormProductComponent
  ],
  imports: [
    ShareModule,
    CommonModule,
    RouterModule,
    WebScraperRoutingModule
  ]
})
export class WebScraperModule { }
