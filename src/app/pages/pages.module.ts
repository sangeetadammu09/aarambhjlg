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
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule
   
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
  ]
})

export class PagesModule {}
