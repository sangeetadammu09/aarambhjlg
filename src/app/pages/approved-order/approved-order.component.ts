import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';
import * as moment from 'moment';
import jspdf from 'jspdf';
import html2canvas from "html2canvas";
import { NgxPrintElementService } from 'ngx-print-element';

declare var $ :any;

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


  constructor(private _saleService: SalesRelationService,public print: NgxPrintElementService) { }

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

  public config = {
    printMode: 'template-popup', // template
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Hello World',
    templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['td { border: 1px solid black; color: green; }', 'table { border: 1px solid black; color: red }', 'header, table, footer { margin: auto; text-align: center; }']
  }

  printBill(){

    // var divToPrint :any= document.getElementById('approvedOrderPdf');
    var printDoc = new jspdf();
    // printDoc.fromHTML($('#approvedOrderPdf').get(0), 10, 10, {
    //     'width': 180
    // });
    // printDoc.autoPrint();
    // printDoc.output("dataurlnewwindow");
    var panel = document.getElementById("approvedOrderPdf");
    if(panel){
      console.log(panel.innerHTML)
    var printWindow = window.open('', '', 'height=600,width=800');
    printWindow?.document.write('<html><head>');
    printWindow?.document.write('</head><body>');
    printWindow?.document.write(panel.innerHTML);
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    setTimeout(function () {
        printWindow?.print();
    }, 500);
    return false;
  }
  
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

