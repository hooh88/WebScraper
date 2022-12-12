import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportDataRoutingModule } from './export-data-routing.module';
import { ExportComponent } from './export/export.component';
import { ShareModule } from './../core/share/share.module';


@NgModule({
  declarations: [
    ExportComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    ExportDataRoutingModule
  ]
})
export class ExportDataModule { }
