import { Routes } from '@angular/router';
import { ApprovedOrderComponent } from 'src/app/pages/approved-order/approved-order.component';
import { ChangePasswordComponent } from 'src/app/pages/change-password/change-password.component';
import { MemberKycComponent } from 'src/app/pages/member-kyc/member-kyc.component';
import { OrderDetailsComponent } from 'src/app/pages/order-details/order-details.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';

export const SalesManagerLayoutRoutes: Routes = [

     { path:'member-kyc', component: MemberKycComponent },
     {path:'order-details', component: OrderDetailsComponent },
     { path:'approved-order', component: ApprovedOrderComponent },
     { path:'my-profile', component: ProfileComponent },
     { path:'change-password', component: ChangePasswordComponent },
     
   
     
   
];
