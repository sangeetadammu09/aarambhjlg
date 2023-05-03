import { Routes } from '@angular/router';
import { BranchComponent } from 'src/app/pages/branch/branch.component';
import { CenterComponent } from 'src/app/pages/center/center.component';
import { ChangePasswordComponent } from 'src/app/pages/change-password/change-password.component';
import { CityComponent } from 'src/app/pages/city/city.component';
import { ExpenseTypeComponent } from 'src/app/pages/expense-type/expense-type.component';
import { GroupComponent } from 'src/app/pages/group/group.component';
import { InstallmentsComponent } from 'src/app/pages/installments/installments.component';
import { MemberContactsComponent } from 'src/app/pages/member-contacts/member-contacts.component';
import { MemberComponent } from 'src/app/pages/member/member.component';
import { ProductBrandComponent } from 'src/app/pages/product-brand/product-brand.component';
import { ProductCategoryComponent } from 'src/app/pages/product-category/product-category.component';
import { ProductDetailComponent } from 'src/app/pages/product-detail/product-detail.component';
import { ProductPriceComponent } from 'src/app/pages/product-price/product-price.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { TaxSlotComponent } from 'src/app/pages/tax-slot/tax-slot.component';
import { UnitComponent } from 'src/app/pages/unit/unit.component';
import { UserContactsComponent } from 'src/app/pages/user-contacts/user-contacts.component';
import { UserKycComponent } from 'src/app/pages/user-kyc/user-kyc.component';
import { UserComponent } from 'src/app/pages/user/user.component';
import { UserroleComponent } from 'src/app/pages/userrole/userrole.component';

export const AdminLayoutRoutes: Routes = [
    
     { path:'product-category', component: ProductCategoryComponent },
     { path:'product-brand', component: ProductBrandComponent },
     { path:'product-price', component: ProductPriceComponent },
     { path:'product-details', component: ProductDetailComponent },
     { path:'unit', component: UnitComponent },
     { path:'user-list', component: UserComponent },
     { path:'user-kyc', component: UserKycComponent },
     { path:'center-list', component: CenterComponent },
     { path:'member-list', component: MemberComponent },
     { path:'group-list', component: GroupComponent },
     { path:'user-role', component: UserroleComponent },
     { path:'tax-slot', component: TaxSlotComponent },
     { path:'product-list', component: ProductsComponent },
     { path:'city', component: CityComponent },
     { path:'branch', component: BranchComponent },
     { path:'expense-type', component: ExpenseTypeComponent },
     { path:'installments', component: InstallmentsComponent },
     { path:'change-password', component: ChangePasswordComponent },
     { path:'user-contacts', component: UserContactsComponent },
     { path:'member-contacts', component: MemberContactsComponent },
     { path:'my-profile', component: ProfileComponent },
   
];
