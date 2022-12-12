import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AppCategory } from './../../web-scraper/category/app-category';
import { CategoryService } from './../../web-scraper/category/category.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportResolverService implements Resolve<Array<AppCategory>> {

  constructor(private catService: CategoryService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AppCategory[] | Observable<AppCategory[]> | Promise<AppCategory[]> {
    return this.catService.getAll()
  }
}
