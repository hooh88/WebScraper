export class AppBase {
  constructor(
    public id: number = 0,
    public isDelete: boolean = false,
    public createDate: Date = new Date(),
    public lastUpdateDate: Date =  new Date()
  ) {}
}
