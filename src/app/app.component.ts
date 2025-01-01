import {
  afterNextRender,
  Component,
  effect,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './service/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly title = 'invoice-app-angular';

  private readonly injector = inject(Injector);
  private readonly localStorageService = inject(LocalStorageService);

  readonly darkMode = signal<boolean>(false);

  constructor() {
    afterNextRender(() => {
      this.initializeDarkMode();
      this.setupDarkModeEffect();
      this.watchLocalStorageChanges();
    });
  }

  toggleDarkMode(): void {
    this.localStorageService.setItem('isDarkMode', !this.darkMode());
  }

  private initializeDarkMode(): void {
    const storedDarkMode: boolean =
      this.localStorageService.getItem('isDarkMode') ?? false;
    this.darkMode.set(storedDarkMode);
  }

  private setupDarkModeEffect(): void {
    effect(
      () => {
        this.handleThemeChange(this.darkMode());
      },
      { injector: this.injector }
    );
  }

  private watchLocalStorageChanges(): void {
    this.localStorageService.watchStorage().subscribe(({ key, value }) => {
      if (key === 'isDarkMode') {
        this.darkMode.set(value ?? false);
      }
    });
  }

  private handleThemeChange(isDarkMode: boolean): void {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }
}
