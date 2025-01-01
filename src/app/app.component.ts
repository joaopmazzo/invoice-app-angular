import { afterNextRender, Component, HostBinding, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './service/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'invoice-app-angular';
  darkMode = signal<boolean>(false);

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  constructor(private localStorageService: LocalStorageService) {
    afterNextRender(() => {
      this.localStorageService.watchStorage().subscribe(({ key, value }) => {
        if (key === 'darkMode') {
          this.darkMode.set(value ?? false);
        }
      });
    });
  }

  toggleDarkMode() {
    this.localStorageService.setItem('darkMode', !this.darkMode());
  }
}
