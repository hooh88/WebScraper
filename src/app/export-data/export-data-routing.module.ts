import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExportResolverService } from "./export/export-resolver.service";
import { ExportComponent } from "./export/export.component";

const routes: Routes = [
  {
    path: "",
    component: ExportComponent,
    resolve: { cats: ExportResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportDataRoutingModule {}
