import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-web-scraper",
  template: `
    <div class="row">
      <div class="col-12">
        <div class="card">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class WebScraperComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
