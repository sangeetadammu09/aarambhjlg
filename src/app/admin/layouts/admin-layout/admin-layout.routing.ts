import { Routes } from '@angular/router';
import { CityComponent } from 'src/app/Pages/city/city.component';
import { ExpenseTypeComponent } from 'src/app/Pages/expense-type/expense-type.component';
import { InstallmentsComponent } from 'src/app/Pages/installments/installments.component';
import { ProductCategoryComponent } from 'src/app/Pages/product-category/product-category.component';
import { ProductsComponent } from 'src/app/Pages/products/products.component';
import { TaxSlotComponent } from 'src/app/Pages/tax-slot/tax-slot.component';
import { UnitComponent } from 'src/app/Pages/unit/unit.component';



export const AdminLayoutRoutes: Routes = [
    
    { path:'product-category', component: ProductCategoryComponent },
    { path:'unit', component: UnitComponent },
    { path:'tax-slot', component: TaxSlotComponent },
    { path:'products', component: ProductsComponent },
    { path:'city', component: CityComponent },
    { path:'expense-type', component: ExpenseTypeComponent },
    { path:'installments', component: InstallmentsComponent },
  

  
   
];
