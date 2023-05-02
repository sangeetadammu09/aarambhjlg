import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-member-contacts',
  templateUrl: './member-contacts.component.html',
  styleUrls: ['./member-contacts.component.css']
})
export class MemberContactsComponent implements OnInit {

  memberList: any =[];
  MembersFound: boolean = false;
  page = 1;
  total = 20;
  pageSize = 10;
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId');
  roleNo = localStorage.getItem('roleNo');
  memberDropdownList: any =[];
  searchMember:any
  
  constructor(private _salesService: SalesRelationService, private _adminService: AdminService ) { }

  ngOnInit(): void {
    this.getOfficersCenterList();
    this.searchMember ="";
  }

  getOfficersCenterList(){
    var paginationObj :any ={};
    paginationObj.pageNo =this.page;
    paginationObj.pageSize = this.pageSize;
    if(this.roleNo == '101'){
      this._adminService.getCenterDropdownByCityId(this.cityId).subscribe((data:any) =>{
        console.log(data,'admin member')
        if(data.length > 0){
          this.memberDropdownList = data;
   
         }else{
           this.memberDropdownList = [];
         } 
       })

    }
    else if(this.roleNo == '102'){
    this._salesService.getOfficersCenterList(this.cityId,this.userId).subscribe((data:any) => {
      console.log(data,'cco member')
        if(data.length > 0){
          this.memberDropdownList = data;
   
         }else{
           this.memberDropdownList = [];
         } 
       })
      }
   
  }
  
  getMemberVal(event:any){
    var searchMemberId = event;
    this._salesService.getMemberContacts(searchMemberId,this.page,this.pageSize).subscribe((data:any) => {
      console.log(data,'all memberDropdownList')
      if(data.members.length > 0){
        this.memberList = data.members;

        this.total = data.page.totalCount;

       }else{
         this.memberList = [];
       } 
     })
  
}


  handlePageChange(event: number){
    console.log(event)
    this.page = event;
    this.getMemberVal(event);
}

}
