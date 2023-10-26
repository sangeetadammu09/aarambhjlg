import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesManagerService } from 'src/app/sales-manager-officer/service/sales-manager.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-returned-orders',
  templateUrl: './returned-orders.component.html',
  styleUrls: ['./returned-orders.component.css']
})
export class ReturnedOrdersComponent implements OnInit {


  page = 10;
  total = 20;
  pageSize = 1;
  returnOrderListForApproval: any = [];
  selectedOrderList: any = [];
  installmentList: any = [];
  userId = localStorage.getItem('userId');
  roles = localStorage.getItem('roles');
  orderDetailsObj: any = {};
  selectedOrderId: any;
  paymentInstallment = "";
  paymentInstallmentObj: any;
  @ViewChild('closeApproveOrderModal') closeApproveOrderModal: any;
  @ViewChild('closeCancelOrderModal') closeCancelOrderModal: any;
  selectedOrderInstallmentList: any = [];
  todayDate = moment();
  approveOrderObj: any;
  firstRole: any;
  paymentInstallmentNo: any;
  gapList: any = [];
  paymentGapValue: any
  pageLoaded: boolean = false;

  constructor(private _saleService: SalesManagerService, private toastrService: ToastrService,
    private _adminService: AdminService) { }

  ngOnInit(): void {
    this.getreturnOrderListForApproval();
    this.getAllInstallments();
    this.paymentInstallment = "";


    this.gapList = [{ "id": 0, "value": 0 }, { "id": 1, "value": 1 }, { "id": 2, "value": 2 }, { "id": 3, "value": 3 },
    { "id": 4, "value": 4 }, { "id": 5, "value": 5 }, { "id": 6, "value": 6 }, { "id": 7, "value": 7 }]


  }

  getAllInstallments() {
    this._adminService.getAllInstallment().subscribe((data) => {
      //   //console.log(data,'all Installments')
      if (data.length > 0) {
        this.installmentList = data;
      } else {
        this.installmentList = [];
      }

    })

    if (this.roles) {
      var temp = JSON.parse(this.roles);
      const finalArray = temp.map((item: any, index: number) => ({ id: index, name: item }))
      this.firstRole = finalArray[0].name;
      //console.log(this.firstRole);
    }
  }



  getreturnOrderListForApproval() {
    this._saleService.getReturnedRequestedList(this.userId, this.page, this.pageSize).subscribe((data: any) => {
      //   //console.log(data,'all orders')
      if (data.returnRequested.length > 0) {
        this.returnOrderListForApproval = data.returnRequested;
        this.pageLoaded = true;
        this.total = data.page.totalCount;
        console.log(this.returnOrderListForApproval)
      } else {
        this.returnOrderListForApproval = [];
        this.pageLoaded = true;
      }

    })
  }

  handlePageChange(event: number) {
    ////console.log(event)
    this.page = event;
    this.getreturnOrderListForApproval();
  }

  showOrderModal(item: any) {
    this._saleService.getReturnOrderDetails(item.orderId).subscribe((data: any) => {

      if (data.status == 200) {
        this.orderDetailsObj = data.body;
        this.selectedOrderList = data.body.orderItems;
        console.log(this.orderDetailsObj)
        console.log(data)
      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 500) {
        this.orderDetailsObj = null;
        this.selectedOrderList = []
      }
    })

  }

  showApproveOrderModal(item: any) {
    this.approveOrderObj = item;
    //console.log(this.approveOrderObj)

  }

  getGapVal(paymentGap: any) {
    this.paymentGapValue = paymentGap.value;
  }

  getInstallmentDetails(item: any, orderDetailsObj: any) {
    this.paymentInstallmentNo = item;
    // this._saleService.getInstallmentList(orderDetailsObj.totalBillAmt,item.installmentNo,this.paymentGapValue).subscribe((data) => {
    //   //console.log(data,'all installment table')
    //   if(data.length > 0){
    //     data.forEach((item:any) => {
    //       item.installmentDate = moment(item.installmentDate).format("L");
    //       item['isPaid'] = false;
    //     })
    //    this.selectedOrderInstallmentList = data
    //    }else{
    //      this.selectedOrderInstallmentList = [];
    //    }

    //  })
  }

  showCancelOrderModal(item: any) {
    this.selectedOrderId = item.orderId;
  }


  approveOrder() {
    var approveObject: any = {};
    approveObject.orderId = this.approveOrderObj.orderId,
      approveObject.memberId = this.approveOrderObj.memberId,
      approveObject.returnApprovedById = Number(this.userId),
      approveObject.returnApprovedByRole = this.firstRole,
      approveObject.rejectionComment = '',
      approveObject.isApproved = true,

      this._saleService.approveReturnRequest(approveObject).subscribe((data) => {
        if (data.status == 200) {
          this.toastrService.success('Order retrun approved successfully')
          this.closeApproveOrderModal.nativeElement.click();

        } else {
          this.toastrService.success('Error approving the return order')
        }

      })
  }

  getTotalReturn(items: any[]) {
    let sum = 0;
    items.forEach(item => {
      sum += item.totalReturnAmt;
    })
    return sum;
  }


  cancelOrder() {
    // this._saleService.cancelOrder(this.selectedOrderId).subscribe((data) => {
    //  if(data.status == 200){
    //   this.closeCancelOrderModal.nativeElement.click();
    //   this.toastrService.success('Order cancelled successfully')

    //   }else{
    //     this.toastrService.success('Error cancelling the order')
    //   }

    // })
  }

}
