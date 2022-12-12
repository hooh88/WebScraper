export class AppResponse<T> {
  constructor(
    public message: string = "",
    public status: Status.Success,
    public data: T ,
    ) {}
}
export enum Status {
  Success = 200,
}
