import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private changes$ = new BehaviorSubject<{ key: string; value: any }>({
    key: '',
    value: null,
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setItem<T>(key: string, value: T): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        this.changes$.next({ key, value });
      } catch (e) {
        console.error('Error saving to localStorage', e);
      }
    }
  }

  getItem<T>(key: string): T | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error('Error reading from localStorage', e);
        return null;
      }
    }
    return null;
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
      this.changes$.next({ key, value: null });
    }
  }

  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.changes$.next({ key: 'clear', value: null });
    }
  }

  watchStorage(): Observable<{ key: string; value: any }> {
    return this.changes$.asObservable();
  }
}
