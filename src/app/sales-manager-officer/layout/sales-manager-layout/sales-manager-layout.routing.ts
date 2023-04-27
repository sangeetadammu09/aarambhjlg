import { Routes } from '@angular/router';
import { MemberKycComponent } from 'src/app/pages/member-kyc/member-kyc.component';
import { OrderDetailsComponent } from 'src/app/pages/order-details/order-details.component';

export const SalesManagerLayoutRoutes: Routes = [

     { path:'member-kyc', component: MemberKycComponent },
     {path:'order-details', component: OrderDetailsComponent },
     
   
     
   
];
