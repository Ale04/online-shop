import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './component/region/region.component';
import { CustomerComponent } from './component/customer/customer.component';
import { CustomerDetailComponent } from './component/customer-detail/customer-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    RegionComponent,
    CustomerComponent,
    CustomerDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule,    
    NgxPaginationModule
  ]
})
export class CustomerModule { }
