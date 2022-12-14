import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FullComponent } from "./layouts/full/full.component";

export const Approutes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      { path: "", redirectTo: "/dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "about",
        loadChildren: () =>
          import("./about/about.module").then((m) => m.AboutModule),
      },
      {
        path: "component",
        loadChildren: () =>
          import("./component/component.module").then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: "web-scraper",
        loadChildren: () =>
          import("./web-scraper/web-scraper.module").then(
            (m) => m.WebScraperModule
          ),
      },
      {
        path: "export",
        loadChildren: () =>
          import("./export-data/export-data.module").then(
            (m) => m.ExportDataModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/starter",
  },
];
