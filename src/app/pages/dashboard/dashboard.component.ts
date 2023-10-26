import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';
import { DateTime } from 'src/assets/dist/libs/litepicker/dist/types/datetime';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId = localStorage.getItem('userId');
  cityId = localStorage.getItem('userCity');
  centerName = "";
  centerList =[];
  orderList =[];
  receivablePayments : number = 0.1;
  pendingPayments : number =0;
  collectedPayments : number = 0;
  collectedPending : number = 0;
  fromDate : Date = new Date();
  toDate : Date = new Date();
  totalSale : number = 0;
  ordersTotalCount : number = 0;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getCenterSummary();
    this.getOrderSummary();
    this.loadCollections();
    this.adminService.getCityById(this.cityId).subscribe((data:any) => {
      this.centerName = data.cityName
    })
  }

  loadCollections() {
    let request = {
      userId : this.userId,
      cityId : this.cityId,
      startDate : this.fromDate,
      endDate : this.toDate
    } ;
     this.loadReceivablePayments(request);
     this.loadPendingCollection(request);
     this.loadCollectedPayments(request);
     this.loadCollectedPendings(request);
     this.loadTotalSale(request);
  }


  getCenterSummary(){
      this.adminService.getCenterSummary(this.userId).subscribe((data:any) => {
        if(data.status == 200){
        //console.log(data.body);
        this.centerList = data.body;
        }
      })
  }

  getOrderSummary(){
    this.adminService.getOrderSummary(this.userId).subscribe((data:any) => {
      if(data.status == 200){
       
        this.orderList = data.body;
      }
 })
  }

 loadReceivablePayments(request: any) {
  this.adminService.getReceivablePayments(request).subscribe((data:any) => {
    if(data.status == 200){
    this.receivablePayments = data.body.receivableAmt;
    }
  })
  }
  
  loadPendingCollection(request : any) {
    this.adminService.getPendingPayments(request).subscribe((data:any) => {
      if(data.status == 200){
      this.pendingPayments = data.body.pendingAmt;
      }
    })
  }
  
  loadCollectedPayments(request : any) {
    this.adminService.getCollectedPayments(request).subscribe((data:any) => {
      if(data.status == 200){
      this.collectedPayments = data.body.receivedAmt;
      }
    })
  }
  
  loadCollectedPendings(request : any) {
    this.adminService.getPendingCollected(request).subscribe((data:any) => {
      if(data.status == 200){
      this.collectedPending = data.body.pendingCollectedAmt;
      }
    })
  }

  loadTotalSale(request : any) {
    this.adminService.getTotalSale(request).subscribe((data:any) => {
      if(data.status == 200){
      this.totalSale = data.body.totalOrdersBill;
      this.ordersTotalCount = data.body.totelOrders;
      }
    })
  }

}


