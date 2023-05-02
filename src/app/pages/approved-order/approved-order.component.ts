import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';
import * as moment from 'moment';
import jspdf from 'jspdf';
import html2canvas from "html2canvas";

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
  roleNo = localStorage.getItem('roleNo');
  approvedOrderDetailsObj :any ={};
  @ViewChild('approvedOrderPdf', {static: false}) approvedOrderPdf!: ElementRef;


  constructor(private _saleService: SalesRelationService,private toastrService :ToastrService) { }

  ngOnInit(): void {
    this.getapprovedOrderList();

  }

  getapprovedOrderList(){

    if(this.roleNo == '102'){
      this._saleService.getApprovedOrdersForSoRoList(this.userId,this.pageSize,this.page).subscribe((data) => {
        console.log(data,'all orders')
        if(data.length > 0){
         this.approvedOrderList = data,
         this.total = data[0].totalCount;
         }else{
           this.approvedOrderList = [];
         } 
       })

    }
    else if(this.roleNo == '103'){
      this._saleService.getApprovedOrdersForManagerList(this.userId,this.pageSize,this.page).subscribe((data) => {
        console.log(data,'all orders')
        if(data.length > 0){
         this.approvedOrderList = data,
         this.total = data[0].totalCount;
         }else{
           this.approvedOrderList = [];
         } 
       })
      }
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

  printBill(divName:any){
   
    var printContents :any = document.getElementById(divName)?.innerHTML;
    console.log(printContents)
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = printContents;
  
  }


  downloadBill(){
    const pdfTable = this.approvedOrderPdf.nativeElement;
    var data = document.getElementById("contentToConvert");
    html2canvas(pdfTable).then(canvas => {
      // Few necessary setting options
      var imgWidth = 200;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
    
      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 4, position, imgWidth, imgHeight);
      pdf.save("OrderBill.pdf"); // Generated PDF
      // pdf.autoPrint();
    });
  }
    
  

}

