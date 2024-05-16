import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './module/product/product.module';
import { AuthenticationModule } from './module/authentication/authentication.module';
import { CommonsModule } from './module/commons/commons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './module/layout/layout.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptorInterceptor } from './core/interceptor/jwt-interceptor.interceptor';
import {NgxPhotoEditorModule} from "ngx-photo-editor";
import { ProductDetailComponent } from './module/product/component/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    AuthenticationModule,
    CommonsModule,
    LayoutModule,
    NgxPhotoEditorModule
  ],
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptorInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
