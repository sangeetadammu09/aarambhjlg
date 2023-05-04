import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from 'express';
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
  productList: any = []; 
  todayDate = new Date().toJSON();
  productObj:any ={};
  memberId: any;

  installmentDate:any
  centerId: any;
  

  constructor(private _salesService: SalesRelationService) { }

  ngOnInit(): void {
    this.getSalesOfficersCenterList();
    this.searchCenter = "";
  

 
  }

  getSalesOfficersCenterList(){
    this._salesService.getSalesOfficersCenterList(this.userId,this.cityId).subscribe((data:any) => {
      //console.log(data,'cco member')
        if(data.length > 0){
          this.centerDropdownList = data;
   
         }else{
           this.centerDropdownList = [];
         } 
       })
   
  }

  getCenterVal(event:any){
    this.centerId = event;

  }

  getinstallmentDate(date:any){
    this.installmentDate = date;
    this._salesService.getTodaysInstallmentCollectionList(this.centerId,this.userId,this.installmentDate,this.page,this.pageSize).subscribe((data:any) => {
      if(data.length > 0){
        this.installmentCollectionList = data;
        this.total = data.pages.totalCount;
 
       }else{
         this.installmentCollectionList = [];
       } 
     })
  }


  handlePageChange(event: number){
    //console.log(event)
    this.page = event;
    this.getinstallmentDate(this.installmentDate);
}


}

