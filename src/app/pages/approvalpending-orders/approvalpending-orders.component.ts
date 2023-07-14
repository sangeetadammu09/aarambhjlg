import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-approvalpending-orders',
  templateUrl: './approvalpending-orders.component.html',
  styleUrls: ['./approvalpending-orders.component.css']
})
export class ApprovalpendingOrdersComponent implements OnInit {
  page = 1;
  total = 20;
  pageSize = 10;
  approvedOrderList: any =[];
  selectedOrderList: any =[];
  orderinstallmentList: any =[];
  userId = localStorage.getItem('userId');
  roleNo = localStorage.getItem('roleNo');
  approvedOrderDetailsObj :any ={};
  @ViewChild('approvedOrderPdf', {static: false}) approvedOrderPdf!: ElementRef;
  pageLoaded: boolean = false;


  constructor(private _saleService: SalesRelationService) { }

  ngOnInit(): void {
    this.getapprovedOrderList();

  }

  getapprovedOrderList(){
      this._saleService.getApprovalPendingOrdersForSoRo(this.userId,this.pageSize,this.page).subscribe((data) => {
        console.log(data,'all orders')
        if(data.length > 0){
        this.pageLoaded = true;
         this.approvedOrderList = data,
         this.total = data[0].totalCount;
         }else{
           this.approvedOrderList = [];
         this.pageLoaded = true;
         } 
       })

    
   
  }

  handlePageChange(event: number){
    ////console.log(event)
    this.page = event;
    this.getapprovedOrderList();
}

 
    
  

}

