import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { AppRoutes } from './app-routing.module';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { CustomSharedModule } from "./shared.module";
import { BrowserModule } from "@angular/platform-browser";
import {RadioButtonModule} from 'primeng/radiobutton';
import { AuthInterceptor } from "./auth.interceptor";
import { AdminLayoutModule } from "./admin/layout/admin-layout/admin-layout.module";
import { SalesRelationLayoutModule } from "./sales-relation-officer/layout/sales-relation-layout/sales-relation-layout.module";



@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    RegisterComponent, 
  ],
  imports: [
    BrowserModule,RadioButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: false
    }),
   HttpClientModule, NgxPaginationModule,
    CustomSharedModule,AdminLayoutModule,SalesRelationLayoutModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 3 seconds
      progressBar: true,
      positionClass: "toast-top-center",
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
     },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
