import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Params, Router } from "@angular/router";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { SwalDelete } from "./../../../core/models/app-swal";
import {
  Actions,
  ActionsType,
  ColDir,
  ColType,
  GridColumn,
  PageOpt,
} from "./app-table";
import { TablePaginationQuery } from "./state/table-pagination.query";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  get colType(): typeof ColType {
    return ColType;
  }
  get colDir(): typeof ColDir {
    return ColDir;
  }
  get actionsType(): typeof ActionsType {
    return ActionsType;
  }
  @ViewChild("deleteSwal") public readonly deleteSwal!: SwalComponent;

  @Input() Model: Array<any> = new Array<any>();
  @Input() Title: string = "";
  @Input() Grids: GridColumn[] = new Array<GridColumn>(); // ستون های جدول
  @Input() TblActions: Actions[] = new Array<Actions>();
  @Input() ShowActions = true;
  @Input() BoolTrueText = "بله";
  @Input() BoolFalseText = "خیر";
  @Input() BoolTrueColor: "success" | "danger" = "danger";
  @Input() BoolFalseColor: "success" | "danger" = "success";

  @Output() Actions = new EventEmitter<any>();

  swalOptions = new SwalDelete();
  model = null;
  pageOpt: PageOpt | null = new PageOpt();

  constructor(
    private router: Router,
    private pageQuery: TablePaginationQuery
  ) {}

  ngOnInit() {
    this.getPaging();
  }
  callAction(model: any, type: ActionsType | string) {
    if(type == ActionsType.delete) {
      this.askDelete(model)
    } else{
      this.action(model, type)
    }
  }
  action(item: any, type: ActionsType | string) {
    const event = { item, type };
    this.Actions.emit(event);
  }

  askDelete(model: any) {
    this.model = model;
    this.swalOptions = new SwalDelete();
    this.deleteSwal.fire();
  }

  changePage(e: any) {
    const queryParams: Params = { number: e };
    this.router.navigate([], {
      // relativeTo: activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: "merge", // remove to replace all query params by provided
    });
    this.getPaging();
  }
  getPaging() {
    this.pageQuery.getPageOptions().subscribe((res) => {
      this.pageOpt = res;
    });
    // if (localStorage.getItem("TBLOPT")) {
    //   this.pageOpt = JSON.parse(localStorage.getItem("TBLOPT") ?? "");
    // } else {
    //   this.pageOpt = null;
    // }
    // console.log(this.pageOpt);
  }
}
