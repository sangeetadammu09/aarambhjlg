import { Routes } from '@angular/router';
import { MemberComponent } from 'src/app/pages/member/member.component';
import { CenterComponent } from 'src/app/pages/center/center.component';

export const SalesRelationLayoutRoutes: Routes = [

     { path:'center-list', component: CenterComponent },
     { path:'member-list', component: MemberComponent },
     
   
];
