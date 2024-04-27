import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './module/product/component/category/category.component';
import { RegisterComponent } from './module/authentication/register/register.component';
import { LoginComponent } from './module/authentication/login/login.component';
import { SecuredComponent } from './module/authentication/secured/secured.component';
import { authenticationGuard } from './module/authentication/_guard/authentication.guard';
import { ProductComponent } from './module/product/component/product/product.component';
import { ProductDetailComponent } from './module/product/component/product-detail/product-detail.component';


const routes: Routes = [
  { path: 'categoria', component: CategoryComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'producto', component: ProductComponent },
  { path: 'producto/:gtin', component: ProductDetailComponent },
  { path: 'secured', component: SecuredComponent, canActivate: [authenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
