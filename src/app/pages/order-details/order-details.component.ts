import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';
import * as moment from 'moment';

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
  installmentList :any =[];
  userId = localStorage.getItem('userId');
  roles = localStorage.getItem('roles');
  orderDetailsObj: any ={};
  selectedOrderId: any;
  paymentInstallment = "";
  paymentInstallmentObj:any;
  @ViewChild('closeApproveOrderModal') closeApproveOrderModal:any;
  @ViewChild('closeCancelOrderModal') closeCancelOrderModal:any;
  selectedOrderInstallmentList: any= [];
  todayDate = moment();
  approveOrderObj: any;
  firstRole: any;
  paymentInstallmentNo: any;

  constructor(private _saleService: SalesRelationService,private toastrService :ToastrService,
    private _adminService:AdminService) { }

  ngOnInit(): void {
    this.getOrderListForApproval();
    this.getAllInstallments();
    this.paymentInstallment = "";
    console.log(this.todayDate)
   

  }

  getAllInstallments(){
    this._adminService.getAllInstallment().subscribe((data) => {
      console.log(data,'all Installments')
     if(data.length > 0){
       this.installmentList = data;
      }else{
        this.installmentList = [];
      }
    
    })

    if(this.roles){
      var temp = JSON.parse(this.roles);
      const finalArray = temp.map((item:any, index:number) => ({ id: index,name: item }))
      this.firstRole = finalArray[0].name;
      console.log(this.firstRole);
    }
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
        console.log(this.orderDetailsObj)
      }
    })

  }

  showApproveOrderModal(item:any){
    this.approveOrderObj = item;
    console.log(this.approveOrderObj)
   
  }

  getInstallmentDetails(item:any,orderDetailsObj:any){
    this.paymentInstallmentNo = item;
    this._saleService.getInstallmentList(orderDetailsObj.totalBillAmt,item.installmentNo).subscribe((data) => {
      console.log(data,'all installment table')
      if(data.length > 0){
        data.forEach((item:any) => {
          item.installmentDate = moment(item.installmentDate).format("L");
          item['isPaid'] = false;
        })
       this.selectedOrderInstallmentList = data
       }else{
         this.selectedOrderInstallmentList = [];
       }
       
     })
  }

  showCancelOrderModal(item:any){
    this.selectedOrderId = item.orderId;
  }


  approveOrder(){
     var approveObject :any ={};
     approveObject.orderId=  this.approveOrderObj.orderId,
     approveObject.isApproved=  true,
     approveObject.approvedById=  this.userId,
     approveObject.approvedByRole=  this.firstRole,
     approveObject.isRejected=  false,
     approveObject.rejectedById=  0,
     approveObject.rejectedByRole=  null,
     approveObject.rejectionComment=  '',
     approveObject.installmentApprovedId= this.paymentInstallmentNo.id
     let installmentObj : any={};
     installmentObj.memberId=  this.approveOrderObj.memberId,
     installmentObj.orderId=  this.approveOrderObj.orderId,
     installmentObj.installmentNo=  this.paymentInstallmentNo.installmentNo,
     installmentObj.installmentDate=  this.selectedOrderInstallmentList[0].installmentDate,
     installmentObj.installmentAmt=  this.selectedOrderInstallmentList[0].insatllmentAmount
     let installmentTemp= [installmentObj, ...[]] 
     approveObject.installments = installmentTemp;
    this._saleService.approveOrder(approveObject).subscribe((data) => {
     if(data.status == 200){
      this.toastrService.success('Order approved successfully')
      this.closeApproveOrderModal.nativeElement.click();

      }else{
        this.toastrService.success('Error approving the order')
      }
      
    })
  }

  
  cancelOrder(){
    this._saleService.cancelOrder(this.selectedOrderId).subscribe((data) => {
     if(data.status == 200){
      this.closeCancelOrderModal.nativeElement.click();
      this.toastrService.success('Order cancelled successfully')

      }else{
        this.toastrService.success('Error cancelling the order')
      }
      
    })
  }

}
