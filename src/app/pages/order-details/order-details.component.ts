import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  page = 1;
  total = 20;
  pageSize = 10;
  orderListForApproval: any =[];
  selectedOrderList: any =[];
  userId = localStorage.getItem('userId');
  orderDetailsObj: any ={};
  selectedOrderId: any;

  constructor(private _saleService: SalesRelationService,private toastrService :ToastrService) { }

  ngOnInit(): void {
    this.getOrderListForApproval();
  }


  getOrderListForApproval(){
    this._saleService.getOrderListForApproval(this.userId,this.pageSize,this.page).subscribe((data) => {
       console.log(data,'all orders')
       if(data.length > 0){
        this.orderListForApproval = data

        this.total = data[0].totalCount;
        }else{
          this.orderListForApproval = [];
        }
        
      })
  }

  handlePageChange(event: number){
    //console.log(event)
    this.page = event;
    this.getOrderListForApproval();
}

  showOrderModal(item:any){
    this._saleService.getOrderDetails(item.orderId).subscribe((data:any) =>{
      console.log(data)
      if(data.status == 200){
        this.orderDetailsObj = data.body;
        this.selectedOrderList = data.body.orderItems;
        console.log(this.selectedOrderList)
      }
    })

  }

  showApproveOrderModal(item:any){
    this.selectedOrderId = item.orderId;

  }


  approveOrder(){
    this._saleService.approveOrder(this.selectedOrderId).subscribe((data) => {
     if(data.status == 200){
      this.toastrService.success('Order approved successfully')

      }else{
        this.toastrService.success('Error approving the order')
      }
      
    })
   

  }

}
