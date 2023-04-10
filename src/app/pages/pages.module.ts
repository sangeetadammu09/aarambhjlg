import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductsComponent } from './products/products.component';
import { TaxSlotComponent } from './tax-slot/tax-slot.component';
import { UnitComponent } from './unit/unit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CityComponent } from './city/city.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { InstallmentsComponent } from './installments/installments.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { BranchComponent } from './branch/branch.component';
import { UserComponent } from './user/user.component';
import { ProductPriceComponent } from './product-price/product-price.component';
import { UserroleComponent } from './userrole/userrole.component';
import { CustomSharedModule } from '../shared.module';
import { CenterComponent } from './center/center.component';
import { GroupComponent } from './group/group.component';
import { MemberComponent } from './member/member.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,CustomSharedModule,PdfViewerModule
   
  ],
  declarations: [
    ProductCategoryComponent,
    UnitComponent,
    TaxSlotComponent,
    ProductsComponent,
    CityComponent,
    ExpenseTypeComponent,
    InstallmentsComponent,
    ProductBrandComponent,
    BranchComponent,
    UserComponent,
    ProductPriceComponent,
    UserroleComponent,
    CenterComponent,
    GroupComponent,
    MemberComponent
  ]
})

export class PagesModule {}
