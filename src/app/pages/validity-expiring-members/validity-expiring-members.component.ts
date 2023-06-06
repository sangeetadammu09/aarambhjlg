import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-validity-expiring-members',
  templateUrl: './validity-expiring-members.component.html',
  styleUrls: ['./validity-expiring-members.component.css']
})
export class ValidityExpiringMembersComponent implements OnInit {

  cityid = localStorage.getItem('userCity');
  centerDropdownList: any = [];
  pageLoaded: boolean = true;
  memberList: any =[];
  page: number = 1;
  pageSize: any = 10;
  total:number = 0;
  searchCenter:string = '';

  constructor(private _salesService: SalesRelationService,private _adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllCentersByCityId();
   }
 
   getAllCentersByCityId(){
     this._adminService.getAllCentersByCityId(this.cityid).subscribe((data:any) => {
      if(data.length > 0){
        this.centerDropdownList = data;
       }else{
         this.centerDropdownList = [];
       }
       
     })
   }
 
   getAllValidityExpiringMembers(val:any){
     this.pageLoaded = false;
     this._salesService.getValidityExpiringMembers(val).subscribe((data) => {
         console.log(data)
         if(data.length > 0){
           this.memberList = data;
           this.pageLoaded = true;
    
          }else{
            this.memberList = [];
            this.pageLoaded = true;
          } 
        })
    
   }
  

}
