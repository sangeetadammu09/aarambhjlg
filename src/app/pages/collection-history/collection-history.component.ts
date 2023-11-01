import { Component, OnInit } from '@angular/core';
import { OrderInstalmentService } from '../services/order-instalment.service';

@Component({
  selector: 'app-collection-history',
  templateUrl: './collection-history.component.html',
  styleUrls: ['./collection-history.component.css']
})
export class CollectionHistoryComponent implements OnInit {
  userId = localStorage.getItem('userId');
  cityId = localStorage.getItem('userCity');
  fromDate : Date = new Date();
  toDate : Date = new Date();
  collectedBy : number = 0;
  collectedFromCenters : any;
  cashCollection : number = 0;
  upiCollection : number = 0;
  cardCollection : number = 0;
  totalCollection : number = 0;
  paymentCollectionDetails : any;
  isCollectionHistory : boolean = false;

  constructor(private _orderInstalmentService: OrderInstalmentService) { }

  ngOnInit(): void {
    //this.loadView();
  }

 loadView() {
    let request = {
      targetUserId : this.userId,
      viewerUserId : this.userId,
      cityId : this.cityId,
      startDate : this.fromDate,
      endDate : this.toDate
    } ;
    this._orderInstalmentService.getPaymentColectionView(request).subscribe((data:any) => {
      this.paymentCollectionDetails = data;
      if(data){
        this.isCollectionHistory = true;
      }
      
    });
  }
}
