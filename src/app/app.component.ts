import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: "app-root",
    imports: [RouterOutlet, MatSidenavModule],
    templateUrl: "./app.component.html"
})
export class AppComponent {
  title = "invoice-app-angular";
}
