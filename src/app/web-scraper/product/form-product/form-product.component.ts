import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppCategory } from './../../../web-scraper/category/app-category';
import { Subscription } from 'rxjs';
import { AppProduct } from '../app-product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit,OnDestroy {
  @Input() public model: AppProduct = new AppProduct();
  @Input() public parents: AppCategory[] = new Array<AppCategory>();
  @Input() public isNew: boolean = false;

  apiSub = new Subscription();

  constructor(
    private service: ProductService,
    public activeModal: NgbActiveModal
  ) {}
  ngOnDestroy() {
    if (this.apiSub) this.apiSub.unsubscribe();
  }

  ngOnInit() {
    if (this.isNew) {
      this.model = new AppProduct();
    }
  }

  close() {
    this.activeModal.close();
  }

  submit() {
    if (this.isNew) {
      this.apiSub = this.service.insert(this.model).subscribe((res) => {
        this.callBack(res);
      });
    } else {
      this.apiSub = this.service.update(this.model).subscribe((res) => {
        this.callBack(res.data);
      });
    }
  }

  callBack(m: AppProduct) {
    this.activeModal.close(m.id)
  }
}
