import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TableComponent } from './../components/table/table.component';


@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    NgbModule,
  ],
  exports: [
    NgbModule,
    SweetAlert2Module,
    FormsModule,
    TableComponent,
  ]
})
export class ShareModule { }
