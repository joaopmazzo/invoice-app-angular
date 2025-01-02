import { afterNextRender, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { LocalStorageService } from '../../service/local-storage.service';
import { InvoiceFormComponent } from '../../shared/components/invoice-form/invoice-form.component';
import { InvoiceListHeaderComponent } from './components/invoice-list-header/invoice-list-header.component';

@Component({
  selector: 'app-invoice-list',
  imports: [
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    InvoiceFormComponent,
    InvoiceListHeaderComponent,
  ],
  templateUrl: './invoice-list.component.html',
})
export class InvoiceListComponent {
  private readonly _localStorageService = inject(LocalStorageService);

  data: any = null;

  constructor() {
    afterNextRender(() => {
      const mockedData = this._localStorageService.getItem('mockedData');
      this.data = mockedData;
    });
  }
}
