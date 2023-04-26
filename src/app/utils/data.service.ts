import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private cartSource = new Subject();
  currentCatObj = this.cartSource.asObservable();

  sendMemberIdAndCartId(cartObj: any) {
    this.cartSource.next(cartObj);
  }
}
