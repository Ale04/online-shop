import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthenticationModule } from '../authentication/authentication.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class LayoutModule { }
