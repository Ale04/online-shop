import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './component/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './component/product/product.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ProductCategoryComponent } from './component/product-category/product-category.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductCategoryComponent
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ProductModule { }
