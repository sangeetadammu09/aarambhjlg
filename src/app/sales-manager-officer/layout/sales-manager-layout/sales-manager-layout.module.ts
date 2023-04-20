import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesModule } from 'src/app/pages/pages.module';
import { SalesNavbarModule } from '../../shared/navbar/navbar.module';
import { SalesFooterModule } from '../../shared/footer/footer.module';
import { SalesSidebarModule } from '../../shared/sidebar/sidebar.module';
import { SalesManagerLayoutComponent } from './sales-manager-layout/sales-manager-layout.component';
import { SalesManagerLayoutRoutes } from './sales-manager-layout.routing';


@NgModule({
  imports: [
    CommonModule,
    PagesModule,
    RouterModule.forChild(SalesManagerLayoutRoutes),
    SalesNavbarModule,
    SalesFooterModule,
    SalesSidebarModule
 
  ],
  declarations: [
    SalesManagerLayoutComponent,
  
  ]
})

export class SalesManagerLayoutModule {}
