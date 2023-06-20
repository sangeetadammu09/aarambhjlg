import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-renew-membership',
  templateUrl: './renew-membership.component.html',
  styleUrls: ['./renew-membership.component.css']
})
export class RenewMembershipComponent implements OnInit {

  renewMembershipForm:FormGroup;
  submitted= false;
  isItemAdded = false;
  paymentModeList = [{id:1, name: "Cash"}, {id:2, name: "UPI"},
                     {id:3, name: "Card"},{id:4, name: "Other"}]
  collectFeesForm: any;
  memberDetailsObj: any;
  closeaddMemberBtn: any;
  userId = localStorage.getItem('userId');
  cityId = localStorage.getItem('userCity');
  todayDate = new Date().toJSON();
  centerDropdownList: any =[];
  memberDropdownList: any =[];

  constructor(private _salesService: SalesRelationService,
    private fb : FormBuilder, private _toastrService: ToastrService) { 
    this.renewMembershipForm = this.fb.group({
      centerId:[, Validators.required],
      memberId: [, Validators.required],
      startDate:[, Validators.required],
      expiryDate: [, Validators.required],
      registeredBy:[],
      createdDate:[],
      paymentDate:[, Validators.required],
      payingAmt: [, Validators.required],
      paymentMode:['', Validators.required],
      paymentComment: [,'']
    })
  }

  ngOnInit(): void {
    this.getSalesOfficersCenterList();
  }

  get g(){ return this.renewMembershipForm.controls};

  getSalesOfficersCenterList(){
    this._salesService.getSalesOfficersCenterList(this.userId,this.cityId).subscribe((data:any) => {
      ////console.log(data,'cco member')
        if(data.length > 0){
          this.centerDropdownList = data;
   
         }else{
           this.centerDropdownList = [];
         } 
       })
   
  }

  getCenterVal(event:any){
    var searchMemberId = event.target.value;
    this._salesService.getMemberListByCenter(searchMemberId).subscribe((data:any) => {
     // //console.log(data,'all memberDropdownList')
      if(data.length > 0){
        this.memberDropdownList = data;
       }else{
         this.memberDropdownList = [];
       } 
     })
  
  }

 submitRenewMembership(){
     this.isItemAdded = true;
     this.submitted = true;
     if(this.renewMembershipForm.valid){
         var renewMemData :any = {};
         renewMemData.memberId = this.collectFeesForm.controls['memberId'].value
        renewMemData.registeredBy = this.userId;
        var sDate = new Date(this.collectFeesForm.controls['startDate'].value);
        renewMemData.startDate = sDate.toISOString();
        var eDate = new Date(this.collectFeesForm.controls['expiryDate'].value);
        renewMemData.paymentDate = eDate.toISOString();
        var pDate = new Date(this.collectFeesForm.controls['paymentDate'].value);
        renewMemData.paymentDate = pDate.toISOString();
        
        renewMemData.feesCollectedBy = Number(this.userId);
        renewMemData.paidFees = Number(this.collectFeesForm.controls['paidFees'].value);
        renewMemData.paymentMode= this.collectFeesForm.controls['paymentMode'].value 
        renewMemData.paymentComment = this.collectFeesForm.controls['paymentComment'].value;
        renewMemData.createdDate = this.todayDate;
       
        this.isItemAdded = true;
        this._salesService.renewMembership(renewMemData).subscribe((data:any) => {
          if(data.status == 200){
            this.isItemAdded = false;
            this._toastrService.success('Membership renewed uccessfully!');
            this.closeaddMemberBtn.nativeElement.click();
  
          }
        })
         
      }else{
     
        return;
      } 
 }


}
