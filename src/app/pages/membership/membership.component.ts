import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  
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
  pageLoaded = true;
  memberDetails: any = [];
  collectFeesForm: FormGroup;
  submitted= false;
  isItemAdded = false;
  paymentModeList = [{id:1, name: "Cash"}, {id:2, name: "UPI"},
                     {id:3, name: "Card"},{id:4, name: "Other"}]
  memberDetailsObj: any ={};
  @ViewChild('closeaddMemberBtn') closeaddMemberBtn: any;
  
  constructor(private _salesService: SalesRelationService, private _adminService: AdminService,
    private fb : FormBuilder, private _toastrService: ToastrService) {
    this.collectFeesForm = this.fb.group({
      feesCollectedBy: [],
      memberId: [],
      memberName:[],
      subcriptionId: [],
      paidFees: [, Validators.required],
      paymentMode:['', Validators.required],
      paymentComment: [,'']
    })
   }

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
        //console.log(data,'admin member')
        if(data.length > 0){
          this.memberDropdownList = data;
   
         }else{
           this.memberDropdownList = [];
         } 
       })

    }
    else if(this.roleNo == '102'){
    this._salesService.getOfficersCenterList(this.cityId,this.userId).subscribe((data:any) => {
      //console.log(data,'cco member')
        if(data.length > 0){
          this.memberDropdownList = data;
   
         }else{
           this.memberDropdownList = [];
         } 
       })
      }
   
  }
  
  getMemberVal(event:any){
    this.pageLoaded = false
    var searchMemberId =event;
    this._salesService.getMembershipsOverview(searchMemberId,this.page,this.pageSize).subscribe((data:any) => {
      if(data.membershipList.length > 0){
        this.pageLoaded = true
        this.memberList = data.membershipList;

        this.total = data.page.totalCount;

       }else{
         this.memberList = [];
         this.pageLoaded = false
       }
     })
  
}


  handlePageChange(event: number){
    //console.log(event)
    this.page = event;
    this.getMemberVal(event);
}

  showMemberModal(item:any){
    console.log(item)
    this.memberDetailsObj = item;
    this._salesService.getMembershipPendingFeesDetails(item.memberId,item.subcriptionId).subscribe((data:any) =>{
      if(data){
        this.memberDetails = data;
      }
    
    })

    this.collectFeesForm.patchValue({
      memberId: item.memberId,
      memberName:item.memberName,
      subcriptionId: item.subcriptionId
    })
    
  }

 get g(){ return this.collectFeesForm.controls}

 submitFees(){
     this.isItemAdded = true;

     this.submitted = true;
     if(this.collectFeesForm.valid){
         var collectFeesData :any = {};
       
        collectFeesData.memberId = this.memberDetailsObj.memberId;
        collectFeesData.subcriptionId = this.memberDetailsObj.subcriptionId;
        collectFeesData.feesCollectedBy = Number(this.userId);
        collectFeesData.paidFees = Number(this.collectFeesForm.controls['paidFees'].value);
        collectFeesData.paymentMode= this.collectFeesForm.controls['paymentMode'].value 
        collectFeesData.paymentComment = this.collectFeesForm.controls['paymentComment'].value;
       
        this.isItemAdded = true;
        this._salesService.collectFees(collectFeesData).subscribe((data:any) => {
          if(data.status == 200){
            this.isItemAdded = false;
            this._toastrService.success('Fee Collected successfully!');
            this.closeaddMemberBtn.nativeElement.click();
  
          }
        })
         
      }else{
     
        return;
      } 
 }

}
