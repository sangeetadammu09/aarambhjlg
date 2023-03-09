import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './Admin/layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './Common/login/login.component';
import { RegisterComponent } from './Common/register/register.component';
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
      path: '',loadChildren: () => import('./Admin/layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
  

  {
    path: '**',
    redirectTo: 'login'
  }
]
