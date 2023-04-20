import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout.component';
import { LoginComponent } from './common/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { SalesRelationLayoutComponent } from './sales-relation-officer/layout/sales-relation-layout/sales-relation-layout/sales-relation-layout.component';
import { SalesManagerLayoutComponent } from './sales-manager-officer/layout/sales-manager-layout/sales-manager-layout/sales-manager-layout.component';

export const AppRoutes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'}, 
  {path:'',component:LoginComponent},
  //{path:'register',component:RegisterComponent},
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate:[AuthGuard],
    children: [
        {
      path: '',loadChildren: () => import('./admin/layout/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
  {
    path: 'sales-relation-officer',
    component: SalesRelationLayoutComponent,
    canActivate:[AuthGuard],
    children: [
        {
      path: '',loadChildren: () => 
      import('./sales-relation-officer/layout/sales-relation-layout/sales-relation-layout.module')
      .then(x => x.SalesRelationLayoutModule)
  }]},
  {
    path: 'sales-manager-officer',
    component: SalesManagerLayoutComponent,
    canActivate:[AuthGuard],
    children: [
        {
      path: '',loadChildren: () => 
      import('./sales-manager-officer/layout/sales-manager-layout/sales-manager-layout.module')
      .then(x => x.SalesManagerLayoutModule)
  }]},
  

  {
    path: '**',
    redirectTo: 'login'
  }
]
