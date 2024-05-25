import { Component } from '@angular/core';
import { DtoInvoiceList } from '../../_dto/dto-invoice-list';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { InvoiceService } from '../../_service/invoice.service';

declare var $: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {

  invoices: DtoInvoiceList[] = [];

  swal: SwalMessages = new SwalMessages();

  constructor(
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    this.invoiceService.getInvoices().subscribe({
      next: (v) => {
        this.invoices = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }
}
