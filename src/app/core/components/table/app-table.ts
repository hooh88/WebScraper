export class GridColumn {
  constructor(
    public title: string,
    public propName: string = "",
    public dir: ColDir = ColDir.rtl,
    public type: ColType = ColType.string,
    public showToSearch: boolean = true
  ) {}
}
export interface urlPagingParams {
  page: string,
  size: string,
}
export class PageOpt {
  constructor(
  public  PageSize: number= 0,
  public  TotalCount: number = 0,
  public  CurrentPage: number = 0,
  public  HasNext: boolean = false,
  public  HasPrev: boolean = false,
  public  TotalPages: number = 0,
  ) {}
}
 export class Actions {
   constructor(
     public Name: string,
     public Icon: string | 'pencil' | 'trash',
     public ActionType: ActionsType | string,
     public Class: string = "primary", // "remove" کلاس برای استایل هر دکمه
     public Tooltip: string="",
   ) {}
 }
export enum ColDir {
  rtl = 1,
  ltr
}
export enum ColType {
  string = 1,
  number,
  url,
  date,
  dateTime,
  bool
}
export enum ActionsType {
  new = 1,
  update,
  delete,
  custom
}
