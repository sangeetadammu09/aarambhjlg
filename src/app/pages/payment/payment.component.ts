import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from 'express';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';
import { DataService } from 'src/app/utils/data.service';

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
  pageSize = 10;
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
  pageLoaded : boolean= false;
  paymentModeList = [{id:1, name: "Cash"}, {id:2, name: "UPI"},
                     {id:3, name: "Card"},{id:4, name: "Other"}]

  isItemAdded : boolean = false;
  
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
      if(data){
        data.installments.forEach((item:any) => {
          item.installmentDate = moment(item.installmentDate).format('L')
        })
        this.installmentCollectionList = data.installments;
        //console.log(this.installmentCollectionList)
        this.total = data.page.totalCount;
 
       }else{
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
   //console.log(item)
   this.selectedPayment = item;
   this.updatePaymentForm.patchValue({
    orderInstallmentId: item.orderInstallmentId,
    memberId: item.memberId,
    memberName: item.fullName,
    installmentNo: item.installmentNo,
    payingAmt: item.payableAmt,
    orderId: item.orderId,
    paidDate: moment().format('L'),
    paymentTakenById: this.userId
   })
   this._salesService.getOrderInstallmentHistory(item.orderId, item.memberId).subscribe((data:any) => {
    if(data){
      this.installmentCollectionHistoryList = data;
      //console.log(this.installmentCollectionHistoryList)
    //  this.total = data.page.totalCount;

     }else{
       this.installmentCollectionList = [];
     } 
   })
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
    if(data){
      this.closededitCollectionBtn.nativeElement.click();
      this.isItemAdded = false;
      this.toastrService.success("Installment paid successfully")
     }else{
       this.toastrService.error("Error while updating payment")
     } 
   })
}


}

