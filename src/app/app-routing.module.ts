import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';

const routes: Routes = [{path: '', redirectTo: 'login',pathMatch: 'full'}, 
{path:'',component:LoginComponent},
{path:'register',component:RegisterComponent},
{
  path: 'admin',
  component: AdminLayoutComponent,
  children: [
      {path: '',loadChildren: () => 
      import('./admin/layout/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
}]},


{
  path: '**',
  redirectTo: 'login'
}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
