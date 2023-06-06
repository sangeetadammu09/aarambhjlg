import { Routes } from '@angular/router';
import { MemberComponent } from 'src/app/pages/member/member.component';
import { CenterComponent } from 'src/app/pages/center/center.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { ChangePasswordComponent } from 'src/app/pages/change-password/change-password.component';
import { MemberContactsComponent } from 'src/app/pages/member-contacts/member-contacts.component';
import { ProductDetailComponent } from 'src/app/pages/product-detail/product-detail.component';
import { MemberKycComponent } from 'src/app/pages/member-kyc/member-kyc.component';
import { NeworderComponent } from 'src/app/pages/neworder/neworder.component';
import { ViewcartComponent } from 'src/app/pages/viewcart/viewcart.component';
import { ApprovedOrderComponent } from 'src/app/pages/approved-order/approved-order.component';
import { PaymentComponent } from 'src/app/pages/payment/payment.component';
import { ReturnorderComponent } from 'src/app/pages/returnorder/returnorder.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { KycFailedMembersComponent } from 'src/app/pages/kyc-failed-members/kyc-failed-members.component';
import { ValidityExpiringMembersComponent } from 'src/app/pages/validity-expiring-members/validity-expiring-members.component';

export const SalesRelationLayoutRoutes: Routes = [

     { path:'center-list', component: CenterComponent },
     { path:'member-kyc', component: MemberKycComponent },
     { path:'member-list', component: MemberComponent },
     { path:'my-profile', component: ProfileComponent },
     { path:'change-password', component: ChangePasswordComponent },
     { path:'member-contacts', component: MemberContactsComponent },
     { path:'product-details', component: ProductDetailComponent },
     { path:'new-order', component: NeworderComponent },
     { path:'view-cart', component: ViewcartComponent },
     { path:'approved-order', component: ApprovedOrderComponent },
     { path:'collections', component: PaymentComponent },
     { path:'returnorder', component: ReturnorderComponent },
     { path:'dashboard', component: DashboardComponent },
     { path:'kyc-failed-members', component: KycFailedMembersComponent },
     {path: 'validity-expiring-members', component: ValidityExpiringMembersComponent },
  
];
