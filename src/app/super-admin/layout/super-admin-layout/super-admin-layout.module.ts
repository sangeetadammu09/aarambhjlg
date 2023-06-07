import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesModule } from 'src/app/pages/pages.module';
import { SuperAdminLayoutRoutes } from './super-admin-layout.routing';
import { SuperAdminNavbarModule } from '../../shared/navbar/navbar.module';
import { SuperAdminFooterModule } from '../../shared/footer/footer.module';
import { SuperAdminSidebarModule } from '../../shared/sidebar/sidebar.module';
import { SuperAdminLayoutComponent } from './super-admin-layout.component';



@NgModule({
  imports: [
    CommonModule,
    PagesModule,
    RouterModule.forChild(SuperAdminLayoutRoutes),
    SuperAdminNavbarModule,
    SuperAdminFooterModule,
    SuperAdminSidebarModule
 
  ],
  declarations: [SuperAdminLayoutComponent]
})

export class SuperAdminLayoutModule {}
