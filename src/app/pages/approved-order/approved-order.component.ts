import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';
import * as moment from 'moment';

@Component({
  selector: 'app-approved-order',
  templateUrl: './approved-order.component.html',
  styleUrls: ['./approved-order.component.css']
})
export class ApprovedOrderComponent implements OnInit {

  page = 1;
  total = 20;
  pageSize = 10;
  approvedOrderList: any =[];
  selectedOrderList: any =[];
  orderinstallmentList: any =[];
  userId = localStorage.getItem('userId');
  approvedOrderDetailsObj :any ={};

  
  

  constructor(private _saleService: SalesRelationService,private toastrService :ToastrService) { }

  ngOnInit(): void {
    this.getapprovedOrderList();

  }



  getapprovedOrderList(){
    this._saleService.getApprovedOrdersList(this.userId,this.pageSize,this.page).subscribe((data) => {
       console.log(data,'all orders')
       if(data.length > 0){
        this.approvedOrderList = data,
        this.total = data[0].totalCount;
        }else{
          this.approvedOrderList = [];
        }
        
      })
  }

  handlePageChange(event: number){
    //console.log(event)
    this.page = event;
    this.getapprovedOrderList();
}

  showOrderModal(item:any){
    this._saleService.getApprovedOrdersDetails(item.orderId).subscribe((data:any) =>{
      console.log(data)
      if(data.status == 200){
        this.approvedOrderDetailsObj = data.body;
        this.selectedOrderList = data.body.orderItems;
        this.orderinstallmentList = data.body.installments;
        this.orderinstallmentList.forEach((item:any) => {
          item.installmentDate = moment(item.installmentDate).format("L");
        })
      }
    })

  }

 

  

}

