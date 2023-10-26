import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesManagerService } from 'src/app/sales-manager-officer/service/sales-manager.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent implements OnInit {

  page = 1;
  total = 20;
  pageSize = 10;
  pageLoaded : boolean= false;
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId');
  completedList:any = [];
  roleNo = localStorage.getItem('roleNo');
  constructor(private _adminService: AdminService, private soRoService: SalesRelationService, private salesManager: SalesManagerService) { }
  ngOnInit(): void {
    this.getAllCompletedDetails();
  }

  getAllCompletedDetails(){
    var paginationObj :any ={};
    paginationObj.pageNo =this.page;
    paginationObj.pageSize = this.pageSize;
    if(this.roleNo == '101'){
    this._adminService.getCompletedOrdersListForAdmin(this.cityId, this.pageSize,this.page).subscribe((data) => {
      console.log(data,'all Completed orders')
        if(data.length > 0){
          this.pageLoaded = true;
          this.completedList = data;
          this.total = data[0].totalCount;
   
         }else{
           this.completedList = [];
           this.pageLoaded = true;
         } 
       })
    }

    if(this.roleNo == '102'){
      this.soRoService.getCompletedOrdersListForSoRoList(this.userId, this.pageSize,this.page).subscribe((data) => {
        console.log(data,'all Completed orders')
          if(data.length > 0){
            this.pageLoaded = true;
            this.completedList = data;
            this.total = data[0].totalCount;
     
           }else{
             this.completedList = [];
             this.pageLoaded = true;
           } 
         })
      }
      if(this.roleNo == '103'){
        this.salesManager.getCompletedOrdersListForManager(this.userId, this.pageSize,this.page).subscribe((data) => {
          console.log(data,'all Completed orders')
            if(data.length > 0){
              this.pageLoaded = true;
              this.completedList = data;
              this.total = data[0].totalCount;
       
             }else{
               this.completedList = [];
               this.pageLoaded = true;
             } 
           })
        }
   
  }


  handlePageChange(event: number){
    this.page = event;
    this.getAllCompletedDetails();
}

}
