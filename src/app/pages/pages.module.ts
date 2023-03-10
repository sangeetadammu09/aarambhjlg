import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductsComponent } from './products/products.component';
import { TaxSlotComponent } from './tax-slot/tax-slot.component';
import { UnitComponent } from './unit/unit.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
   
  ],
  declarations: [
    ProductCategoryComponent,
    UnitComponent,
    TaxSlotComponent,
    ProductsComponent,
  ]
})

export class PagesModule {}
