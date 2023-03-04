import { Routes } from '@angular/router';
import { ProductCategoryComponent } from 'src/app/pages/product-category/product-category.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { TaxSlotComponent } from 'src/app/pages/tax-slot/tax-slot.component';
import { UnitComponent } from 'src/app/pages/unit/unit.component';

export const AdminLayoutRoutes: Routes = [
    
     { path:'product-category', component: ProductCategoryComponent },
     { path:'unit', component: UnitComponent },
     { path:'tax-slot', component: TaxSlotComponent },
     { path:'products', component: ProductsComponent },
    
   
];
