import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ButtonComponent } from '../../shared/components/button/button.component';
import { InvoiceFormComponent } from '../../shared/components/invoice-form/invoice-form.component';

@Component({
    selector: 'app-invoice-list',
    imports: [
        MatSidenavModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        ButtonComponent,
        MatCheckboxModule,
        InvoiceFormComponent
    ],
    templateUrl: './invoice-list.component.html'
})
export class InvoiceListComponent {
  sidebarVisible: boolean = false;

  filterByStatus = this._formBuilder.group({
    draft: false,
    pending: false,
    paid: false,
  });

  constructor(private _formBuilder: FormBuilder) {}
}
