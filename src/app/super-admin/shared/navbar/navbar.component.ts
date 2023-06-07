import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { SuperAdminList } from 'src/assets/menus/admin';
import { CommonService } from 'src/app/common/service/common.service';
import { MasterService } from 'src/app/master.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SuperAdminService } from '../../service/super-admin.service';



@Component({
    moduleId: module.id,
    selector: 'app-super-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
    private listTitles!: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton:any;
    private sidebarVisible: boolean;
    userName = localStorage.getItem('fullname');
    userRoles = localStorage.getItem('roles');
    public menuItems: any;
    userId = localStorage.getItem('userId');
    public isCollapsed = true;
    @ViewChild("navbar-cmp", {static: false}) button:any;
    userPhoto: any;
    cityId = localStorage.getItem('userCity');
    userCity :any

    constructor(location:Location, private renderer : Renderer2, private element : ElementRef,private superadmin : SuperAdminService,
       private router: Router, private _commonService: CommonService, private masterService: MasterService) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
      this.getUserPic();
       // this.listTitles = MenuList.data;
     //   console.log(this.listTitles);
     if(this.userRoles){
      var temp = JSON.parse(this.userRoles);
      const finalArray = temp.map((item:any, index:number) => ({ id: index,name: item }))
      this.userRoles = finalArray;
    }
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });
      this.getMenuList();
      this.superadmin.getCityById(this.cityId).subscribe((data:any) => {
        this.userCity = data.cityName
      })
    }

    getMenuList() {
      // this.menuItems =  MenuList.data;
      this.menuItems =  SuperAdminList.data;
     
      
  }

  getUserPic(){
    if(this.userId)
    this.userId = JSON.parse(this.userId)
    this._commonService.getUserProfilePicture(this.userId).subscribe((user:any) => {
        if(user){
          this.userPhoto = user.body.photoUrl;
        }
    }, (err:HttpErrorResponse)=>{
      if(err.status == 0){
        this.userPhoto = '../../../../assets/images/user.png'
  }
    })
   
  }


   
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      };

      sidebarClose() {
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          if (window.innerWidth < 991) {
            setTimeout(function(){
              mainPanel.style.position = '';
            }, 500);
          }
         // this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          html.classList.remove('nav-open');
      };
      collapse(){
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        console.log(navbar);
        if (!this.isCollapsed) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-white');
        }else{
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-white');
        }

      }

      // logoutUser(){
      //   console.log('user logged out')
      //   localStorage.clear();
      //   this.router.navigate(['/'])
      // }

      logout(){
        const token :any= this.masterService.getToken();
        const refreshToken:any = this.masterService.getRefreshToken();
        var logoutTokenObj = new FormData();
        logoutTokenObj.append('accessToken',token);
        logoutTokenObj.append('refreshToken',refreshToken);
  
         this._commonService.logout(logoutTokenObj).subscribe((result:any) => {
      
          localStorage.clear();
          this.router.navigate(['/'])
         })
      }
      
      myProfile(){
        this.router.navigate(['/sales-manager-officer/my-profile'])
      }

      changePassword(){
        this.router.navigate(['/sales-manager-officer/change-password'])
      }


}