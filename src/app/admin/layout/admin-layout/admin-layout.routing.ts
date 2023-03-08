import { Routes } from '@angular/router';
import { CityComponent } from 'src/app/pages/city/city.component';
import { ExpenseTypeComponent } from 'src/app/pages/expense-type/expense-type.component';
import { InstallmentsComponent } from 'src/app/pages/installments/installments.component';
import { ProductCategoryComponent } from 'src/app/pages/product-category/product-category.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { TaxSlotComponent } from 'src/app/pages/tax-slot/tax-slot.component';
import { UnitComponent } from 'src/app/pages/unit/unit.component';

export const AdminLayoutRoutes: Routes = [
    
     { path:'product-category', component: ProductCategoryComponent },
     { path:'unit', component: UnitComponent },
     { path:'tax-slot', component: TaxSlotComponent },
     { path:'products', component: ProductsComponent },
     { path:'city', component: CityComponent },
     { path:'expense-type', component: ExpenseTypeComponent },
     { path:'installments', component: InstallmentsComponent },
   
];
