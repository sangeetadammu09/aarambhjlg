import { Routes } from '@angular/router';
import { MemberComponent } from 'src/app/pages/member/member.component';
import { CenterComponent } from 'src/app/pages/center/center.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';

export const SalesRelationLayoutRoutes: Routes = [

     { path:'center-list', component: CenterComponent },
     { path:'member-list', component: MemberComponent },
     { path:'my-profile', component: ProfileComponent },
     
   
];
