import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  installmentCollectionList: any =[];
  MembersFound: boolean = false;
  page = 1;
  total = 20;
  pageSize = 100;
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId');
  roleNo = localStorage.getItem('roleNo');
  roles = localStorage.getItem('roles');
  memberDropdownList: any =[];
  centerDropdownList :any =[]
  searchMember:any;
  searchProduct:any;
  searchCenter:any;
  installmentCollectionHistoryList: any = []; 
  todayDate = new Date().toJSON();
  productObj:any ={};
  memberId: any;
  updatePaymentForm :FormGroup;
  installmentDate:any
  centerId: any;
  submitted : boolean = false;
  selectedPayment: any;
  @ViewChild ("closededitCollectionBtn") closededitCollectionBtn : any;
  @ViewChild ("closePaymentBtn") closePaymentBtn :any;
  @ViewChild ("openPaymentModal") openPaymentModal :any;
  pageLoaded : boolean= false;
  statusVal='';
  paymentModeList = [{id:1, name: "Cash"}, {id:2, name: "UPI"},{id:3, name: "Card"},{id:4, name: "Other"}]
  filterList = [{id:1, name: "Pending"},{id:2, name: "Todays"},{id:3, name: "Future"}]

  isItemAdded : boolean = false;
  @ViewChild ("statusChecked") statusChecked :any;
  collectableAmount: any;
  filteredData: any[] = []
  noFilterApplied  = true;
  masterSelected = false;
  totalAmount =0;
  paymentDetails: any ={};


  constructor(private _salesService: SalesRelationService, private fb :FormBuilder, private toastrService : ToastrService) { 
    this.updatePaymentForm = this.fb.group({
      orderInstallmentId: [],
      memberId: [],
      memberName:[],
      installmentNo: [],
      orderId: [],
      payingAmt: ['', Validators.required],
      paidDate: [, Validators.required],
      paymentMode:['', Validators.required],
      paymentComment: [,''],
      paymentTakenById: ['']
    })
  }

  ngOnInit(): void {
    this.getSalesOfficersCenterList();
    this.searchCenter = "";
    this.searchMember ="";
 
  }

  get g(){return this.updatePaymentForm.controls};

  getSalesOfficersCenterList(){
    this._salesService.getSalesOfficersCenterList(this.userId,this.cityId).subscribe((data:any) => {
      ////console.log(data,'cco member')
        if(data.length > 0){
          this.centerDropdownList = data;
          this.pageLoaded = true;
         }else{
           this.centerDropdownList = [];
           this.pageLoaded = true;
         } 
       })
   
  }

  getCenterVal(event:any){
    var searchMemberId = event;
    this.centerId = event;
    if(this.installmentDate !== undefined){
      this.getinstallmentDate(this.installmentDate);
    }
   
    this._salesService.getMemberListByCenter(searchMemberId).subscribe((data:any) => {
     //console.log(data,'all memberDropdownList')
      if(data.length > 0){
        this.memberDropdownList = data;
       }else{
         this.memberDropdownList = [];
       } 
     })
  
  }

  getMemberVal(event:any){
    this.memberId = event;
  
    console.log(event);
  }

 

  getinstallmentDate(date:any){
    this.installmentDate = date;
    var paymentObj :any = {};
    paymentObj.pageNumber = this.page,
    paymentObj.pageSize = this.pageSize,
    paymentObj.centerId = this.centerId,
    paymentObj.userId = this.userId,
    paymentObj.installmentDate = this.installmentDate,
    paymentObj.memberId = this.memberId ? this.memberId : 0
 
    this._salesService.getOrderInstallmentCollectionList(paymentObj).subscribe((data:any) => {
      console.log(data)
      if(data.installments.length > 0) {
        data.installments.forEach((item:any) => {
          item.installmentDate = moment(item.installmentDate).format('L');
          item.checked = false;
           this.totalAmount = this.totalAmount + item.payableAmt
        })
        this.collectableAmount = this.totalAmount;
        this.installmentCollectionList = data.installments;
       console.log(this.installmentCollectionList)
        this.total = data.page.totalCount;
 
       }else{
         this.installmentCollectionList = [];
       } 
     },(err:HttpErrorResponse)=>{
        if(err){
          this.installmentCollectionList = [];
        }
     })
  }


handlePageChange(event: number){
    ////console.log(event)
    this.page = event;
    this.getinstallmentDate(this.installmentDate);
}

showeditCollectionModal(item:any){
  this.submitted = false;
  this.updatePaymentForm.reset();
  this.updatePaymentForm.markAsUntouched();
  this.updatePaymentForm.markAsPristine();
   console.log(item)
   this.selectedPayment = item;
   this.updatePaymentForm.patchValue({
    orderInstallmentId: item.orderInstallmentId,
    memberId: item.memberId,
    memberName: item.fullName,
    installmentNo: item.installmentNo,
    //payingAmt: item.payableAmt,
    orderId: item.orderId,
   // paidDate: moment().format('L'),
    paymentTakenById: this.userId
   })
   this._salesService.getOrderInstallmentHistory(item.orderId, item.memberId).subscribe((data:any) => {
    if(data){
      this.installmentCollectionHistoryList = data;
      console.log(this.installmentCollectionHistoryList)
    //  this.total = data.page.totalCount;

     }else{
       this.installmentCollectionList = [];
     } 
   })
}

showPayentModal(){
  //console.log(this.updatePaymentForm.value)
  this.submitted = true;
  if(this.updatePaymentForm.valid){
  this.openPaymentModal.nativeElement.click();
  this.paymentDetails =this.updatePaymentForm.value;
  }else{
    return;
  }
}

cancelPayment(){
    this.closePaymentBtn.nativeElement.click();
}

submitUpdatePayment(){
  var paymentObj :any = {};
  paymentObj.orderInstallmentId = this.selectedPayment.orderInstallmentId,
  paymentObj.memberId = this.selectedPayment.memberId,
  paymentObj.installmentNo = this.selectedPayment.installmentNo
  paymentObj.orderId =  this.selectedPayment.orderId,
  paymentObj.paidDate= moment().format(),
  paymentObj.paymentMode = this.updatePaymentForm.controls['paymentMode'].value,
  paymentObj.paymentComment= this.updatePaymentForm.controls['paymentComment'].value,
  paymentObj.paymentTakenById = Number(this.userId)
  paymentObj.payingAmt = Number( this.updatePaymentForm.controls['payingAmt'].value);
  this.isItemAdded = true;
  this._salesService.makeInstallmentPayment(paymentObj).subscribe((data:any) => {
   // console.log(data.status)
    if(data.status == 200){
      this.closePaymentBtn.nativeElement.click();
      this.closededitCollectionBtn.nativeElement.click();
      this.getSalesOfficersCenterList();
      
      this.isItemAdded = false;
      this.toastrService.success("Installment paid successfully")
     }else{
       this.toastrService.error("Error while updating payment")
     } 
   })
}

getCheckBoxVal(event:any,status:any){
  let checkStatus = event.target.checked;
  let filterVal = status.name;
 
  if(filterVal == 'Select All' && checkStatus == true){
    this.getinstallmentDate(this.installmentDate)
  }
  
  if(filterVal == 'Pending' && checkStatus == true){
  debugger;
  this.installmentCollectionList = this.installmentCollectionList.filter((x:any)=>x.status = "Pending");
  console.log(this.installmentCollectionList)
  }else if(filterVal == 'Pending' && checkStatus == false){
  this.getinstallmentDate(this.installmentDate)
  }

  if(filterVal == 'Future' && checkStatus == true){
    this.installmentCollectionList = this.installmentCollectionList.filter((x:any)=>x.status == "Future");
  }else if(filterVal == 'Future' && checkStatus == false){
    this.getinstallmentDate(this.installmentDate)
  }

  if(filterVal == 'Todays' && checkStatus == true){
    this.installmentCollectionList = this.installmentCollectionList.filter((x:any)=>x.status == "Todays");
    console.log(this.installmentCollectionList)
    }else if(filterVal == 'Todays' && checkStatus == false){
    this.getinstallmentDate(this.installmentDate)
    }

}

sendCheckedCollection(){
  this.noFilterApplied = false;
  
  this.filterList.forEach((x:any) => {
     this.installmentCollectionList.forEach((y:any) => {
       if(y.status.includes(x.name) && x.checked == true) {
         y.checked = true;
       }else if(x.name == y.status && x.checked == false){
        y.checked = false;
       }
     })
  })
  this.filteredData = this.installmentCollectionList.filter((x:any) => x.checked );
  console.log(this.filteredData)
  this.totalAmount = 0;
   this.filteredData.forEach((item:any) => {
     this.totalAmount = this.totalAmount + item.payableAmt
  })
  this.collectableAmount = this.totalAmount;

  this.masterSelected = this.installmentCollectionList.every((item:any) => item.checked == true);
  //console.log(this.filteredData);
}

checkUncheckAll(evt:any) {
  this.filterList.forEach((c:any) => c.checked = evt.target.checked)
  this.sendCheckedCollection();

}




}

