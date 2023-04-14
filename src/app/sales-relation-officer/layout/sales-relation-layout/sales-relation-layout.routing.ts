import { Routes } from '@angular/router';
import { MemberComponent } from 'src/app/pages/member/member.component';
import { CenterComponent } from 'src/app/pages/center/center.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { ChangePasswordComponent } from 'src/app/pages/change-password/change-password.component';
import { MemberContactsComponent } from 'src/app/pages/member-contacts/member-contacts.component';

export const SalesRelationLayoutRoutes: Routes = [

     { path:'center-list', component: CenterComponent },
     { path:'member-list', component: MemberComponent },
     { path:'my-profile', component: ProfileComponent },
     { path:'change-password', component: ChangePasswordComponent },
     { path:'member-contacts', component: MemberContactsComponent },
     
   
     
   
];
