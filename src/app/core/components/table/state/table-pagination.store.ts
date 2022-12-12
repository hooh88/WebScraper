import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { PageOpt } from '../app-table';

export interface TablePagination {
  Paging: PageOpt;
  IsLoaded: boolean;
}

export const createTablePagination = () => {
  return {
    Paging: new PageOpt(),
    IsLoaded: false,
  } as TablePagination;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tablePagination' })
export class TablePaginationStore extends Store<TablePagination> {

  constructor() {
    super(createTablePagination());
  }

}
