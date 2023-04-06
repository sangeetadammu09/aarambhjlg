import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SalesRelationLayoutRoutes } from './sales-relation-layout.routing';
import { PagesModule } from 'src/app/pages/pages.module';
import { SalesNavbarModule } from '../../shared/navbar/navbar.module';
import { SalesFooterModule } from '../../shared/footer/footer.module';
import { SalesRelationLayoutComponent } from './sales-relation-layout/sales-relation-layout.component';
import { SalesSidebarModule } from '../../shared/sidebar/sidebar.module';


@NgModule({
  imports: [
    CommonModule,
    PagesModule,
    RouterModule.forChild(SalesRelationLayoutRoutes),
    SalesNavbarModule,
    SalesFooterModule,
    SalesSidebarModule
 
  ],
  declarations: [
    SalesRelationLayoutComponent,
  
  ]
})

export class SalesRelationLayoutModule {}
