import { Routes } from '@angular/router';
import { ApprovedOrderComponent } from 'src/app/pages/approved-order/approved-order.component';
import { CenterwiseCollectionComponent } from 'src/app/pages/centerwise-collection/centerwise-collection.component';
import { ChangePasswordComponent } from 'src/app/pages/change-password/change-password.component';
import { CollectionHistoryComponent } from 'src/app/pages/collection-history/collection-history.component';
import { CompletedOrdersComponent } from 'src/app/pages/completed-orders/completed-orders.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { DispatchedOrdersComponent } from 'src/app/pages/dispatched-orders/dispatched-orders.component';
import { KycFailedUsersComponent } from 'src/app/pages/kyc-failed-users/kyc-failed-users.component';
import { MemberKycComponent } from 'src/app/pages/member-kyc/member-kyc.component';
import { OrderDetailsComponent } from 'src/app/pages/order-details/order-details.component';
import { ProductDetailComponent } from 'src/app/pages/product-detail/product-detail.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { ReturnedOrdersComponent } from 'src/app/pages/returned-orders/returned-orders.component';
import { ValidityExpiringMembersComponent } from 'src/app/pages/validity-expiring-members/validity-expiring-members.component';

export const SalesManagerLayoutRoutes: Routes = [

     { path:'member-kyc', component: MemberKycComponent },
     {path:'order-details', component: OrderDetailsComponent },
     { path:'approved-order', component: ApprovedOrderComponent },
     { path:'my-profile', component: ProfileComponent },
     { path:'change-password', component: ChangePasswordComponent },
     { path:'product-details', component: ProductDetailComponent },
     { path:'returned-orders', component: ReturnedOrdersComponent },
     { path:'dashboard', component: DashboardComponent },
     { path:'kyc-failed-users', component: KycFailedUsersComponent },
     {path: 'validity-expiring-members', component: ValidityExpiringMembersComponent },
     {path:'dispatched-orders', component: DispatchedOrdersComponent },
     {path:'completed-orders', component: CompletedOrdersComponent },
     {path:'collection-history', component: CollectionHistoryComponent},
     {path:'centerwise-collection',component: CenterwiseCollectionComponent},
   
     
   
];
