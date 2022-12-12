import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { PageOpt } from "../app-table";
import {
  TablePagination,
  TablePaginationStore,
} from "./table-pagination.store";

@Injectable({ providedIn: "root" })
export class TablePaginationQuery extends Query<TablePagination> {
  constructor(protected store: TablePaginationStore) {
    super(store);
  }

  getPageOptions(): Observable<PageOpt> {
    return this.select((state) => state.Paging);
  }
}
