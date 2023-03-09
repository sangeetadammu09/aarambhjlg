import { Component, OnInit } from '@angular/core';
import { AdminList } from '../../../assets/menus/admin';


export interface RouteInfo {
    path: string;
    title: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/user',     title: 'User',   class: 'fa fa-user' },
    { path: '/payment',  title: 'Payment',  class: 'fa fa-money' },
    { path: '/report',   title: 'Report',  class: 'fa fa-bars' }
];

@Component({
    moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menuItems: any;
    
    ngOnInit() {
       // this.menuItems = ROUTES.filter(menuItem => menuItem);
       this.getMenuList();
    }

    getMenuList() {
        // this.menuItems =  MenuList.data;
        this.menuItems =  AdminList.data;
        
    }


    

    
}
