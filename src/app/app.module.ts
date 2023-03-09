import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './Admin/sidebar/sidebar.module';
import { FooterModule } from './Admin/shared/footer/footer.module';
import { NavbarModule} from './Admin/shared/navbar/navbar.module';
import { FixedPluginModule} from './Admin/shared/fixedplugin/fixedplugin.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { AppRoutes } from './app-routing.module';

import { AdminLayoutComponent } from './Admin/layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './Common/login/login.component';
import { RegisterComponent } from './Common/register/register.component';
import { CustomSharedModule } from "./shared.module";
import { BrowserModule } from "@angular/platform-browser";
import {RadioButtonModule} from 'primeng/radiobutton';
import { AuthInterceptor } from "./auth.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,RadioButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: false
    }),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,HttpClientModule, NgxPaginationModule,
    CustomSharedModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 3 seconds
      progressBar: true,
    }),
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
