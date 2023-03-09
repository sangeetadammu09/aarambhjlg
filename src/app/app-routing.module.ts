import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';

import { AuthGuard } from './guard/auth.guard';

export const AppRoutes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'}, 
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate:[AuthGuard],
    children: [
        {
      path: '',loadChildren: () => import('./admin/layout/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
  

  {
    path: '**',
    redirectTo: 'login'
  }
]
