import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { HomeComponent } from './component/home/home.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    HomeComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
