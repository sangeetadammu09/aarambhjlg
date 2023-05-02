import { Routes } from '@angular/router';
import { ApprovedOrderComponent } from 'src/app/pages/approved-order/approved-order.component';
import { MemberKycComponent } from 'src/app/pages/member-kyc/member-kyc.component';
import { OrderDetailsComponent } from 'src/app/pages/order-details/order-details.component';

export const SalesManagerLayoutRoutes: Routes = [

     { path:'member-kyc', component: MemberKycComponent },
     {path:'order-details', component: OrderDetailsComponent },
     { path:'approved-order', component: ApprovedOrderComponent },
     
   
     
   
];
