export class AppSwal {
  constructor(
    public title: string = "",
    public text: string = "",
    public icon: SwalIcon = SwalIcon.question,
    public confirmButtonText: string = "تایید",
    public cancelButtonText: string = "انصراف",
    public showCancelButton: boolean = true,
    public focusCancel: boolean = true,
    public toast: boolean = true,
    public reverseButtons: boolean = true
  ) {}
}
export class SwalDelete {
  constructor(
    public title: string = "حذف اطلاعات",
    public text: string = `آیا از حذف اطلاعات اطمینان دارید؟`,
    public icon: SwalIcon = SwalIcon.warning,
    public confirmButtonText: string = "تایید و حذف",
    public cancelButtonText: string = "انصراف",
    public showCancelButton: boolean = true,
    public focusCancel: boolean = true,
    public toast: boolean = false,
    public reverseButtons: boolean = true
  ) {}
}

export class SwalToast {
  constructor(
    public text: string = `اطلاعاتی دریافت نشد. خطای سرور!`,
    public color: Color = Color.success,
    public icon: SwalIcon = SwalIcon.success,
    public title: string = "",
    public confirmButtonText: string = "تایید و حذف",
    public cancelButtonText: string = "انصراف",
    public showCancelButton: boolean = false,
    public focusCancel: boolean = true,
    public toast: boolean = true,
    public reverseButtons: boolean = true,
    public showConfirmButton: boolean = false,
    public timer: number = 10000,
    public timerProgressBar: boolean = true,
    public position: Position = Position.bottomStart
  ) {}
}
export enum SwalIcon {
  warning = "warning",
  error = "error",
  success = "success",
  info = "info",
  question = "question",
}
export enum Color {
  success = "green",
  warning = "#000",
  error = "",
  info = "",
  question = "",
}
export enum Position {
  top = "top",
  topStart = "top-start",
  topEnd = "top-end",
  center = "center",
  centerStart = "center-start",
  centerEnd = "center-end",
  bottom = "bottom",
  bottomStart = "bottom-start",
  bottomEnd = "bottom-end",
}
