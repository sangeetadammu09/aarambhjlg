import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { AdminLayoutComponent } from './admin-layout.component';
import { PagesModule } from 'src/app/pages/pages.module';
import { NavbarModule } from '../../shared/navbar/navbar.module';
import { FooterModule } from '../../shared/footer/footer.module';
import { SidebarModule } from '../../shared/sidebar/sidebar.module';


@NgModule({
  imports: [
    CommonModule,
    PagesModule,
    RouterModule.forChild(AdminLayoutRoutes),
    NavbarModule,
    FooterModule,
    SidebarModule
 
  ],
  declarations: [
    AdminLayoutComponent,
  
  ]
})

export class AdminLayoutModule {}
