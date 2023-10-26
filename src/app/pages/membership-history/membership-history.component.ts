import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-membership-history',
  templateUrl: './membership-history.component.html',
  styleUrls: ['./membership-history.component.css']
})
export class MembershipHistoryComponent implements OnInit {

  memberList: any =[];
  MembersFound: boolean = false;
  page = 1;
  total = 20;
  pageSize = 10;
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId');
  roleNo = localStorage.getItem('roleNo');
  centerDropdownList:any = [];
  memberDropdownList: any =[];
  searchMember:any;
  searchCenter:any
  pageLoaded = true;

  
  constructor(private _salesService: SalesRelationService, private _adminService: AdminService,) {
    
   }

  ngOnInit(): void {
    this.getOfficersCenterList();
    this.searchMember ="";
    this.searchCenter = "";
  }

  getOfficersCenterList(){
    var paginationObj :any ={};
    paginationObj.pageNo =this.page;
    paginationObj.pageSize = this.pageSize;
    if(this.roleNo == '101'){
      this._adminService.getCenterDropdownByCityId(this.cityId).subscribe((data:any) =>{
        //console.log(data,'admin member')
        if(data.length > 0){
          this.centerDropdownList = data;
   
         }else{
           this.centerDropdownList = [];
         } 
       })

    }
    else if(this.roleNo == '102'){
    this._salesService.getOfficersCenterList(this.cityId,this.userId).subscribe((data:any) => {
      //console.log(data,'cco member')
        if(data.length > 0){
          this.centerDropdownList = data;
   
         }else{
           this.centerDropdownList = [];
         } 
       })
      }
   
  }

  getCenterVal(event: any) {
    var searchCenterId = event;
    this._salesService.getMemberListByCenter(searchCenterId).subscribe((data: any) => {
      // //console.log(data,'all memberDropdownList')
      if (data.length > 0) {
        this.memberDropdownList = data;

        //  this.total = data.page.totalCount;

      } else {
        this.memberDropdownList = [];
      }
    })

  }

  
  getMemberVal(event:any){
    this.pageLoaded = false
    var searchMemberId =event;
    this._salesService.getIndividualMembershipPendingFeesHistory(searchMemberId,this.page,this.pageSize).subscribe((data:any) => {
      if(data.membershipList.length > 0){
        this.pageLoaded = true
        this.memberList = data.membershipList;

        this.total = data.page.totalCount;

       }else{
         this.memberList = [];
         this.pageLoaded = false
       }
     },(error:HttpErrorResponse) => {
        console.log(error,'error')
        if(error.status == 404){
          this.pageLoaded = true
          this.memberList = [];
        }
     })
  
}


  handlePageChange(event: number){
    //console.log(event)
    this.page = event;
    this.getMemberVal(event);
}

}
