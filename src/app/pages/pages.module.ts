import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductsComponent } from './products/products.component';
import { TaxSlotComponent } from './tax-slot/tax-slot.component';
import { UnitComponent } from './unit/unit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CityComponent } from './city/city.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { InstallmentsComponent } from './installments/installments.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { BranchComponent } from './branch/branch.component';
import { UserComponent } from './user/user.component';
import { ProductPriceComponent } from './product-price/product-price.component';
import { UserroleComponent } from './userrole/userrole.component';
import { CustomSharedModule } from '../shared.module';
import { CenterComponent } from './center/center.component';
import { GroupComponent } from './group/group.component';
import { MemberComponent } from './member/member.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserContactsComponent } from './user-contacts/user-contacts.component';
import { MemberContactsComponent } from './member-contacts/member-contacts.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserKycComponent } from './user-kyc/user-kyc.component';
import { MemberKycComponent } from './member-kyc/member-kyc.component';
import { NeworderComponent } from './neworder/neworder.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ApprovedOrderComponent } from './approved-order/approved-order.component';
import { PaymentComponent } from './payment/payment.component';
import { ReturnorderComponent } from './returnorder/returnorder.component';
import { ReturnedOrdersComponent } from './returned-orders/returned-orders.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,CustomSharedModule,PdfViewerModule
  
  ],
  declarations: [
    ProductCategoryComponent,
    UnitComponent,
    TaxSlotComponent,
    ProductsComponent,
    CityComponent,
    ExpenseTypeComponent,
    InstallmentsComponent,
    ProductBrandComponent,
    BranchComponent,
    UserComponent,
    ProductPriceComponent,
    UserroleComponent,
    CenterComponent,
    GroupComponent,
    MemberComponent,
    ProfileComponent,
    ChangePasswordComponent,
    UserContactsComponent,
    MemberContactsComponent,
    ProductDetailComponent,
    UserKycComponent,
    MemberKycComponent,
    NeworderComponent,
    ViewcartComponent,
    OrderDetailsComponent,
    ApprovedOrderComponent,
    PaymentComponent,
    ReturnorderComponent,
    ReturnedOrdersComponent
  ]
})

export class PagesModule {}
