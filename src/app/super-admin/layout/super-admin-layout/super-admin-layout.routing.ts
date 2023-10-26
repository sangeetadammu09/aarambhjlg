import { Routes } from '@angular/router';
import { BranchComponent } from 'src/app/pages/branch/branch.component';
import { CenterwiseCollectionComponent } from 'src/app/pages/centerwise-collection/centerwise-collection.component';
import { CityComponent } from 'src/app/pages/city/city.component';
import { CollectionHistoryComponent } from 'src/app/pages/collection-history/collection-history.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

export const SuperAdminLayoutRoutes: Routes = [


     { path:'city', component: CityComponent },
     { path:'branch', component: BranchComponent },
     { path:'dashboard', component: DashboardComponent },
     {path:'collection-history', component: CollectionHistoryComponent},
     {path:'centerwise-collection',component: CenterwiseCollectionComponent},

   
];
