import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-kyc-failed-members',
  templateUrl: './kyc-failed-members.component.html',
  styleUrls: ['./kyc-failed-members.component.css']
})
export class KycFailedMembersComponent implements OnInit {
  memberList: any =[];
  pageLoaded: boolean = false;
  page: number = 1;
  pageSize: any = 10;
  total:number = 0;
  roleNo = localStorage.getItem('roleNo');
  cityid = localStorage.getItem('userCity');
  cityList: any = [];

  constructor(private _salesService: SalesRelationService, private _adminService: AdminService,) { }

  ngOnInit(): void {
   this.getAllFailedMembersDetails()
  }

  getAllFailedMembersDetails(){
    this._salesService.getKycFailedMembers(this.cityid, this.page, this.pageSize).subscribe((data) => {
        //console.log(data,'all memberList')
        if(data.length > 0){
          this.memberList = data;
          this.pageLoaded = true;
          this.total = data.pages.totalCount;
   
         }else{
           this.memberList = [];
           this.pageLoaded = true;
         } 
       })
   
  }

  handlePageChange(event: number){
    
    this.page = event;
    this.getAllFailedMembersDetails();
}
 

  getAllCitys(){
    this._adminService.getAllCity().subscribe((data) => {
     if(data.length > 0){
       this.cityList = data;
      }else{
        this.cityList = [];
      }
      
    })
  }

  

}
