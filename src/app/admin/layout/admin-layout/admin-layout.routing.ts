import { Routes } from '@angular/router';
import { BranchComponent } from 'src/app/pages/branch/branch.component';
import { CityComponent } from 'src/app/pages/city/city.component';
import { ExpenseTypeComponent } from 'src/app/pages/expense-type/expense-type.component';
import { InstallmentsComponent } from 'src/app/pages/installments/installments.component';
import { ProductBrandComponent } from 'src/app/pages/product-brand/product-brand.component';
import { ProductCategoryComponent } from 'src/app/pages/product-category/product-category.component';
import { ProductPriceComponent } from 'src/app/pages/product-price/product-price.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { TaxSlotComponent } from 'src/app/pages/tax-slot/tax-slot.component';
import { UnitComponent } from 'src/app/pages/unit/unit.component';
import { UserComponent } from 'src/app/pages/user/user.component';
import { UserroleComponent } from 'src/app/pages/userrole/userrole.component';

export const AdminLayoutRoutes: Routes = [
    
     { path:'product-category', component: ProductCategoryComponent },
     { path:'product-brand', component: ProductBrandComponent },
     { path:'product-price', component: ProductPriceComponent },
     { path:'unit', component: UnitComponent },
     { path:'user-list', component: UserComponent },
     { path:'user-role', component: UserroleComponent },
     { path:'tax-slot', component: TaxSlotComponent },
     { path:'product-list', component: ProductsComponent },
     { path:'city', component: CityComponent },
     { path:'branch', component: BranchComponent },
     { path:'expense-type', component: ExpenseTypeComponent },
     { path:'installments', component: InstallmentsComponent },
   
];
