import { Component, Input } from '@angular/core';
import { StatusIndicatorComponent } from '../../../../shared/components/status-indicator/status-indicator.component';

@Component({
  selector: 'app-invoice-card',
  imports: [StatusIndicatorComponent],
  templateUrl: './invoice-card.component.html',
})
export class InvoiceCardComponent {
  @Input() invoiceId!: number;
  @Input() invoiceDate!: string;
  @Input() invoiceClientName!: string;
  @Input() invoiceTotalPrice!: number;
  @Input() invoiceStatus!: number;

  formatDateToString(dateString: string): string {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  formatCurrencyToString(currency: number | bigint): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(currency);
  }
}
