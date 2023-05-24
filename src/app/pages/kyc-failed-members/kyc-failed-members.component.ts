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
  memberList: any;
  pageLoaded: boolean = false;
  page: any;
  pageSize: any;
  roleNo = localStorage.getItem('roleNo');
  memberDropdownList: any;
  cityList: any;
  centerList: any;
  searchMember:any = null;
  cityid = localStorage.getItem('userCity');

  constructor(private _salesService: SalesRelationService, private _formBuilder : FormBuilder,
    private _toastrService: ToastrService, private _adminService: AdminService,) { }

  ngOnInit(): void {
    this.getAllMemberDetails()
    this.getCenterDropdownByCityId();
    this.getOfficersCenterList();
    this.searchMember ="";
  }

  getAllMemberDetails(){
    this._salesService.getCenterWiseMemberList(this.cityid).subscribe((data) => {
        console.log(data,'all memberDropdownList')
        if(data.length > 0){
          this.memberList = data;
          this.pageLoaded = true;
   
         }else{
           this.memberList = [];
           this.pageLoaded = true;
         } 
       })
   
  }
  cityId(cityId: any) {
    throw new Error('Method not implemented.');
  }

  getOfficersCenterList(){
    var paginationObj :any ={};
    paginationObj.pageNo =this.page;
    paginationObj.pageSize = this.pageSize;
    if(this.roleNo == '101'){
      this._adminService.getCenterDropdownByCityId(this.cityId).subscribe((data) =>{
        console.log(data,'admin member')
        if(data.length > 0){
          this.memberDropdownList = data;
   
         }else{
           this.memberDropdownList = [];
         } 
       })

    }else if(this.roleNo == '102')
    this._salesService.getOfficersCenterList(this.cityId,this.userId).subscribe((data) => {
      console.log(data,'cco member')
        if(data.length > 0){
          this.memberDropdownList = data;
   
         }else{
           this.memberDropdownList = [];
         } 
       })
   
  }
  userId(cityId: any, userId: any) {
    throw new Error('Method not implemented.');
  }

  getMemberVal(event:any){
      var searchMemberId = event;
      this._salesService.getCenterWiseMemberList(searchMemberId).subscribe((data) => {
        console.log(data,'all memberDropdownList')
        if(data.length > 0){
          this.memberList = data;
   
         }else{
           this.memberList = [];
         } 
       })
    
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

  getCenterDropdownByCityId(){
    this._adminService.getCenterDropdownByCityId(this.cityId).subscribe((data) => {
     // console.log(data,'all Managers')
     if(data.length > 0){
       this.centerList = data;
      }else{
        this.centerList = [];
      }
      
    })
  }



  handlePageChange(event: number){
    console.log(event)
    this.page = event;
    this.getAllMemberDetails();
}

}
