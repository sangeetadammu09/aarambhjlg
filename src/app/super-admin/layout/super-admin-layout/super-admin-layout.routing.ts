import { Routes } from '@angular/router';
import { BranchComponent } from 'src/app/pages/branch/branch.component';
import { CityComponent } from 'src/app/pages/city/city.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

export const SuperAdminLayoutRoutes: Routes = [


     { path:'city', component: CityComponent },
     { path:'branch', component: BranchComponent },
     { path:'dashboard', component: DashboardComponent },
   
];
