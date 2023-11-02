import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-centerwise-collection',
  templateUrl: './centerwise-collection.component.html',
  styleUrls: ['./centerwise-collection.component.css']
})
export class CenterwiseCollectionComponent implements OnInit {
  installmentCollectionList: any =[];
  MembersFound: boolean = false;
  page = 1;
  total = 20;
  pageSize = 100;
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId');
  roleNo = localStorage.getItem('roleNo');
  roles = localStorage.getItem('roles');
  cityDropdownList: any =[];
  centerDropdownList :any =[]
  searchCity:any;
  searchProduct:any;
  searchCenter:any;
  startDate :any;
  endDate:any;
  installmentCollectionHistoryList: any = []; 
  todayDate = new Date().toJSON();
  productObj:any ={};
  memberId: any;
  centerwisePaymentOverviewObj :any = {};
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
   
  }

  ngOnInit(): void {
    this.getSalesOfficersCenterList();
    this.searchCenter = "";
    this.searchCity ="";
 
  }

 
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
    this.centerId = event;
  
  }


 

  getCenterwisePaidMembersList(){
    this.getCenterwisePaymentOverview()
    var paymentObj :any = {};
    // paymentObj.pageNumber = this.page,
    // paymentObj.pageSize = this.pageSize,
    paymentObj.cityId = this.cityId,
    paymentObj.centerId = this.centerId,
    paymentObj.startDate = this.startDate,
    paymentObj.endDate = this.endDate,

    this._salesService.getCenterwisePaidMembersList(paymentObj).subscribe((data:any) => {
      console.log(data)
      if(data.length > 0) {
      this.installmentCollectionList = data;
       console.log(this.installmentCollectionList)
      //  this.total = data.page.totalCount;
 
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
    this.getCenterwisePaidMembersList();
}


getCenterwisePaymentOverview(){
  var paymentObj :any = {};
    paymentObj.cityId = this.cityId,
    paymentObj.centerId = this.centerId,
    paymentObj.startDate = this.startDate,
    paymentObj.endDate = this.endDate,
  this._salesService.getCenterwisePaymentOverview(paymentObj).subscribe((data:any) =>{
    console.log(data)
    if(data){
      this.centerwisePaymentOverviewObj = data;
      //console.log(this.orderDetailsObj)
    }
  })


}







}
