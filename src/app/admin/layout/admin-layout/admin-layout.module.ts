import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { AdminLayoutComponent } from './admin-layout.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { PagesModule } from 'src/app/pages/pages.module';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';


@NgModule({
  imports: [
    CommonModule,
    PagesModule,
    RouterModule.forChild(AdminLayoutRoutes),
 
  ],
  declarations: [
    AdminLayoutComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent
  ]
})

export class AdminLayoutModule {}
