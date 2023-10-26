import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_DI_CONFIG } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class OrderInstalmentService {

  constructor(private http: HttpClient) { }

  getPaymentColectionView(request : any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.OrderInstallment.getPaymentCollectionView, request)
  }
}
