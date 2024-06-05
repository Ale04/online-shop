import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { CartComponent } from './component/cart/cart.component';



@NgModule({
  declarations: [
    InvoiceComponent,
    CartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InvoiceComponent
  ]
})
export class InvoiceModule { }
